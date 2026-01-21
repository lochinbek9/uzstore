
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { useApp } from '../context/AppContext';
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingCart, MessageSquare, ChevronLeft, ArrowRight } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, addToCart, products } = useApp();
  const t = TRANSLATIONS[language];
  const product = products.find(p => p.id === id);

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  if (!product) return (
    <div className="flex flex-col items-center justify-center py-40">
      <h1 className="text-3xl font-black mb-4">Mahsulot topilmadi</h1>
      <button onClick={() => navigate('/')} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">Ortga qaytish</button>
    </div>
  );

  const installmentPrice = Math.round(product.price * 1.12 / 12);

  return (
    <div className="pb-24 pt-10">
      <button onClick={() => navigate(-1)} className="group flex items-center text-slate-400 hover:text-indigo-600 mb-10 transition-all font-bold text-sm uppercase tracking-widest">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="ml-2">{t.back}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7">
          <div className="sticky top-28 space-y-8">
            <div className="aspect-[4/4] bg-white dark:bg-slate-800 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-100/50 dark:shadow-none">
              <img src={product.image} className="w-full h-full object-cover" alt={product.name[language]} />
            </div>
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-white dark:bg-slate-800 rounded-[1.5rem] overflow-hidden cursor-pointer border-2 border-transparent hover:border-indigo-600 transition-all p-1 shadow-sm">
                  <img src={product.image} className="w-full h-full object-cover rounded-[1.2rem] opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm font-black text-slate-900 dark:text-white">{product.rating}</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{product.reviewsCount} {t.reviews}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              {product.name[language]}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 leading-loose text-lg font-medium">
              {product.description[language]}
            </p>
          </div>

          <div className="space-y-10">
            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-4">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{t.color}</p>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button 
                        key={color} 
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${selectedColor === color ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-lg shadow-indigo-100 dark:shadow-none' : 'border-slate-100 dark:border-slate-800 dark:text-slate-300 hover:border-indigo-300'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-4">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{t.size}</p>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button 
                        key={size} 
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${selectedSize === size ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-lg shadow-indigo-100 dark:shadow-none' : 'border-slate-100 dark:border-slate-800 dark:text-slate-300 hover:border-indigo-300'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price Box */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-[0_30px_60px_-15px_rgba(79,70,229,0.1)]">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{t.total}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">{product.price.toLocaleString()} <span className="text-lg">so'm</span></span>
                    {product.oldPrice && <span className="text-lg text-slate-400 line-through font-bold">{product.oldPrice.toLocaleString()}</span>}
                  </div>
                </div>
              </div>

              {/* Installments */}
              <div className="bg-gradient-to-r from-indigo-600 to-violet-700 text-white p-6 rounded-[2rem] flex items-center justify-between mb-8 shadow-xl shadow-indigo-200 dark:shadow-none">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{t.installments}</p>
                    <p className="text-xl font-black">{installmentPrice.toLocaleString()} so'm / 12 {t.installmentMonths}</p>
                  </div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition">
                  <ArrowRight size={24} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => addToCart({ productId: product.id, quantity: 1, selectedColor, selectedSize })}
                  className="flex-1 h-16 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white font-black rounded-[2rem] flex items-center justify-center space-x-3 transition-all transform active:scale-95 shadow-xl"
                >
                  <ShoppingCart size={22} />
                  <span>{t.addToCart}</span>
                </button>
                <button 
                  className="flex-1 h-16 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-[2rem] flex items-center justify-center space-x-3 transition-all transform active:scale-95 shadow-xl shadow-emerald-500/20"
                  onClick={() => navigate('/checkout')}
                >
                  <span>{t.buy}</span>
                </button>
              </div>
            </div>

            {/* Service Pillars */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 flex items-center justify-center text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl"><Truck size={24} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Bepul yetkazish</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 flex items-center justify-center text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl"><ShieldCheck size={24} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rasmiy kafolat</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 flex items-center justify-center text-rose-600 bg-rose-50 dark:bg-rose-900/30 rounded-2xl"><RefreshCw size={24} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Oson qaytarish</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Tabs */}
      <div className="mt-32">
        <div className="flex space-x-12 border-b border-slate-100 dark:border-slate-800 mb-12 overflow-x-auto pb-px">
          {[
            { id: 'desc', label: t.description },
            { id: 'specs', label: t.characteristics },
            { id: 'reviews', label: `${t.reviews} (0)` }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-6 text-sm font-black uppercase tracking-[0.2em] border-b-4 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="min-h-[400px]">
          {activeTab === 'desc' && (
            <div className="prose dark:prose-invert max-w-4xl text-slate-600 dark:text-slate-400 text-lg leading-relaxed space-y-8 font-medium">
              <p>{product.description[language]}</p>
              <div className="grid md:grid-cols-2 gap-10 mt-12">
                 <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700">
                    <h5 className="text-slate-900 dark:text-white font-black mb-4">Yuqori Sifat</h5>
                    <p className="text-sm">Faqat eng sara materiallardan foydalanilgan va ko'p bosqichli tekshiruvdan o'tgan.</p>
                 </div>
                 <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700">
                    <h5 className="text-slate-900 dark:text-white font-black mb-4">Zamonaviy Dizayn</h5>
                    <p className="text-sm">Sizning individualligingizni ta'kidlab turuvchi ergonomik va minimalist ko'rinish.</p>
                 </div>
              </div>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="max-w-4xl grid gap-y-4">
              {Object.entries(product.specs || {}).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-6 border-b border-slate-50 dark:border-slate-800 group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-4 rounded-xl transition-colors">
                  <span className="text-base font-bold text-slate-500 uppercase tracking-widest">{key}</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">{val}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="max-w-4xl space-y-12">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">Mijozlarimiz fikri</h3>
                  <button className="flex items-center space-x-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-indigo-500 transition shadow-lg shadow-indigo-200">
                    <MessageSquare size={18} />
                    <span>Fikr qoldirish</span>
                  </button>
               </div>
               <p className="text-slate-500 italic">Hozircha fikrlar mavjud emas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
