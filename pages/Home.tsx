
import React from 'react';
import { TRANSLATIONS } from '../constants';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { language, products } = useApp();
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[650px] rounded-[3rem] overflow-hidden mt-8 shadow-2xl shadow-indigo-100 dark:shadow-none">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072" className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        
        <div className="relative h-full flex flex-col justify-center p-8 md:p-24 max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-8 self-start">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span>Yangi Kolleksiya 2024</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.1]">
            Kelajak texnologiyasi <br />
            <span className="text-indigo-400">bugun siz bilan.</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-xl leading-relaxed font-medium">
            Eng so'nggi gadjetlar va premium aksessuarlar to'plami. Sifat va kafolat bizning ustuvorligimizdir.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/catalog" className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-3 group">
              <span>{t.catalog}</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/offers" className="bg-white/10 backdrop-blur-xl border border-white/30 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center">
              Aksiyalarni ko'rish
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-indigo-600 font-black uppercase tracking-widest text-xs mb-3 block">Top Mahsulotlar</span>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">Siz uchun tanlangan</h2>
          </div>
          <Link to="/catalog" className="text-indigo-600 flex items-center text-sm font-bold hover:gap-3 transition-all">
            Barchasini ko'rish <ChevronRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Benefits Card */}
      <section className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 blur-[120px] rounded-full"></div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white max-w-3xl mx-auto leading-tight">
          Nega aynan bizdan <br /> xarid qilishadi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <div className="space-y-4">
             <div className="text-indigo-400 text-5xl font-black">24h</div>
             <h4 className="text-white font-bold text-xl">Tezkor yetkazib berish</h4>
             <p className="text-slate-400 text-sm leading-relaxed">Toshkent bo'ylab 3 soat ichida, viloyatlarga 24 soat ichida.</p>
          </div>
          <div className="space-y-4">
             <div className="text-emerald-400 text-5xl font-black">100%</div>
             <h4 className="text-white font-bold text-xl">Original mahsulot</h4>
             <p className="text-slate-400 text-sm leading-relaxed">Faqat rasmiy kafolatga ega brend mahsulotlari.</p>
          </div>
          <div className="space-y-4">
             <div className="text-rose-400 text-5xl font-black">12m</div>
             <h4 className="text-white font-bold text-xl">Muddatli to'lov</h4>
             <p className="text-slate-400 text-sm leading-relaxed">Hech qanday boshlang'ich to'lovsiz 12 oygacha bo'lib to'lash.</p>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
             <span className="text-emerald-600 font-black uppercase tracking-widest text-xs mb-3 block">Yangiliklar</span>
             <h2 className="text-4xl font-black text-slate-900 dark:text-white">Yangi kelgan gadjetlar</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => p.isNew).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
