/**
 * ZORVYN AI — Streaming Chat API Client
 * Connects to Node.js backend SSE endpoint at /api/chat/stream
 * Zero API keys are ever sent to or handled by this client.
 */

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '') || (import.meta.env.PROD ? 'https://zorvyn-ai.onrender.com/api' : '/api');

export async function streamChatResponse({
  message,
  conversationId = null,
  history = [],
  onChunk,
  onDone,
  onError,
  signal,
}) {
  try {
    const response = await fetch(`${API_BASE}/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify({
        message,
        conversationId,
        history,
      }),
      signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let parsedError = errorText;
      try {
        const errorJson = JSON.parse(errorText);
        parsedError = errorJson.error?.message || errorJson.message || errorText;
      } catch (e) {
        // use raw error text
      }
      throw new Error(parsedError || `Server error: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('ReadableStream not supported by browser environment');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Split SSE events separated by double newlines or single newlines
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // keep incomplete line in buffer

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const jsonStr = trimmed.slice(6).trim();
        if (!jsonStr) continue;

        try {
          const data = JSON.parse(jsonStr);

          if (data.error) {
            if (onError) onError(data.error, data.code);
            return;
          }

          if (data.chunk && onChunk) {
            onChunk(data.chunk);
          }

          if (data.done && onDone) {
            onDone(data.telemetry || {});
            return;
          }
        } catch (err) {
          console.warn('Failed to parse SSE chunk:', jsonStr, err);
        }
      }
    }

    // Flush any remaining buffer
    if (buffer.trim().startsWith('data: ')) {
      try {
        const data = JSON.parse(buffer.trim().slice(6).trim());
        if (data.chunk && onChunk) onChunk(data.chunk);
        if (data.done && onDone) onDone(data.telemetry || {});
      } catch (e) {
        // ignore incomplete tail
      }
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      // User explicitly stopped generation
      if (onDone) onDone({ aborted: true, label: 'Stopped by user' });
      return;
    }
    if (onError) {
      onError(err.message || 'Stream connection failed');
    }
  }
}

export default streamChatResponse;

