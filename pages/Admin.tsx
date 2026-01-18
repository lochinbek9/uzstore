
import React from 'react';
import { useApp } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Package, Users, DollarSign, TrendingUp, Bell, Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: 'Jan', sales: 4000, users: 2400 },
  { name: 'Feb', sales: 3000, users: 1398 },
  { name: 'Mar', sales: 2000, users: 9800 },
  { name: 'Apr', sales: 2780, users: 3908 },
  { name: 'May', sales: 1890, users: 4800 },
  { name: 'Jun', sales: 2390, users: 3800 },
  { name: 'Jul', sales: 3490, users: 4300 },
];

const Admin: React.FC = () => {
  const { user, setUser } = useApp();
  const navigate = useNavigate();

  // Simple security check (Demo only)
  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <h1 className="text-4xl font-bold text-rose-500">Kirish taqiqlangan!</h1>
        <p className="text-slate-500">Sizda administrator huquqlari yo'q.</p>
        <button onClick={() => navigate('/')} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Bosh sahifaga qaytish</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 -mx-4 md:-mx-8 px-8 py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Boshqaruv Paneli</h1>
          <p className="text-slate-500 font-medium">UzStore do'koni statistikasi</p>
        </div>
        <div className="flex items-center space-x-6">
           <div className="relative hidden md:block">
              <input type="text" placeholder="Qidiruv..." className="bg-white dark:bg-slate-900 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 ring-indigo-500 transition shadow-sm" />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
           </div>
           <button className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-slate-500 relative">
             <Bell size={20} />
             <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
           </button>
           <button onClick={() => { setUser(null); navigate('/'); }} className="flex items-center space-x-2 p-2 px-4 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition">
             <LogOut size={18} />
             <span className="hidden md:inline">Chiqish</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {[
          { icon: <DollarSign />, label: "Jami Sotuvlar", val: "420M so'm", change: "+12.5%", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
          { icon: <Users />, label: "Mijozlar", val: "1,240", change: "+5.2%", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
          { icon: <Package />, label: "Buyurtmalar", val: "842", change: "+8.1%", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
          { icon: <TrendingUp />, label: "Konversiya", val: "3.2%", change: "+1.2%", color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-start mb-4">
               <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                 {item.icon}
               </div>
               <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.bg} ${item.color}`}>
                 {item.change}
               </span>
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">{item.label}</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{item.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-8">Sotuvlar Grafigi</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>
         <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-8">So'nggi Buyurtmalar</h3>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-600">M</div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">Mijoz #{i}20</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">2 daqiqa avval</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-indigo-600">12M so'm</span>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Admin;
