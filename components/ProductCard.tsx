
import React from 'react';
import { Heart, ShoppingCart, BarChart2, Star } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { Link } from 'react-router-dom';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { language, addToCart, toggleFavorite, favorites, toggleCompare, compare } = useApp();
  const t = TRANSLATIONS[language];
  const isFavorite = favorites.includes(product.id);
  const inCompare = compare.includes(product.id);

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null;

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 dark:bg-slate-900 m-2 rounded-[2rem]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name[language]} 
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" 
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-indigo-200 dark:shadow-none">{t.new}</span>}
          {discount && <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-rose-200 dark:shadow-none">-{discount}%</span>}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
           <button 
             onClick={() => addToCart({ productId: product.id, quantity: 1, selectedColor: product.colors[0], selectedSize: product.sizes[0] })}
             className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl hover:bg-indigo-600 hover:text-white transition-all transform active:scale-90"
           >
             <ShoppingCart size={20} />
           </button>
           <div className="flex flex-col gap-2">
             <button onClick={() => toggleFavorite(product.id)} className={`p-3 rounded-2xl shadow-xl backdrop-blur-md transition-all ${isFavorite ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-500 hover:text-rose-500'}`}>
               <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
             </button>
             <button onClick={() => toggleCompare(product.id)} className={`p-3 rounded-2xl shadow-xl backdrop-blur-md transition-all ${inCompare ? 'bg-blue-500 text-white' : 'bg-white/90 text-slate-500 hover:text-blue-500'}`}>
               <BarChart2 size={18} />
             </button>
           </div>
        </div>
      </div>

      <div className="p-6 pt-2 flex flex-col flex-1">
        <div className="flex items-center space-x-1 text-amber-400 mb-3">
          <Star size={14} fill="currentColor" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{product.rating}</span>
          <span className="text-xs text-slate-400 font-medium">({product.reviewsCount})</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight hover:text-indigo-600 transition line-clamp-2">
            {product.name[language]}
          </h3>
        </Link>

        <div className="mt-auto flex flex-col">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {product.price.toLocaleString()} <span className="text-sm font-bold text-indigo-600">so'm</span>
            </span>
          </div>
          {product.oldPrice && (
            <span className="text-sm text-slate-400 line-through font-medium">{product.oldPrice.toLocaleString()} so'm</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
