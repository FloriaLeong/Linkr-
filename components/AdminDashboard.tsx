
import React from 'react';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Search,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold text-slate-900">系统管理后台</h1>
         <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">导出日志</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">配置系统</button>
         </div>
      </div>

      {/* 运营概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <AdminStatCard label="总用户数" value="12,840" trend="+12%" color="blue" icon={<Users />} />
         <AdminStatCard label="总营收" value="¥142,500" trend="+8.4%" color="emerald" icon={<CreditCard />} />
         <AdminStatCard label="付费转化率" value="4.2%" trend="+0.5%" color="amber" icon={<TrendingUp />} />
         <AdminStatCard label="累计匹配次数" value="8,922" trend="+15%" color="indigo" icon={<BarChart3 />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* 用户管理列表 */}
         <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
               <h3 className="font-bold text-slate-800">近期注册用户</h3>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="搜索用户姓名/邮箱..." className="pl-9 pr-4 py-2 bg-slate-50 border-transparent rounded-xl text-xs focus:bg-white focus:border-indigo-500 transition-all w-48" />
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <th className="px-6 py-4">用户信息</th>
                        <th className="px-6 py-4">状态</th>
                        <th className="px-6 py-4">订阅级别</th>
                        <th className="px-6 py-4">操作</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {[1,2,3,4,5].map((i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-all cursor-pointer group">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <img src={`https://picsum.photos/seed/${i}/40`} className="w-10 h-10 rounded-full" />
                                 <div>
                                    <p className="text-sm font-bold text-slate-900">用户 {i}</p>
                                    <p className="text-[10px] text-slate-400">user{i}@example.com</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold">正常活跃</span>
                           </td>
                           <td className="px-6 py-4">
                              <span className={`text-xs font-bold ${i % 2 === 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                                 {i % 2 === 0 ? 'Pro 会员' : '免费版'}
                              </span>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                 <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all"><ChevronRight size={18} /></button>
                                 <button className="p-2 text-slate-400 hover:text-red-500 transition-all"><XCircle size={18} /></button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* 实时销售记录 */}
         <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
            <h3 className="font-bold text-slate-800">最新订单动态</h3>
            <div className="space-y-6">
               {[1,2,3,4].map((i) => (
                  <div key={i} className="flex gap-4">
                     <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                        <CreditCard size={20} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">季度套餐成功购买</p>
                        <p className="text-xs text-slate-500">¥48.80 - 订单号 #ORD-89{i}</p>
                     </div>
                     <span className="text-[10px] text-slate-400 whitespace-nowrap mt-1">{i*2}分钟前</span>
                  </div>
               ))}
            </div>
            <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-all">查看所有交易记录</button>
         </div>
      </div>
    </div>
  );
};

const AdminStatCard: React.FC<{ label: string, value: string, trend: string, color: string, icon: React.ReactNode }> = ({ label, value, trend, color, icon }) => {
  const colors: any = {
    blue: 'text-blue-600 bg-blue-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    amber: 'text-amber-600 bg-amber-50',
    indigo: 'text-indigo-600 bg-indigo-50'
  };
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
      <div className={`p-4 rounded-2xl ${colors[color]}`}>{icon}</div>
      <div>
         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
         <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-slate-900">{value}</h3>
            <span className="text-[10px] font-black text-emerald-500">{trend}</span>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
