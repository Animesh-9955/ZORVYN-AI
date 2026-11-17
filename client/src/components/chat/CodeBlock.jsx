import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

export const CodeBlock = ({ language = 'code', code = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-zorvyn-border-subtle bg-zorvyn-bg/95 font-mono text-xs shadow-lg">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-zorvyn-surface/90 border-b border-zorvyn-border-subtle text-zorvyn-muted select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-zorvyn-primary" />
          <span className="uppercase tracking-wider text-[11px] font-semibold text-zorvyn-primary">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-zorvyn-surface-light text-zorvyn-muted hover:text-white transition-colors"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[10px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-3.5 overflow-x-auto text-[#E2E8F0] leading-relaxed">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;

