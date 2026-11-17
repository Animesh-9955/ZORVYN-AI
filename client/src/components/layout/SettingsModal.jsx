import React from 'react';
import { X, ShieldCheck, Cpu, Sparkles, Terminal, Activity } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import ZorvynLogo from '../brand/ZorvynLogo';

export const SettingsModal = () => {
  const { isSettingsOpen, setIsSettingsOpen } = useChat();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsSettingsOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg glass-panel-elevated rounded-2xl p-6 border border-zorvyn-primary/30 shadow-2xl z-10 text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zorvyn-border-subtle">
          <div className="flex items-center gap-2">
            <ZorvynLogo size="small" />
            <span className="text-sm font-semibold text-zorvyn-text font-mono">
              / Console Matrix Settings
            </span>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1 rounded-lg text-zorvyn-muted hover:text-white hover:bg-zorvyn-surface-light transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4 text-xs">
          {/* Status Box */}
          <div className="p-3.5 rounded-xl bg-zorvyn-bg/80 border border-zorvyn-border flex items-start gap-3">
            <Activity className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white flex items-center gap-2">
                <span>Phase 2 Active — Frontend Architecture</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  Online
                </span>
              </div>
              <p className="text-zorvyn-muted mt-1 leading-relaxed">
                Frontend foundation and Node.js Express backend are operational. Gemini API neural streaming pipeline will connect in Phase 3.
              </p>
            </div>
          </div>

          {/* Model Specification */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono uppercase text-zorvyn-muted tracking-wider">
              AI Provider & Engine
            </label>
            <div className="p-3 rounded-xl bg-zorvyn-surface border border-zorvyn-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-zorvyn-primary" />
                <div>
                  <div className="font-medium text-white">Google Gemini API</div>
                  <div className="text-[11px] text-zorvyn-muted font-mono">Model: Gemini 2.5 Flash / Pro (Ready for Hook)</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zorvyn-primary/20 text-zorvyn-primary border border-zorvyn-primary/40">
                Standby
              </span>
            </div>
          </div>

          {/* Security Protocols */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono uppercase text-zorvyn-muted tracking-wider">
              Security Architecture
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-zorvyn-surface border border-zorvyn-border-subtle flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-zorvyn-muted">Zero Exposed Keys</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zorvyn-surface border border-zorvyn-border-subtle flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zorvyn-cyan" />
                <span className="text-zorvyn-muted">Helmet Headers Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zorvyn-border-subtle flex justify-end">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="px-4 py-2 rounded-xl bg-zorvyn-surface hover:bg-zorvyn-surface-light border border-zorvyn-border text-xs text-white font-medium transition-colors"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

