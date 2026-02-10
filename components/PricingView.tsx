
import React, { useState } from 'react';
import { UserProfile, Package, PlanDuration } from '../types.ts';
import { PACKAGES } from '../constants.ts';
import { Check, Crown, Shield, Zap, Sparkles, X, Loader2, QrCode, CheckCircle2 } from 'lucide-react';

interface Props {
  user: UserProfile;
  onUpgrade: (duration: PlanDuration) => void;
}

type PaymentStep = 'selection' | 'processing' | 'success';
type PaymentMethod = 'wechat' | 'alipay';

const PricingView: React.FC<Props> = ({ user, onUpgrade }) => {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [step, setStep] = useState<PaymentStep>('selection');
  const [method, setMethod] = useState<PaymentMethod>('wechat');

  const handleOpenPayment = (pkg: Package) => {
    setSelectedPkg(pkg);
    setStep('selection');
    setMethod('wechat');
  };

  const handleStartPayment = () => {
    setStep('processing');
    // 模拟支付过程
    setTimeout(() => {
      setStep('success');
      if (selectedPkg) {
        onUpgrade(selectedPkg.duration);
      }
    }, 2500);
  };

  const handleClose = () => {
    setSelectedPkg(null);
    setStep('selection');
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-12 w-full">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold animate-pulse">
           <Sparkles size={16} /> 专属 Pro 权益
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">简单透明的定价体系</h1>
        <p className="text-lg text-slate-500">释放 Linkr 的全部潜能，开始建立有价值的专业连接。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {PACKAGES.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`relative bg-white rounded-[2.5rem] p-8 shadow-xl border-2 transition-all duration-500 hover:scale-[1.03] flex flex-col group ${pkg.recommended ? 'border-indigo-500 shadow-indigo-100 ring-4 ring-indigo-50' : 'border-slate-100'}`}
          >
            {pkg.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg z-10">
                最受欢迎
              </div>
            )}

            <div className="mb-8 relative z-10">
               <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{pkg.name}</h3>
               <p className="text-sm text-slate-500 min-h-[40px]">{pkg.description}</p>
            </div>

            <div className="mb-8 relative z-10">
               <div className="flex items-baseline gap-1">
                 <span className="text-4xl font-black text-slate-900">¥{pkg.price}</span>
                 <span className="text-slate-400 font-medium italic">/{pkg.id === 'pkg_year' ? '年' : pkg.id === 'pkg_quarter' ? '季' : '月'}</span>
               </div>
               <p className="text-indigo-600 font-bold text-sm mt-2 flex items-center gap-1">
                 <Zap size={14} className="fill-indigo-600" /> 日均成本仅 ¥{pkg.dailyCost}
               </p>
            </div>

            <div className="flex-1 space-y-4 mb-10 relative z-10">
               <FeatureItem text="无限次 AI 智能匹配" />
               <FeatureItem text="深度资源契合度分析" />
               <FeatureItem text="优先客服支持响应" />
               <FeatureItem text="Pro 专属身份标识" />
               <FeatureItem text="导出人脉网络分析报告" />
            </div>

            <button 
              onClick={() => handleOpenPayment(pkg)}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all relative z-10 outline-none ${pkg.recommended ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' : 'bg-slate-100 text-slate-800 hover:bg-slate-200 shadow-slate-200'}`}
            >
              立即订阅
            </button>
            
            {/* 背景装饰 */}
            <div className={`absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10 pointer-events-none ${pkg.recommended ? 'text-indigo-600' : 'text-slate-400'}`}>
              <Crown size={120} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="flex flex-col items-center text-center gap-4 group">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl group-hover:scale-110 transition-transform"><Shield size={32} /></div>
            <div>
               <h4 className="font-bold text-slate-900 mb-1">支付安全保障</h4>
               <p className="text-sm text-slate-500">集成微信与支付宝，符合 PCI-DSS 数据安全标准。</p>
            </div>
         </div>
         <div className="flex flex-col items-center text-center gap-4 group">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-3xl group-hover:scale-110 transition-transform"><Crown size={32} /></div>
            <div>
               <h4 className="font-bold text-slate-900 mb-1">精英人脉网络</h4>
               <p className="text-sm text-slate-500">连接全球顶级创始人、投资人及行业专家。</p>
            </div>
         </div>
         <div className="flex flex-col items-center text-center gap-4 group">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl group-hover:scale-110 transition-transform"><Sparkles size={32} /></div>
            <div>
               <h4 className="font-bold text-slate-900 mb-1">AI 赋能搜索</h4>
               <p className="text-sm text-slate-500">语义化理解复杂需求，精准度远超传统关键词搜索。</p>
            </div>
         </div>
      </div>

      {/* 支付模态框 */}
      {selectedPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleClose}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <button 
               onClick={handleClose}
               className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors z-20 outline-none"
             >
               <X size={20} />
             </button>

             {step === 'selection' && (
               <div className="p-10 space-y-8">
                  <div className="text-center space-y-2">
                     <h2 className="text-2xl font-bold text-slate-900">确认您的订单</h2>
                     <p className="text-slate-500">正在订阅：{selectedPkg.name}</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-3xl flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">应付总额</p>
                      <h3 className="text-3xl font-black text-indigo-600">¥{selectedPkg.price}</h3>
                    </div>
                    <div className="text-right">
                       <p className="text-xs text-slate-500 italic">日均仅需 ¥{selectedPkg.dailyCost}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">选择支付方式</p>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setMethod('wechat')}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 outline-none ${method === 'wechat' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                         <img src="https://img.icons8.com/color/48/weixing.png" className="w-8 h-8" alt="WeChat" />
                         <span className="text-xs font-bold text-slate-700">微信支付</span>
                      </button>
                      <button 
                        onClick={() => setMethod('alipay')}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 outline-none ${method === 'alipay' ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                         <img src="https://img.icons8.com/color/48/alipay.png" className="w-8 h-8" alt="Alipay" />
                         <span className="text-xs font-bold text-slate-700">支付宝</span>
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={handleStartPayment}
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 outline-none"
                  >
                    确认并支付
                  </button>
                  <p className="text-[10px] text-slate-400 text-center px-4 leading-relaxed">
                    点击支付即表示您同意《Linkr 会员服务协议》及《隐私条款》。订阅到期前不会自动扣费。
                  </p>
               </div>
             )}

             {step === 'processing' && (
               <div className="p-10 space-y-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-48 h-48 bg-white border-8 border-slate-50 rounded-[2rem] flex items-center justify-center relative shadow-inner">
                    <QrCode size={120} className="text-slate-800 opacity-20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-[2rem]">
                       <Loader2 size={48} className="text-indigo-600 animate-spin mb-4" />
                       <p className="text-sm font-bold text-slate-600">正在生成安全支付码...</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">请使用{method === 'wechat' ? '微信' : '支付宝'}扫码</h3>
                    <p className="text-sm text-slate-500">支付完成后页面将自动跳转</p>
                  </div>
               </div>
             )}

             {step === 'success' && (
               <div className="p-10 space-y-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-500">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900">订阅成功！</h3>
                    <p className="text-slate-500">恭喜！您已成为 Linkr Pro 会员。</p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-3xl w-full">
                    <p className="text-sm font-bold text-emerald-800">所有 Pro 权益已实时生效</p>
                    <p className="text-xs text-emerald-600 mt-1">您可以立即返回“智能匹配”开始无限次人脉对接。</p>
                  </div>
                  <button 
                    onClick={handleClose}
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg hover:bg-emerald-700 transition-all outline-none"
                  >
                    开始体验
                  </button>
               </div>
             )}
          </div>
        </div>
      )}
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
