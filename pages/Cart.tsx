
import React from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_PRODUCTS, TRANSLATIONS } from '../constants';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, language, addToCart, clearCart, promocode, setPromocode } = useApp();
  const t = TRANSLATIONS[language];
  const navigate = useNavigate();

  const cartDetails = cart.map(item => ({
    ...item,
    product: MOCK_PRODUCTS.find(p => p.id === item.productId)!
  }));

  const subtotal = cartDetails.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discount = promocode === 'WELCOME' ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-6">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold">{t.cart} bo'sh</h2>
        <Link to="/catalog" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition">
          Haridni boshlash
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-16 pt-8">
      <h1 className="text-3xl font-bold mb-10">{t.cart}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-4">
          {cartDetails.map((item, idx) => (
            <div key={`${item.productId}-${idx}`} className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 flex items-center gap-6 shadow-sm">
              <img src={item.product.image} className="w-24 h-24 object-cover rounded-2xl" />
              <div className="flex-1">
                <Link to={`/product/${item.productId}`} className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition">
                  {item.product.name[language]}
                </Link>
                <div className="flex gap-4 mt-1 text-xs text-slate-400 font-medium uppercase tracking-wide">
                  {item.selectedColor && <span>{t.color}: {item.selectedColor}</span>}
                  {item.selectedSize && <span>{t.size}: {item.selectedSize}</span>}
                </div>
                <div className="mt-2 text-indigo-600 font-bold">
                  {item.product.price.toLocaleString()} so'm
                </div>
              </div>
              <div className="flex items-center bg-slate-50 dark:bg-slate-900 p-1 rounded-xl">
                <button className="p-2 hover:text-indigo-600" onClick={() => { if(item.quantity > 1) addToCart({ ...item, quantity: -1 }); }}>
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                <button className="p-2 hover:text-indigo-600" onClick={() => addToCart({ ...item, quantity: 1 })}>
                  <Plus size={16} />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.productId)} className="p-3 text-slate-300 hover:text-rose-500 transition">
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <button onClick={clearCart} className="text-sm font-bold text-rose-500 hover:underline">Savatni tozalash</button>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
              <h3 className="text-xl font-bold mb-6">Buyurtma xulosasi</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500">
                  <span>Mahsulotlar soni</span>
                  <span className="font-bold">{cart.length}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-bold">{subtotal.toLocaleString()} so'm</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Chegirma</span>
                    <span className="font-bold">-{discount.toLocaleString()} so'm</span>
                  </div>
                )}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between">
                  <span className="text-lg font-bold">{t.total}</span>
                  <span className="text-2xl font-black text-indigo-600">{total.toLocaleString()} so'm</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.promocode}</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="WELCOME"
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500 transition"
                    onChange={(e) => setPromocode(e.target.value)}
                  />
                  <button className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition">
                    {t.apply}
                  </button>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl flex items-center justify-center space-x-3 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
              >
                <span>{t.checkout}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
