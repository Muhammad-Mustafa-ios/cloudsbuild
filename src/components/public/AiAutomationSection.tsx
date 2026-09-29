import React, { useState, useEffect } from 'react';
import { Zap, Bot, Cpu, CheckCircle2, ArrowRight, Activity, Terminal, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

interface AiAutomationSectionProps {
  onOpenContact: () => void;
  onNavigate: (view: any) => void;
}

export function AiAutomationSection({ onOpenContact, onNavigate }: AiAutomationSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'support' | 'finance' | 'operations'>('all');
  const [executionLogs, setExecutionLogs] = useState([
    { time: '10:04:12', agent: 'CloudsBot AI', action: 'Inbound customer inquiry analyzed & resolved via CRM webhook', status: 'Success' },
    { time: '10:04:08', agent: 'AutoSync Engine', action: 'Synchronized 142 invoice records with cloud database', status: 'Success' },
    { time: '10:03:55', agent: 'LeadScout AI', action: 'Qualified inbound enterprise lead & routed to Senior Account Executive', status: 'Success' },
  ]);

  // Simulate real-time log updates
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newLogs = [
        { time: timeStr, agent: Math.random() > 0.5 ? 'CloudsBot AI' : 'Workflow Bot', action: 'Executed automated multi-step decision tree successfully', status: 'Success' },
        ...executionLogs.slice(0, 2)
      ];
      setExecutionLogs(newLogs);
    }, 4000);
    return () => clearInterval(timer);
  }, [executionLogs]);

  const workflows = [
    { category: 'support', name: 'Autonomous Customer Support', desc: 'Resolves 85% of tier-1 support tickets instantly across WhatsApp & Web.', status: 'Running', success: '99.8%', speed: '0.4s' },
    { category: 'operations', name: 'Smart Order & Inventory Routing', desc: 'Syncs Shopify/WooCommerce orders with warehouse logistics automatically.', status: 'Running', success: '99.4%', speed: '0.8s' },
    { category: 'finance', name: 'Automated Invoice & Receipt Parsing', desc: 'Extracts data from PDFs, matches POs, and logs into accounting software.', status: 'Running', success: '99.1%', speed: '1.2s' },
    { category: 'support', name: 'Inbound Lead Qualification', desc: 'Scores and enriches leads from LinkedIn and web forms in real-time.', status: 'Running', success: '100%', speed: '0.3s' },
  ];

  const filteredWorkflows = activeTab === 'all' 
    ? workflows 
    : workflows.filter(w => w.category === activeTab);

  return (
    <section id="ai-automation" className="py-24 bg-[#0B132B] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold tracking-wide shadow-sm">
            <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            Autonomous AI Automation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Enterprise AI Agents & Workflow Automation
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Deploy intelligent robotic agents that operate 24/7, connect your software stack, and execute complex business logic autonomously.
          </p>
        </div>

        {/* AI Robot Agent Spotlight Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 rounded-3xl border border-blue-500/30 p-8 sm:p-10 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Robot & Agent Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                <Bot className="w-4 h-4 text-blue-400 animate-bounce" />
                CloudsBot AI Enterprise Agent v4.2
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Your Digital Workforce, Powered By Advanced LLMs & Webhooks
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Our automated agents don't just reply to prompts—they execute multi-step operations across your CRM, database, messaging channels, and payment gateways with zero human intervention.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
                  <div className="text-2xl sm:text-3xl font-black text-blue-400">99.9%</div>
                  <div className="text-xs text-slate-400 mt-1">Uptime SLA</div>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">0.4s</div>
                  <div className="text-xs text-slate-400 mt-1">Avg Response</div>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
                  <div className="text-2xl sm:text-3xl font-black text-indigo-400">24/7</div>
                  <div className="text-xs text-slate-400 mt-1">Autonomous Run</div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Live Robot Visualizer & Terminal */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl border border-slate-800 p-6 shadow-inner space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">cloudsbot-agent-core.log</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>

              {/* Robot Avatar Header */}
              <div className="flex items-center gap-3 p-3 bg-blue-950/40 rounded-xl border border-blue-500/20">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0 shadow-sm animate-pulse">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">CloudsBot Agent Cluster</div>
                  <div className="text-[11px] text-blue-300">Processing live webhook stream...</div>
                </div>
              </div>

              {/* Live Execution Logs */}
              <div className="space-y-2 font-mono text-xs">
                {executionLogs.map((log, idx) => (
                  <div key={idx} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 font-bold">[{log.agent}]</span>
                        <span className="text-slate-500">{log.time}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-snug">{log.action}</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Workflow Filtering & Cards */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Pre-Built Enterprise Automation Pipelines
            </h3>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              {(['all', 'support', 'operations', 'finance'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                    activeTab === tab 
                      ? 'bg-[#2563EB] text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredWorkflows.map((wf, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {wf.status}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{wf.speed}</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {wf.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {wf.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Success Rate</span>
                  <span className="font-bold text-emerald-400 font-mono">{wf.success}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenContact}
            className="px-8 py-4 rounded-2xl bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-200 inline-flex items-center gap-3 group"
          >
            Deploy Custom AI Workflow
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
