import path from 'path';
import fs from 'fs';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { getPrismaClient } from '../config/db.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import mammoth from 'mammoth';
import { geminiService } from '../services/geminiService.js';

/**
 * Helper: extract text from uploaded file based on mime type
 */
async function extractText(filePath, mimetype) {
  if (mimetype === 'application/pdf') {
    const data = await fs.promises.readFile(filePath);
    const result = await pdfParse(data);
    return result.text;
  }
  if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }
  // fallback: treat as plain text
  return await fs.promises.readFile(filePath, 'utf8');
}

/**
 * POST /api/documents
 * Upload a document and store metadata in DB.
 */
export const uploadDocument = async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return sendError(res, 'No file uploaded', 400, 'UPLOAD_ERROR');
    }

    const prisma = getPrismaClient();
    // Ensure the user is attached by JWT middleware
    const userId = req.user?.id;
    if (!userId) {
      return sendError(res, 'User not authenticated', 401, 'AUTH_ERROR');
    }

    const { originalname, mimetype, size, filename, path: filePath } = file;
    const textContent = await extractText(filePath, mimetype);

    const doc = await prisma.document.create({
      data: {
        userId,
        filename: originalname,
        mimetype,
        path: filePath,
        size,
        // Store extracted snippet (first 1k chars) for quick Q&A indexing
        // Assuming a `contentSnippet` field exists; if not, ignore.
      },
    });

    return sendSuccess(res, { id: doc.id, filename: originalname }, 201);
  } catch (err) {
    console.error(err);
    return sendError(res, err.message || 'Document upload failed', 500, 'UPLOAD_ERROR');
  }
};

/**
 * POST /api/documents/:id/qna
 * Ask a question about a previously uploaded document.
 */
export const queryDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { question } = req.body;
    if (!question) {
      return sendError(res, 'Question is required', 400, 'VALIDATION_ERROR');
    }
    const prisma = getPrismaClient();
    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) {
      return sendError(res, 'Document not found', 404, 'NOT_FOUND');
    }
    // Ensure ownership
    if (doc.userId !== req.user?.id) {
      return sendError(res, 'Access denied', 403, 'FORBIDDEN');
    }
    const text = await extractText(doc.path, doc.mimetype);
    const prompt = `You are a helpful AI. Answer the following question using ONLY information from the provided document text.\n\nDocument Text:\n${text}\n\nQuestion: ${question}`;
    const response = await geminiService.generateContent({ message: prompt, history: [] });
    return sendSuccess(res, { answer: response.text }, 200);
  } catch (err) {
    console.error(err);
    return sendError(res, err.message || 'Document Q&A failed', 500, 'QNA_ERROR');
  }
};

/**
 * GET /api/documents/:id/download
 * Stream the original file back to the client.
 */
export const downloadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const prisma = getPrismaClient();
    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) {
      return sendError(res, 'Document not found', 404, 'NOT_FOUND');
    }
    if (doc.userId !== req.user?.id) {
      return sendError(res, 'Access denied', 403, 'FORBIDDEN');
    }
    const filePath = doc.path;
    const fileName = doc.filename;
    if (!fs.existsSync(filePath)) {
      return sendError(res, 'File missing on server', 410, 'GONE');
    }
    res.setHeader('Content-Type', doc.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
    return sendError(res, err.message || 'Download failed', 500, 'DOWNLOAD_ERROR');
  }
};

/**
 * DELETE /api/documents/:id
 * Remove document metadata and file.
 */
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const prisma = getPrismaClient();
    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) {
      return sendError(res, 'Document not found', 404, 'NOT_FOUND');
    }
    if (doc.userId !== req.user?.id) {
      return sendError(res, 'Access denied', 403, 'FORBIDDEN');
    }
    // Delete file from disk if exists
    if (fs.existsSync(doc.path)) {
      await fs.promises.unlink(doc.path);
    }
    await prisma.document.delete({ where: { id } });
    return sendSuccess(res, { message: 'Document deleted' }, 200);
  } catch (err) {
    console.error(err);
    return sendError(res, err.message || 'Deletion failed', 500, 'DELETE_ERROR');
  }
};
