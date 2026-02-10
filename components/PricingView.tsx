
import React from 'react';
import { UserProfile } from '../types';
import { PACKAGES } from '../constants';
import { Check, Crown, Shield, Zap, Sparkles } from 'lucide-react';

interface Props {
  user: UserProfile;
  onUpgrade: () => void;
}

const PricingView: React.FC<Props> = ({ user, onUpgrade }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">简单透明的定价体系</h1>
        <p className="text-lg text-slate-500">释放 Linkr 的全部潜能，开始建立有价值的专业连接。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {PACKAGES.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`relative bg-white rounded-[2.5rem] p-8 shadow-xl border-2 transition-all duration-300 hover:scale-[1.03] flex flex-col ${pkg.recommended ? 'border-indigo-500 shadow-indigo-100 ring-4 ring-indigo-50' : 'border-slate-100'}`}
          >
            {pkg.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                最受欢迎
              </div>
            )}

            <div className="mb-8">
               <h3 className="text-xl font-bold text-slate-900 mb-1">{pkg.name}</h3>
               <p className="text-sm text-slate-500 min-h-[40px]">{pkg.description}</p>
            </div>

            <div className="mb-8">
               <div className="flex items-baseline gap-1">
                 <span className="text-4xl font-black text-slate-900">¥{pkg.price}</span>
                 <span className="text-slate-400 font-medium italic">/{pkg.id === 'pkg_year' ? '年' : pkg.id === 'pkg_quarter' ? '季' : '月'}</span>
               </div>
               <p className="text-indigo-600 font-bold text-sm mt-2 flex items-center gap-1">
                 <Zap size={14} /> 日均成本仅 ¥{pkg.dailyCost}
               </p>
            </div>

            <div className="flex-1 space-y-4 mb-10">
               <FeatureItem text="无限次 AI 智能匹配" />
               <FeatureItem text="深度资源契合度分析" />
               <FeatureItem text="优先客服支持响应" />
               <FeatureItem text="Pro 专属身份标识" />
               <FeatureItem text="导出人脉网络分析报告" />
            </div>

            <button 
              onClick={onUpgrade}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${pkg.recommended ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' : 'bg-slate-100 text-slate-800 hover:bg-slate-200 shadow-slate-200'}`}
            >
              立即订阅
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl"><Shield size={32} /></div>
            <div>
               <h4 className="font-bold text-slate-900 mb-1">支付安全保障</h4>
               <p className="text-sm text-slate-500">集成微信与支付宝，符合 PCI-DSS 数据安全标准。</p>
            </div>
         </div>
         <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-3xl"><Crown size={32} /></div>
            <div>
               <h4 className="font-bold text-slate-900 mb-1">精英人脉网络</h4>
               <p className="text-sm text-slate-500">连接全球顶级创始人、投资人及行业专家。</p>
            </div>
         </div>
         <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl"><Sparkles size={32} /></div>
            <div>
               <h4 className="font-bold text-slate-900 mb-1">AI 赋能搜索</h4>
               <p className="text-sm text-slate-500">语义化理解复杂需求，精准度远超传统关键词搜索。</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-3">
    <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
       <Check size={14} strokeWidth={3} />
    </div>
    <span className="text-slate-700 font-medium text-sm">{text}</span>
  </div>
);

export default PricingView;
