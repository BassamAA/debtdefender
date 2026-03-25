'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Download, AlertTriangle } from 'lucide-react';
import type { InteractionLog } from '@/types';

const STORAGE_KEY = 'debtdispute_interactions';

const CONTACT_METHODS = [
  { value: 'phone',     label: 'Phone Call',     icon: '📞' },
  { value: 'mail',      label: 'Mail',           icon: '✉️' },
  { value: 'email',     label: 'Email',          icon: '📧' },
  { value: 'in-person', label: 'In Person',      icon: '👤' },
  { value: 'text',      label: 'Text Message',   icon: '💬' },
];

const KNOWN_VIOLATIONS = [
  'Called before 8am or after 9pm',
  'Called my workplace',
  'Contacted family / third parties',
  'Used abusive or threatening language',
  'Threatened legal action they cannot take',
  'Misrepresented the debt amount',
  'Refused to identify themselves',
  'Continued contact after cease & desist',
  'Failed to provide validation within 5 days',
  'Used false / misleading statements',
];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const EMPTY_LOG: Omit<InteractionLog, 'id' | 'createdAt'> = {
  date: new Date().toISOString().slice(0, 10),
  collectorName: '',
  contactMethod: 'phone',
  whatTheySaid: '',
  yourResponse: '',
  violationsNoted: [],
};

export default function InteractionTracker() {
  const [logs, setLogs] = useState<InteractionLog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newLog, setNewLog] = useState<typeof EMPTY_LOG>({ ...EMPTY_LOG });
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLogs(JSON.parse(raw));
    } catch {}
  }, []);

  function save(updated: InteractionLog[]) {
    setLogs(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }

  function addLog() {
    if (!newLog.collectorName || !newLog.whatTheySaid) return;
    const entry: InteractionLog = {
      ...newLog,
      id: generateId(),
      createdAt: Date.now(),
    };
    save([entry, ...logs]);
    setNewLog({ ...EMPTY_LOG });
    setShowForm(false);
  }

  function deleteLog(id: string) {
    save(logs.filter((l) => l.id !== id));
  }

  function toggleViolation(v: string) {
    setNewLog((prev) => ({
      ...prev,
      violationsNoted: prev.violationsNoted.includes(v)
        ? prev.violationsNoted.filter((x) => x !== v)
        : [...prev.violationsNoted, v],
    }));
  }

  async function exportPDF() {
    setExportLoading(true);
    try {
      const res = await fetch('/api/export-tracker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs }),
      });
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'DebtDispute-Interaction-Log.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert('Export failed. Please try again.');
    } finally {
      setExportLoading(false);
    }
  }

  const totalViolations = logs.reduce((sum, l) => sum + l.violationsNoted.length, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Interaction Tracker</h1>
          <p className="text-slate-400 text-sm">
            Document every collector contact. This becomes evidence if you file a complaint or
            pursue legal action.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          {logs.length > 0 && (
            <button
              onClick={exportPDF}
              disabled={exportLoading}
              className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 border border-navy-600 text-slate-300 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              {exportLoading ? 'Exporting...' : 'Export PDF'}
            </button>
          )}
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Log Interaction
          </button>
        </div>
      </div>

      {/* Summary stats */}
      {logs.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-white">{logs.length}</p>
            <p className="text-slate-400 text-xs mt-1">Interactions</p>
          </div>
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-red-400">{totalViolations}</p>
            <p className="text-slate-400 text-xs mt-1">Violations Noted</p>
          </div>
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-orange-400">
              {totalViolations > 0 ? `$${(totalViolations * 1000).toLocaleString()}` : '$0'}
            </p>
            <p className="text-slate-400 text-xs mt-1">Potential Damages</p>
          </div>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="bg-navy-900 border border-orange-500/30 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold text-base mb-5">Log New Interaction</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Date</label>
                <input
                  type="date"
                  value={newLog.date}
                  onChange={(e) => setNewLog((p) => ({ ...p, date: e.target.value }))}
                  className="w-full bg-navy-800 border border-navy-600 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Collector Name <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Midland Credit"
                  value={newLog.collectorName}
                  onChange={(e) => setNewLog((p) => ({ ...p, collectorName: e.target.value }))}
                  className="w-full bg-navy-800 border border-navy-600 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">Contact Method</label>
              <div className="flex flex-wrap gap-2">
                {CONTACT_METHODS.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setNewLog((p) => ({ ...p, contactMethod: m.value as InteractionLog['contactMethod'] }))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      newLog.contactMethod === m.value
                        ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                        : 'bg-navy-800 border-navy-600 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {m.icon} {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                What They Said / Did <span className="text-orange-400">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Describe what the collector said or did..."
                value={newLog.whatTheySaid}
                onChange={(e) => setNewLog((p) => ({ ...p, whatTheySaid: e.target.value }))}
                className="w-full bg-navy-800 border border-navy-600 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Your Response</label>
              <textarea
                rows={2}
                placeholder="What did you say / do in response? (Optional)"
                value={newLog.yourResponse}
                onChange={(e) => setNewLog((p) => ({ ...p, yourResponse: e.target.value }))}
                className="w-full bg-navy-800 border border-navy-600 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                Violations Noted (check all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {KNOWN_VIOLATIONS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => toggleViolation(v)}
                    className={`text-left flex items-start gap-2 px-3 py-2 rounded-lg border text-xs transition-all ${
                      newLog.violationsNoted.includes(v)
                        ? 'bg-red-500/20 border-red-500/50 text-red-300'
                        : 'bg-navy-800 border-navy-600 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <span className="mt-0.5 flex-shrink-0">
                      {newLog.violationsNoted.includes(v) ? '⚠️' : '○'}
                    </span>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={addLog}
                disabled={!newLog.collectorName || !newLog.whatTheySaid}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-navy-700 disabled:text-slate-500 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Save Interaction
              </button>
              <button
                onClick={() => { setShowForm(false); setNewLog({ ...EMPTY_LOG }); }}
                className="flex-1 bg-navy-800 hover:bg-navy-700 text-slate-400 font-semibold py-3 rounded-xl border border-navy-600 text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log entries */}
      {logs.length === 0 && !showForm ? (
        <div className="text-center py-16 bg-navy-900 border border-navy-700 rounded-2xl">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-white font-bold text-base mb-2">No interactions logged yet</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
            Every time a collector contacts you, log it here. This creates a documented record
            of their conduct — essential if you need to file a complaint.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Log Your First Interaction
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="bg-navy-900 border border-navy-700 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-bold text-sm">{log.collectorName}</span>
                    <span className="text-slate-500 text-xs">•</span>
                    <span className="text-slate-400 text-xs">{log.date}</span>
                    <span className="text-slate-500 text-xs">•</span>
                    <span className="text-xs bg-navy-800 text-slate-400 px-2 py-0.5 rounded-md border border-navy-600">
                      {CONTACT_METHODS.find((m) => m.value === log.contactMethod)?.icon}{' '}
                      {CONTACT_METHODS.find((m) => m.value === log.contactMethod)?.label}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteLog(log.id)}
                  className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-slate-300 text-sm mb-2 leading-relaxed">
                <strong className="text-slate-400 font-medium">They said/did: </strong>
                {log.whatTheySaid}
              </p>

              {log.yourResponse && (
                <p className="text-slate-400 text-xs mb-2 leading-relaxed">
                  <strong className="font-medium">Your response: </strong>
                  {log.yourResponse}
                </p>
              )}

              {log.violationsNoted.length > 0 && (
                <div className="mt-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 text-xs font-semibold mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Potential Violations ({log.violationsNoted.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {log.violationsNoted.map((v) => (
                      <span key={v} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-md">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-slate-600 text-xs mt-8 text-center leading-relaxed">
        Interaction data is stored locally in your browser only. It is not sent to any server.
        Export to PDF before clearing your browser data. DebtDispute is not a law firm —
        this tracker is for your personal documentation only.
      </p>
    </div>
  );
}
