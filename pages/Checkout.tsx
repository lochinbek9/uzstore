
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS, MOCK_PRODUCTS } from '../constants';
import { sendOrderToTelegram } from '../services/telegram';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, language, clearCart } = useApp();
  const t = TRANSLATIONS[language];
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const cartDetails = cart.map(item => {
    const p = MOCK_PRODUCTS.find(p => p.id === item.productId)!;
    return { name: p.name[language], quantity: item.quantity, price: p.price };
  });

  const total = cartDetails.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const ok = await sendOrderToTelegram({
      name: form.name,
      phone: form.phone,
      items: cartDetails,
      total
    });

    if (ok) {
      setSuccess(true);
      clearCart();
    } else {
      alert("Xatolik yuz berdi. Iltimos qaytadan urunib ko'ring.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-6 text-center">
        <CheckCircle size={80} className="text-emerald-500" />
        <h2 className="text-3xl font-bold">Rahmat! Buyurtmangiz qabul qilindi.</h2>
        <p className="text-slate-500 max-w-md">Operatorlarimiz tez orada siz bilan bog'lanishadi.</p>
        <button onClick={() => navigate('/')} className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700">
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-16">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-2xl border border-slate-200 dark:border-slate-700">
        <h1 className="text-3xl font-bold mb-8">{t.checkout}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t.fullName}</label>
            <input 
              required
              type="text" 
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-5 py-4 rounded-2xl focus:ring-4 ring-indigo-500/10 outline-none transition"
              placeholder="Falonchiev Pismadonchi"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t.phone}</label>
            <input 
              required
              type="tel" 
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-5 py-4 rounded-2xl focus:ring-4 ring-indigo-500/10 outline-none transition"
              placeholder="+998 90 123 45 67"
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
            />
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-3">
             <div className="flex justify-between items-center font-medium text-slate-500">
               <span>Buyurtma qiymati:</span>
               <span className="font-bold text-slate-900 dark:text-white">{total.toLocaleString()} so'm</span>
             </div>
             <div className="flex justify-between items-center font-medium text-slate-500">
               <span>Yetkazib berish:</span>
               <span className="text-emerald-500 font-bold">Bepul</span>
             </div>
          </div>

          <button 
            disabled={loading}
            className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-black text-lg rounded-2xl flex items-center justify-center space-x-3 shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" /> : <span>{t.sendOrder}</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
