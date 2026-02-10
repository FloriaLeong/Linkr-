
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { UserProfile, PlanDuration } from './types.ts';
import { MOCK_USERS } from './constants.ts';
import ProfileView from './components/ProfileView.tsx';
import MatchView from './components/MatchView.tsx';
import PricingView from './components/PricingView.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import { 
  Users, 
  Search, 
  Crown, 
  LayoutDashboard, 
  LogOut, 
  Settings,
  Bell,
  MessageSquare,
  X,
  LogIn,
  UserPlus
} from 'lucide-react';

const App: React.FC = () => {
  // 默认登录用户：孙迈克 (管理员)
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_USERS[4]); 
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  // 注册/登录表单状态
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');

  const handleUpgrade = (duration: PlanDuration) => {
    const now = new Date();
    let expiry = new Date();
    if (duration === PlanDuration.MONTH) expiry.setMonth(now.getMonth() + 1);
    if (duration === PlanDuration.QUARTER) expiry.setMonth(now.getMonth() + 3);
    if (duration === PlanDuration.YEAR) expiry.setFullYear(now.getFullYear() + 1);

    setCurrentUser({
      ...currentUser,
      isPro: true,
      expiryDate: expiry.toISOString().split('T')[0]
    });
  };

  const handleAuthAction = () => {
    if (isLoginView) {
      // 模拟登录：如果是已存在的用户邮箱，则切换
      const found = MOCK_USERS.find(u => u.email === authEmail);
      if (found) setCurrentUser(found);
    } else {
      // 模拟注册：创建一个新用户并自动登录
      const newUser: UserProfile = {
        id: `u${Date.now()}`,
        name: authName || '新用户',
        avatar: `https://picsum.photos/seed/${Math.random()}/200`,
        slogan: '新加入 Linkr 的人脉探索者',
        role: '待完善',
        industry: '待完善',
        tags: [],
        solving: '',
        resources: '',
        needs: '',
        location: '未知',
        completeness: 10,
        isPro: false,
        isAdmin: false,
        matchCount: 0,
        viewCount: 0,
        requestCount: 0,
        phone: '',
        email: authEmail,
        linkedin: ''
      };
      setCurrentUser(newUser);
    }
    setShowAuthModal(false);
    setAuthEmail('');
    setAuthName('');
  };

  return (
    <Router>
      <div className="flex h-screen bg-slate-50">
        {/* 侧边栏 */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-indigo-900 text-white transition-all duration-300 flex flex-col h-full sticky top-0 z-20`}>
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg text-white">L</div>
            {isSidebarOpen && <span className="text-xl font-bold tracking-tight text-white">Linkr</span>}
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2">
            <SidebarLink to="/" icon={<Search size={20} />} label="智能匹配" />
            <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="控制面板" />
            <SidebarLink to="/profile" icon={<Users size={20} />} label="个人资料" />
            <SidebarLink to="/upgrade" icon={<Crown size={20} />} label="Pro 会员权益" className="text-amber-400" />
            
            {/* 权限控制：仅管理员可见 */}
            {currentUser.isAdmin && (
              <SidebarLink to="/admin" icon={<Settings size={20} />} label="系统管理" />
            )}
          </nav>

          <div className="p-4 border-t border-indigo-800 space-y-4">
             {isSidebarOpen && (
               <div className="flex items-center gap-3 mb-4">
                  <img src={currentUser.avatar} alt="用户" className="w-10 h-10 rounded-full border-2 border-indigo-400" />
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold truncate text-white">{currentUser.name}</p>
                    <p className="text-xs text-indigo-300 capitalize">
                      {currentUser.isAdmin ? '系统管理员' : currentUser.isPro ? 'Pro 会员' : '免费版'}
                    </p>
                  </div>
               </div>
             )}
             <button className="flex items-center gap-3 text-indigo-300 hover:text-white transition-colors w-full px-2 outline-none">
                <LogOut size={20} />
                {isSidebarOpen && <span className="text-sm">退出登录</span>}
             </button>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 overflow-auto flex flex-col">
          {/* 顶栏 */}
          <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-30 glass-effect shrink-0">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
            >
              <LayoutDashboard size={20} />
            </button>
            <div className="flex-1 max-w-xl mx-4 relative hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                  type="text" 
                  placeholder="快速搜索人脉、技能或资源..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl text-sm transition-all outline-none"
               />
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors">
                <MessageSquare size={20} />
              </button>
              <div className="h-8 w-px bg-slate-200 mx-2"></div>
              <button 
                onClick={() => {
                  setIsLoginView(true);
                  setShowAuthModal(true);
                }}
                className="flex items-center gap-2 hover:opacity-80 transition-all p-1 pr-3 rounded-full hover:bg-slate-50 outline-none"
              >
                 <img src={currentUser.avatar} className="w-8 h-8 rounded-full border border-indigo-100 shadow-sm" />
                 <span className="text-sm font-bold text-slate-700 hidden sm:block">登录/注册</span>
              </button>
            </div>
          </header>

          <div className="p-8 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<MatchView user={currentUser} />} />
              <Route path="/dashboard" element={<Dashboard user={currentUser} />} />
              <Route path="/profile" element={<ProfileView user={currentUser} onUpdate={setCurrentUser} />} />
              <Route path="/upgrade" element={<PricingView user={currentUser} onUpgrade={handleUpgrade} />} />
              
              {/* 路由权限拦截 */}
              <Route 
                path="/admin" 
                element={currentUser.isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />} 
              />
            </Routes>
          </div>
        </main>

        {/* 登录/注册模态框 */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAuthModal(false)}></div>
            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
               <button 
                 onClick={() => setShowAuthModal(false)}
                 className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
               >
                 <X size={20} />
               </button>

               <div className="p-10 space-y-8">
                  <div className="text-center space-y-2">
                     <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-3xl shadow-xl shadow-indigo-100 mx-auto mb-4">L</div>
                     <h2 className="text-2xl font-bold text-slate-900">{isLoginView ? '欢迎回来' : '开启 Linkr 之旅'}</h2>
                     <p className="text-slate-500">{isLoginView ? '登录以继续您的商务连接' : '加入全球最精准的人脉智能匹配网络'}</p>
                  </div>

                  <div className="space-y-4">
                     {!isLoginView && (
                       <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">姓名</label>
                          <input 
                            type="text" 
                            placeholder="如何称呼您？" 
                            className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl transition-all outline-none" 
                            value={authName}
                            onChange={(e) => setAuthName(e.target.value)}
                          />
                       </div>
                     )}
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">手机号 / 邮箱</label>
                        <input 
                          type="text" 
                          placeholder="请输入您的账号" 
                          className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl transition-all outline-none" 
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">密码</label>
                        <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl transition-all outline-none" />
                     </div>
                  </div>

                  <button 
                    onClick={handleAuthAction}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 outline-none"
                  >
                     {isLoginView ? <LogIn size={18} /> : <UserPlus size={18} />}
                     {isLoginView ? '立即登录' : '注册并登录'}
                  </button>

                  <div className="flex items-center justify-between px-2">
                     <button className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors outline-none">忘记密码？</button>
                     <button 
                       onClick={() => setIsLoginView(!isLoginView)}
                       className="text-xs font-bold text-indigo-600 hover:underline outline-none"
                     >
                       {isLoginView ? '还没有账号？去注册' : '已有账号？去登录'}
                     </button>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

const SidebarLink: React.FC<{ to: string, icon: React.ReactNode, label: string, className?: string }> = ({ to, icon, label, className }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'} ${className || ''}`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

const Dashboard: React.FC<{ user: UserProfile }> = ({ user }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">控制面板</h1>
        <p className="text-slate-500">本周您的有效人脉网络增长了 <span className="text-indigo-600 font-semibold">+12%</span>。</p>
      </div>
      <Link to="/" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2 w-fit">
        <Search size={18} />
        发起智能匹配
      </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <StatCard label="匹配成功率" value="84%" subValue="环比增长 5%" icon={<Search className="text-blue-600" />} />
       <StatCard label="资料曝光量" value={user.viewCount.toString()} subValue="超过 95% 的同行" icon={<Users className="text-green-600" />} />
       <StatCard label="待处理请求" value={user.requestCount.toString()} subValue="3 条新消息" icon={<MessageSquare className="text-purple-600" />} />
       <StatCard label="本周剩余额度" value={user.isPro ? "无限制" : "1/1"} subValue={user.isPro ? "Pro 会员权益" : "每周一重置"} icon={<Crown className="text-amber-500" />} />
    </div>

    {!user.isPro && (
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10 max-w-lg">
           <h2 className="text-2xl font-bold mb-2 text-white">升级至 Linkr Pro</h2>
           <p className="text-indigo-100 mb-6 text-lg">解锁无限次智能匹配、更高的资料权重，以及与顶级投资人和行业专家的直接沟通权限。</p>
           <Link to="/upgrade" className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors inline-block">
             查看订阅套餐
           </Link>
         </div>
         <div className="absolute top-0 right-0 p-8 hidden lg:block opacity-20">
           <Crown size={180} className="text-white" />
         </div>
      </div>
    )}

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       <div className="lg:col-span-2 space-y-6">
         <h3 className="text-xl font-bold text-slate-800">猜您可能感兴趣的人脉</h3>
         <div className="space-y-4">
           {MOCK_USERS.slice(0, 3).map((u) => (
             <div key={u.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all group">
                <img src={u.avatar} className="w-14 h-14 rounded-full ring-2 ring-indigo-50" />
                <div className="flex-1">
                   <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{u.name}</h4>
                   <p className="text-sm text-slate-500 line-clamp-1">{u.slogan}</p>
                   <div className="flex gap-2 mt-2">
                     {u.tags.slice(0, 2).map(t => (
                       <span key={t} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>
                     ))}
                   </div>
                </div>
                <button className="p-3 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <MessageSquare size={20} />
                </button>
             </div>
           ))}
         </div>
       </div>

       <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-fit">
          <h3 className="text-lg font-bold mb-4">资料完善度</h3>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                  已完成 {user.completeness}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
              <div style={{ width: `${user.completeness}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-1000"></div>
            </div>
            <ul className="text-xs text-slate-500 space-y-3">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 核心信息已验证</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> 自动生成标签云</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> 绑定 LinkedIn (+15%)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> 上传成功案例 (+20%)</li>
            </ul>
          </div>
       </div>
    </div>
  </div>
);

const StatCard: React.FC<{ label: string, value: string, subValue: string, icon: React.ReactNode }> = ({ label, value, subValue, icon }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
    <div className="space-y-1">
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <p className="text-xs text-slate-500">{subValue}</p>
    </div>
  </div>
);

export default App;
