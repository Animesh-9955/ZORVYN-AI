export const SUGGESTION_CARDS = [
  {
    id: 'sug-1',
    category: 'SYSTEM ARCHITECTURE',
    title: 'Quantum Microservices Matrix',
    prompt: 'Design an event-driven microservices architecture utilizing Redis streams and distributed tracing for a low-latency fintech platform.',
    badge: 'Advanced Logic',
    icon: 'Cpu',
  },
  {
    id: 'sug-2',
    category: 'CODE SYNTHESIS',
    title: 'React Concurrent Flow Engine',
    prompt: 'Implement a custom React hook with AbortController for real-time Server-Sent Events (SSE) streaming with optimistic UI updates.',
    badge: 'Code Vector',
    icon: 'Code2',
  },
  {
    id: 'sug-3',
    category: 'DEEP REASONING',
    title: 'Consensus Protocol Analysis',
    prompt: 'Compare Raft vs Paxos consensus mechanisms in distributed systems under Byzantine fault conditions and extreme network partition.',
    badge: 'Theoretical Analysis',
    icon: 'Network',
  },
  {
    id: 'sug-4',
    category: 'CREATIVE RESONANCE',
    title: 'Neural Brand Identity Matrix',
    prompt: 'Draft an original brand manifesto for a futuristic neuro-computational interface titled ZORVYN, emphasizing intelligence reimagined.',
    badge: 'Strategic Vision',
    icon: 'Sparkles',
  },
];

export const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-demo-1',
    title: 'Neural Matrix Architecture',
    createdAt: '2026-11-11T14:30:00Z',
    messages: [
      {
        id: 'msg-1-1',
        role: 'user',
        content: 'How should we structure the event pipeline for ZORVYN AI to support sub-100ms streaming responses?',
        timestamp: '2026-11-11T14:30:10Z',
      },
      {
        id: 'msg-1-2',
        role: 'assistant',
        isDemo: true,
        content: `### ⚡ [DEMO MODE — Simulated Response]
*Note: Google Gemini API integration will be activated in Phase 3. This simulated response demonstrates ZORVYN's typography and code rendering.*

To achieve deterministic sub-100ms time-to-first-token (TTFT) for **ZORVYN AI**, we employ an asynchronous pipeline:

1. **Edge Gateway (Reverse Proxy):** Terminate TLS and sanitize payload at the edge.
2. **SSE Buffer Stream:** Open a dedicated HTTP/2 Server-Sent Events channel.
3. **Chunk Decoding:** Parse streaming tokens directly into a visual sliding window.

\`\`\`javascript
// Example streaming subscriber for ZORVYN Command Nexus
async function subscribeToZorvynStream(prompt, onChunk) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: prompt })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value, { stream: true }));
  }
}
\`\`\`

The architectural boundary ensures zero API keys are ever exposed to the client.`,
        timestamp: '2026-11-11T14:30:14Z',
        telemetry: {
          model: 'ZORVYN-Simulated-Core',
          latency: '84ms',
          tokens: 248,
        }
      }
    ]
  },
  {
    id: 'conv-demo-2',
    title: 'Tailwind Glassmorphism Tokens',
    createdAt: '2026-11-11T15:10:00Z',
    messages: [
      {
        id: 'msg-2-1',
        role: 'user',
        content: 'Explain how the custom glassmorphism specular highlights work in ZORVYN AI.',
        timestamp: '2026-11-11T15:10:05Z',
      },
      {
        id: 'msg-2-2',
        role: 'assistant',
        isDemo: true,
        content: `### 🔮 [DEMO MODE — Simulated Response]

ZORVYN AI's visual identity relies on **multi-tier depth layering**:
- **Base Canvas:** Deepest obsidian void \`#080B16\`
- **Glass Core:** \`rgba(17, 22, 41, 0.72)\` with 20px Gaussian backdrop blur
- **Specular Border:** \`1px solid rgba(139, 92, 246, 0.16)\` creating neon perimeter luminescence
- **Micro-Shadows:** Diffuse ambient purple dispersion preventing flat rectangular silhouettes.`,
        timestamp: '2026-11-11T15:10:09Z',
        telemetry: {
          model: 'ZORVYN-Simulated-Core',
          latency: '62ms',
          tokens: 142,
        }
      }
    ]
  }
];

export const generateDemoResponse = (userPrompt) => {
  return `### ⚡ [DEMO MODE — Simulated Response]
*Notice: This is a client-side simulated response for UI preview. Real-time Google Gemini API streaming will be activated in the next phase.*

**Prompt Received:**
> "${userPrompt}"

**ZORVYN Architectural Synthesis:**
- **Execution Pipeline:** Initialized and validated in local state.
- **Design Paradigm:** Floating glassmorphism with high-contrast electric violet highlights.
- **Telemetry Check:** Request structured cleanly for downstream Gemini API streaming.

\`\`\`json
{
  "system": "ZORVYN AI",
  "status": "ready_for_gemini_integration",
  "promptLength": ${userPrompt.length},
  "visualEngine": "React + Vite + Tailwind CSS",
  "securityProtocol": "Helmet + Rate Limiting Enabled"
}
\`\`\`

Ready to transition to live neural streaming.`;
};

