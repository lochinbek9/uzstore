
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Users, DollarSign, TrendingUp, Bell, Search, LogOut, Plus, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Fixed: Imported Language type which was missing and causing errors in the form handling.
import { Product, Language } from '../types';

const chartData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const Admin: React.FC = () => {
  const { user, setUser, products, addProduct, updateProduct, deleteProduct, language } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [form, setForm] = useState<Partial<Product>>({
    name: { uz: '', ru: '', en: '' },
    description: { uz: '', ru: '', en: '' },
    price: 0,
    stock: 0,
    category: 'Smartphones',
    image: 'https://picsum.photos/400/400',
    colors: ['Black'],
    sizes: ['128GB'],
    specs: {}
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
        <h1 className="text-4xl font-black text-rose-500">Kirish taqiqlangan!</h1>
        <button onClick={() => navigate('/')} className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold">Bosh sahifaga qaytish</button>
      </div>
    );
  }

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      ...form,
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      rating: editingProduct ? editingProduct.rating : 5,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 0
    } as Product;

    if (editingProduct) {
      updateProduct(newProduct);
    } else {
      addProduct(newProduct);
    }
    
    setIsModalOpen(false);
    setEditingProduct(null);
    setForm({
      name: { uz: '', ru: '', en: '' },
      description: { uz: '', ru: '', en: '' },
      price: 0,
      stock: 0,
      category: 'Smartphones'
    });
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm(p);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 -mx-4 md:-mx-8 px-4 md:px-8 py-8 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Boshqaruv Paneli</h1>
          <div className="flex mt-4 bg-white dark:bg-slate-900 p-1 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'products' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              Mahsulotlar
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
           <button onClick={() => { setUser(null); navigate('/'); }} className="flex items-center space-x-2 p-3 bg-rose-50 text-rose-600 rounded-2xl font-bold hover:bg-rose-100 transition shadow-sm border border-rose-100">
             <LogOut size={20} />
             <span className="hidden md:inline">Chiqish</span>
           </button>
        </div>
      </div>

      {activeTab === 'dashboard' ? (
        <div className="space-y-10 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <DollarSign />, label: "Jami Sotuvlar", val: "420M so'm", change: "+12.5%", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
              { icon: <Users />, label: "Mijozlar", val: "1,240", change: "+5.2%", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
              { icon: <Package />, label: "Buyurtmalar", val: "842", change: "+8.1%", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
              { icon: <TrendingUp />, label: "Konversiya", val: "3.2%", change: "+1.2%", color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl ${item.bg} ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className={`text-xs font-black px-3 py-1.5 rounded-full ${item.bg} ${item.color}`}>
                    {item.change}
                  </span>
                </div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{item.label}</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{item.val}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-black mb-8">Sotuvlar Grafigi</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-black mb-8">So'nggi Faollik</h3>
              <div className="space-y-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center font-black text-indigo-600">M</div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">Mijoz #{i}20</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Toshkent, UZ</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-indigo-600">+12M</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-8 flex justify-between items-center border-b border-slate-50 dark:border-slate-800">
              <h3 className="text-xl font-black">Barcha Mahsulotlar ({products.length})</h3>
              <button 
                onClick={() => { setEditingProduct(null); setForm({}); setIsModalOpen(true); }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center space-x-2 hover:bg-indigo-500 transition shadow-lg shadow-indigo-100"
              >
                <Plus size={20} />
                <span>Yangi Qo'shish</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="px-8 py-5">Rasm</th>
                    <th className="px-8 py-5">Nomi</th>
                    <th className="px-8 py-5">Kategoriya</th>
                    <th className="px-8 py-5">Narxi</th>
                    <th className="px-8 py-5">Zaxira</th>
                    <th className="px-8 py-5">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-8 py-5">
                        <img src={p.image} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                      </td>
                      <td className="px-8 py-5">
                        <p className="font-bold text-slate-900 dark:text-white">{p.name[language]}</p>
                        <p className="text-xs text-slate-400 font-medium line-clamp-1">{p.id}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg text-xs font-bold uppercase">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-8 py-5 font-black text-slate-900 dark:text-white">
                        {p.price.toLocaleString()} so'm
                      </td>
                      <td className="px-8 py-5">
                        <span className={`font-bold ${p.stock < 5 ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
                          {p.stock} dona
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => openEdit(p)} className="p-2 text-slate-400 hover:text-indigo-600 transition"><Edit size={18} /></button>
                          <button onClick={() => deleteProduct(p.id)} className="p-2 text-slate-400 hover:text-rose-500 transition"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black">{editingProduct ? "Mahsulotni Tahrirlash" : "Yangi Mahsulot Qo'shish"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Input */}
              <div className="space-y-4">
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Rasm URL</p>
                 <div className="relative">
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 pl-12 focus:ring-2 ring-indigo-500 transition"
                      placeholder="https://..."
                      value={form.image}
                      onChange={(e) => setForm({...form, image: e.target.value})}
                    />
                    <ImageIcon className="absolute left-4 top-4 text-slate-400" size={20} />
                 </div>
                 <div className="aspect-video rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                    <img src={form.image} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.src = "https://placehold.co/400x400")} />
                 </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Narxi (so'm)</p>
                      <input 
                        type="number" 
                        required
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 font-bold"
                        value={form.price}
                        onChange={(e) => setForm({...form, price: Number(e.target.value)})}
                      />
                   </div>
                   <div className="space-y-2">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Zaxira (stock)</p>
                      <input 
                        type="number" 
                        required
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 font-bold"
                        value={form.stock}
                        onChange={(e) => setForm({...form, stock: Number(e.target.value)})}
                      />
                   </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Kategoriya</p>
                  <select 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 font-bold"
                    value={form.category}
                    onChange={(e) => setForm({...form, category: e.target.value})}
                  >
                    <option value="Smartphones">Smartphones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Audio">Audio</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              {/* Multi-language Names */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                {['uz', 'ru', 'en'].map((lang) => (
                   <div key={lang} className="space-y-2">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Nomi ({lang.toUpperCase()})</p>
                      <input 
                        required
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 font-bold"
                        value={form.name?.[lang as Language]}
                        onChange={(e) => setForm({
                          ...form, 
                          name: { ...form.name, [lang]: e.target.value } as Record<Language, string>
                        })}
                      />
                   </div>
                ))}
              </div>

              {/* Multi-language Descriptions */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                {['uz', 'ru', 'en'].map((lang) => (
                   <div key={lang} className="space-y-2">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tavsif ({lang.toUpperCase()})</p>
                      <textarea 
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 min-h-[120px]"
                        value={form.description?.[lang as Language]}
                        onChange={(e) => setForm({
                          ...form, 
                          description: { ...form.description, [lang]: e.target.value } as Record<Language, string>
                        })}
                      />
                   </div>
                ))}
              </div>

              <div className="md:col-span-2 pt-6">
                 <button 
                   type="submit"
                   className="w-full h-16 bg-indigo-600 text-white rounded-[2rem] font-black text-lg hover:bg-indigo-500 transition shadow-xl shadow-indigo-100"
                 >
                   Saqlash
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
