
import React from 'react';
import { UserProfile } from '../types';
import { Save, User, Globe, Tag, MapPin, Briefcase, HelpCircle, Share2, Search } from 'lucide-react';

interface Props {
  user: UserProfile;
  onUpdate: (updated: UserProfile) => void;
}

const ProfileView: React.FC<Props> = ({ user, onUpdate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* 头部背景 */}
      <div className="relative h-48 rounded-3xl bg-indigo-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20"></div>
        <div className="absolute -bottom-12 left-8 flex items-end gap-6">
           <div className="relative">
             <img src={user.avatar} className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl" />
             <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg text-slate-500 hover:text-indigo-600 transition-all border border-slate-100">
               <User size={16} />
             </button>
           </div>
           <div className="mb-14">
             <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
             <p className="text-slate-600 font-medium">{user.role}</p>
           </div>
        </div>
        <div className="absolute top-8 right-8 flex gap-3">
          <button className="p-3 bg-white/80 hover:bg-white rounded-xl shadow-lg transition-all text-slate-600">
            <Share2 size={20} />
          </button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2 font-bold">
            <Save size={18} />
            保存资料
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
         {/* 侧边信息 */}
         <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
               <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">核心标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.tags.map(t => (
                      <span key={t} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">{t}</span>
                    ))}
                    <button className="px-3 py-1 border-2 border-dashed border-slate-200 text-slate-400 rounded-lg text-xs font-bold hover:border-indigo-300 hover:text-indigo-400 transition-all">+ 新增</button>
                  </div>
               </div>
               <hr />
               <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-500"><MapPin size={16} /> 常驻城市</div>
                    <span className="font-semibold text-slate-800">{user.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-500"><Globe size={16} /> 所属行业</div>
                    <span className="font-semibold text-slate-800">{user.industry}</span>
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-amber-800 uppercase tracking-widest">订阅状态</h3>
                  {user.isPro && <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Pro 已开通</span>}
               </div>
               <p className="text-sm text-amber-900/70 mb-4">{user.isPro ? '您已解锁所有高级人脉匹配功能。' : '升级至 Pro 以解锁深度匹配和无限额度。'}</p>
               <button className="w-full py-2 bg-amber-500 text-white rounded-xl font-bold shadow-lg shadow-amber-200 hover:bg-amber-600 transition-all">
                  {user.isPro ? '管理账单' : '立即升级'}
               </button>
            </div>
         </div>

         {/* 主要编辑区 */}
         <div className="md:col-span-2 space-y-6">
            <Section title="职业个性标语" icon={<Tag className="text-indigo-500" />}>
               <textarea 
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl text-slate-700 min-h-[100px] transition-all"
                  value={user.slogan}
                  placeholder="用一句话概括您能解决什么问题..."
               />
            </Section>

            <Section title="您正在解决什么问题？" icon={<HelpCircle className="text-blue-500" />}>
               <textarea 
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl text-slate-700 min-h-[100px] transition-all"
                  value={user.solving}
                  placeholder="详细描述您目前专注的业务挑战或研究课题..."
               />
            </Section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <Section title="可供资源" icon={<Briefcase className="text-emerald-500" />}>
                  <textarea 
                     className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl text-slate-700 min-h-[150px] transition-all"
                     value={user.resources}
                     placeholder="您能为他人提供什么？(技能、资金、渠道等)"
                  />
               </Section>
               <Section title="核心需求" icon={<Search className="text-rose-500" />}>
                  <textarea 
                     className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl text-slate-700 min-h-[150px] transition-all"
                     value={user.needs}
                     placeholder="您目前最想连接哪类人脉？(合伙人、导师、客户等)"
                  />
               </Section>
            </div>
         </div>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
    <div className="flex items-center gap-3">
      {icon}
      <h3 className="font-bold text-slate-800">{title}</h3>
    </div>
    {children}
  </div>
);

export default ProfileView;
