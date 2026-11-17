import { Router } from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import {
  uploadDocument,
  queryDocument,
  downloadDocument,
  deleteDocument,
} from '../controllers/documentController.js';

// Store uploaded files in a local "uploads" folder (ensure it exists)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    // Use timestamp + original name to avoid collisions
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${timestamp}-${safeName}`);
  },
});
const upload = multer({ storage });

const router = Router();

// Upload a document – protected
router.post('/', protect, upload.single('file'), uploadDocument);

// Ask a question about a document – protected
router.post('/:id/qna', protect, queryDocument);

// Download the raw file – protected
router.get('/:id/download', protect, downloadDocument);

// Delete a document – protected
router.delete('/:id', protect, deleteDocument);

export default router;
