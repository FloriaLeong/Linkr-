
import React, { useState } from 'react';
import { UserProfile, MatchResult } from '../types.ts';
import { MOCK_USERS } from '../constants.ts';
import { getMatchingResults } from '../services/geminiService.ts';
import { 
  Search, 
  Sparkles, 
  AlertCircle, 
  MessageSquare, 
  Heart, 
  ExternalLink, 
  ArrowRight, 
  Loader2, 
  Filter, 
  Crown, 
  Users,
  Phone,
  Mail,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';

const MatchView: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<(MatchResult & { user: UserProfile })[]>([]);
  const [selectedResult, setSelectedResult] = useState<(MatchResult & { user: UserProfile }) | null>(null);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleMatch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const matchData = await getMatchingResults(query, MOCK_USERS.filter(u => u.id !== user.id));
      const combined = matchData
        .map(m => ({
          ...m,
          user: MOCK_USERS.find(u => u.id === m.userId) as UserProfile
        }))
        .filter(r => r.user)
        .sort((a, b) => b.score - a.score);
      
      setResults(combined);
      if (combined.length > 0) setSelectedResult(combined[0]);
    } catch (err) {
      setError('匹配引擎连接失败。请确保您已在环境变量中配置有效的 API_KEY。');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, fieldId: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 w-full">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
         <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-2">
            <Sparkles size={28} />
         </div>
         <h1 className="text-4xl font-bold text-slate-900 tracking-tight">今天您想寻找谁？</h1>
         <p className="text-slate-500 text-lg">用自然语言描述您的需求——Linkr AI 将从人脉库中为您精准匹配最契合的专业人士。</p>
         
         <div className="relative group">
            <textarea 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="例如：'正在寻找一位在 AI 领域有经验的技术顾问，希望对方曾主导过 SaaS 平台从零到一的规模化增长...'"
               className="w-full p-6 pb-20 bg-white border-2 border-slate-200 focus:border-indigo-500 rounded-3xl text-lg text-slate-700 min-h-[180px] transition-all shadow-xl shadow-slate-200/50 resize-none group-hover:border-slate-300 outline-none"
            />
            <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between pointer-events-none">
               <div className="flex gap-2 pointer-events-auto">
                 <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-bold flex items-center gap-2 transition-all outline-none">
                   <Filter size={16} /> 快速模式
                 </button>
               </div>
               <button 
                  onClick={handleMatch}
                  disabled={loading || !query.trim()}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto outline-none"
               >
                 {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                 {loading ? '正在分析语义...' : '开始智能匹配'}
               </button>
            </div>
            <div className="absolute top-4 right-6">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  本周剩余额度: {user.isPro ? '无限次' : '1/1'}
               </span>
            </div>
         </div>
         
         {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 justify-center">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
         )}
      </div>

      {results.length > 0 && (
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 animate-in slide-in-from-bottom-8 duration-500">
            <div className="lg:col-span-5 space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
               <div className="flex items-center justify-between sticky top-0 bg-slate-50 py-2 z-10">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    匹配到 {results.length} 位人脉
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">按契合度降序排列</span>
               </div>
               {results.map((r) => (
                  <div 
                    key={r.userId}
                    onClick={() => setSelectedResult(r)}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer flex gap-4 items-start ${selectedResult?.userId === r.userId ? 'bg-indigo-50 border-indigo-200 shadow-md ring-1 ring-indigo-200' : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-sm'}`}
                  >
                     <div className="relative">
                        <img src={r.user.avatar} className="w-14 h-14 rounded-2xl" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 text-[10px] font-bold text-indigo-600">
                          {r.score}%
                        </div>
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                           <h4 className="font-bold text-slate-900 truncate">{r.user.name}</h4>
                           {r.user.isPro && <Crown className="text-amber-500 shrink-0" size={14} />}
                        </div>
                        <p className="text-sm text-slate-500 line-clamp-2 leading-tight mb-3">“{r.user.slogan}”</p>
                        <div className="flex flex-wrap gap-1.5">
                           {r.reasons.map((res, i) => (
                              <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-bold uppercase tracking-tight">{res}</span>
                           ))}
                        </div>
                     </div>
                     <ArrowRight size={16} className={`shrink-0 mt-1 transition-transform ${selectedResult?.userId === r.userId ? 'translate-x-1 text-indigo-600' : 'text-slate-300'}`} />
                  </div>
               ))}
            </div>

            <div className="lg:col-span-7">
               {selectedResult ? (
                  <div className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl p-8 sticky top-24 space-y-8 animate-in zoom-in-95 duration-300">
                     <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-6 items-center">
                           <img src={selectedResult.user.avatar} className="w-24 h-24 rounded-3xl shadow-xl ring-4 ring-slate-50" />
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-3xl font-bold text-slate-900">{selectedResult.user.name}</h2>
                                {selectedResult.user.isPro && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold uppercase">Pro</span>}
                              </div>
                              <p className="text-lg text-indigo-600 font-medium">{selectedResult.user.role} | {selectedResult.user.industry}</p>
                              <div className="flex items-center gap-3 mt-2 text-slate-400 text-sm font-medium">
                                 <span className="flex items-center gap-1">📍 {selectedResult.user.location}</span>
                                 <span className="flex items-center gap-1 text-emerald-600">信用评分 4.9/5</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button className="p-3 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all shadow-sm outline-none">
                              <Heart size={24} />
                           </button>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest">可供资源</h5>
                           <p className="text-slate-700 text-sm leading-relaxed">{selectedResult.user.resources}</p>
                        </div>
                        <div className="space-y-3">
                           <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest">目前寻求</h5>
                           <p className="text-slate-700 text-sm leading-relaxed">{selectedResult.user.needs}</p>
                        </div>
                     </div>

                     <div className="p-6 bg-indigo-50/50 rounded-3xl space-y-4 border border-indigo-100/50">
                        <h5 className="text-xs font-black text-indigo-600 uppercase tracking-widest">AI 匹配理由</h5>
                        <div className="space-y-3">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0">{selectedResult.score}%</div>
                              <p className="text-sm font-medium text-slate-800">该用户在您关注的行业领域有深厚积累，且其提供的资源高度契合您的核心需求。</p>
                           </div>
                           <div className="flex flex-wrap gap-2">
                              {selectedResult.reasons.map((r, i) => (
                                 <span key={i} className="px-3 py-1 bg-white text-indigo-600 rounded-xl text-xs font-bold shadow-sm border border-indigo-100">#{r}</span>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <MessageSquare size={14} className="text-indigo-600" />
                          联系方式
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {/* 电话 */}
                           <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-indigo-50 transition-colors">
                              <div className="flex items-center gap-3 min-w-0">
                                 <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm"><Phone size={16} /></div>
                                 <div className="min-w-0">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">电话号码</p>
                                    <p className="text-sm font-bold text-slate-700 truncate">{selectedResult.user.phone || '未填写'}</p>
                                 </div>
                              </div>
                              <button 
                                onClick={() => handleCopy(selectedResult.user.phone, 'phone')}
                                className={`p-2 rounded-xl transition-all ${copiedField === 'phone' ? 'text-emerald-500 bg-emerald-100' : 'text-slate-400 hover:text-indigo-600 hover:bg-white shadow-sm'}`}
                              >
                                 {copiedField === 'phone' ? <Check size={16} /> : <Copy size={16} />}
                              </button>
                           </div>
                           {/* 邮箱 */}
                           <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-indigo-50 transition-colors">
                              <div className="flex items-center gap-3 min-w-0">
                                 <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm"><Mail size={16} /></div>
                                 <div className="min-w-0">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">电子邮箱</p>
                                    <p className="text-sm font-bold text-slate-700 truncate">{selectedResult.user.email || '未填写'}</p>
                                 </div>
                              </div>
                              <button 
                                onClick={() => handleCopy(selectedResult.user.email, 'email')}
                                className={`p-2 rounded-xl transition-all ${copiedField === 'email' ? 'text-emerald-500 bg-emerald-100' : 'text-slate-400 hover:text-indigo-600 hover:bg-white shadow-sm'}`}
                              >
                                 {copiedField === 'email' ? <Check size={16} /> : <Copy size={16} />}
                              </button>
                           </div>
                           {/* LinkedIn */}
                           <div className="sm:col-span-2 p-4 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-indigo-50 transition-colors">
                              <div className="flex items-center gap-3 min-w-0">
                                 <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm"><Linkedin size={16} /></div>
                                 <div className="min-w-0">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">LinkedIn</p>
                                    <p className="text-sm font-bold text-slate-700 truncate">{selectedResult.user.linkedin || '未填写'}</p>
                                 </div>
                              </div>
                              <button 
                                onClick={() => handleCopy(selectedResult.user.linkedin, 'linkedin')}
                                className={`p-2 rounded-xl transition-all ${copiedField === 'linkedin' ? 'text-emerald-500 bg-emerald-100' : 'text-slate-400 hover:text-indigo-600 hover:bg-white shadow-sm'}`}
                              >
                                 {copiedField === 'linkedin' ? <Check size={16} /> : <Copy size={16} />}
                              </button>
                           </div>
                        </div>
                        <div className="pt-2 flex gap-4">
                           <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 outline-none">
                              <MessageSquare size={18} />
                              立即私信
                           </button>
                           <button className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2 outline-none">
                              <ExternalLink size={18} />
                              完整档案
                           </button>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="h-full min-h-[500px] border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center p-12 text-center text-slate-400">
                     <Users size={64} className="mb-6 opacity-20" />
                     <p className="text-lg font-medium">请在左侧选择一个人脉，查看详细的契合度分析与联系方式。</p>
                  </div>
               )}
            </div>
         </div>
      )}
    </div>
  );
};

export default MatchView;
