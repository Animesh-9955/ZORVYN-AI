-- Migration to create Conversation and Message tables
CREATE TABLE "conversations" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "messages" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    "conversationId" TEXT NOT NULL,
    role VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX "messages_conversationId_idx" ON "messages"("conversationId");
CREATE INDEX "messages_createdAt_idx" ON "messages"("createdAt");

