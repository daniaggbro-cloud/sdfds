
import React, { useState, useMemo } from 'react';
import { User, UserRole, RobloxAccount, AuditLog, MarketStatus, AccountStatus } from './types';

const INITIAL_ACCOUNTS: RobloxAccount[] = [
  { id: '1', username: 'DarkLord_X', robux: 15400, premium: true, status: 'active', marketStatus: 'for_sale', price: 450, lastChecked: '10 хв тому' },
  { id: '2', username: 'RobloxMaster', robux: 450, premium: false, status: 'active', marketStatus: 'reserved', price: 80, lastChecked: '1 год тому' },
  { id: '3', username: 'BannedUser_99', robux: 0, premium: false, status: 'banned', marketStatus: 'private', price: 0, lastChecked: '1 день тому' },
  { id: '4', username: 'NeonBuilder', robux: 2300, premium: true, status: 'active', marketStatus: 'for_sale', price: 120, lastChecked: 'Тільки що' },
];

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [view, setView] = useState<'inventory' | 'logs'>('inventory');
  const [accounts, setAccounts] = useState<RobloxAccount[]>(INITIAL_ACCOUNTS);
  const [search, setSearch] = useState('');
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === 'admin1337' || accessKey === 'staff777') {
      setIsAuth(true);
      addLog('ВХІД', 'Авторизація в системі виконана');
    }
  };

  const addLog = (action: string, target: string) => {
    const newLog: AuditLog = {
      id: Math.random().toString(36),
      timestamp: new Date().toLocaleTimeString(),
      user: accessKey === 'admin1337' ? 'Admin' : 'Staff',
      action,
      target
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const filteredAccounts = useMemo(() => 
    accounts.filter(a => a.username.toLowerCase().includes(search.toLowerCase())), 
  [accounts, search]);

  const totalRobux = accounts.reduce((sum, a) => sum + a.robux, 0);

  if (!isAuth) {
    return (
      <div className="h-screen bg-[#020617] flex items-center justify-center p-6">
        <div className="glass w-full max-w-md p-10 rounded-[2.5rem] border border-white/5 shadow-2xl animate-fade-in-up">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-indigo-600/40 mb-6">N</div>
            <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">Nexus <span className="text-indigo-500">Core</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Terminal Authorization</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input 
                type="password" 
                value={accessKey}
                onChange={e => setAccessKey(e.target.value)}
                placeholder="Access Key" 
                className="w-full bg-slate-900 border border-white/5 rounded-xl py-4 px-6 text-white text-center focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 font-mono"
              />
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all active:scale-95">Authenticate</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#020617] flex flex-col text-slate-300 font-['Inter'] overflow-hidden">
      {/* Header */}
      <header className="h-20 border-b border-white/5 bg-slate-950/50 backdrop-blur-3xl px-8 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/20">N</div>
          <div>
            <h2 className="text-lg font-black text-white uppercase italic leading-none">Nexus <span className="text-indigo-500">Core</span></h2>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Control Interface v2.5</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-[9px] font-black text-slate-500 uppercase">Total Robux</p>
            <p className="text-lg font-mono font-black text-white">{totalRobux.toLocaleString()}</p>
          </div>
          <div className="h-8 w-px bg-white/5"></div>
          <div className="flex items-center gap-3">
             <div className="text-right">
                <p className="text-xs font-black text-white leading-none">Security Officer</p>
                <p className="text-[9px] text-indigo-500 font-bold uppercase mt-1">Active Session</p>
             </div>
             <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/5"></div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-20 bg-slate-950/30 border-r border-white/5 flex flex-col items-center py-8 gap-6">
           <button onClick={() => setView('inventory')} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${view === 'inventory' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40' : 'text-slate-600 hover:text-white'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6" /></svg>
           </button>
           <button onClick={() => setView('logs')} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${view === 'logs' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40' : 'text-slate-600 hover:text-white'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
           </button>
           <div className="mt-auto">
             <button onClick={() => setIsAuth(false)} className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-600 hover:text-red-500 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
             </button>
           </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-[#020617]">
          {view === 'inventory' ? (
            <div className="animate-fade-in space-y-8 max-w-7xl mx-auto">
               <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Inventory</h1>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">Asset database terminal</p>
                  </div>
                  <div className="relative w-80">
                    <input 
                      type="text" 
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search accounts..." 
                      className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 px-5 text-sm focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 font-bold"
                    />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAccounts.map(acc => (
                    <div key={acc.id} className="glass rounded-3xl p-6 border border-white/5 hover:border-indigo-500/30 transition-all group">
                       <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center font-black text-indigo-500 border border-white/5">{acc.username[0]}</div>
                             <div>
                                <h3 className="font-black text-white truncate max-w-[120px]">{acc.username}</h3>
                                <p className="text-[10px] font-mono text-slate-500 uppercase">{acc.robux.toLocaleString()} R$</p>
                             </div>
                          </div>
                          <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase border ${acc.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                             {acc.status}
                          </div>
                       </div>

                       <div className="bg-black/40 rounded-2xl p-4 mb-6 border border-white/5 space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-600">
                             <span>Password</span>
                             <button className="hover:text-white transition-colors">COPY</button>
                          </div>
                          <p className="text-sm font-mono text-white/40">••••••••••••</p>
                       </div>

                       <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 bg-white text-black py-2.5 rounded-xl font-black text-center text-sm shadow-xl shadow-white/5 tracking-tighter">
                             {acc.price} ₴
                          </div>
                          <button className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl font-black text-[10px] uppercase border border-white/5 hover:bg-slate-800 transition-all tracking-widest">
                             Update
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          ) : (
            <div className="animate-fade-in max-w-7xl mx-auto">
               <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-8">System <span className="text-indigo-500">Logs</span></h1>
               <div className="glass rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
                  <table className="w-full text-left text-[11px]">
                     <thead>
                        <tr className="bg-slate-900/50 border-b border-white/5">
                           <th className="py-4 px-6 font-black uppercase text-slate-500">Timestamp</th>
                           <th className="py-4 px-6 font-black uppercase text-slate-500">User</th>
                           <th className="py-4 px-6 font-black uppercase text-slate-500">Action</th>
                           <th className="py-4 px-6 font-black uppercase text-slate-500">Details</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {logs.length === 0 ? (
                          <tr><td colSpan={4} className="py-20 text-center text-slate-600 font-black italic uppercase">Empty database</td></tr>
                        ) : (
                          logs.map(log => (
                            <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                               <td className="py-4 px-6 font-mono text-indigo-400">{log.timestamp}</td>
                               <td className="py-4 px-6 font-black text-white">{log.user}</td>
                               <td className="py-4 px-6 font-bold uppercase text-cyan-500">{log.action}</td>
                               <td className="py-4 px-6 text-slate-400">{log.target}</td>
                            </tr>
                          ))
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
