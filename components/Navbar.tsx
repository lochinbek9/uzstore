
import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Sun, Moon, Layers, BarChart2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { language, setLanguage, theme, setTheme, cart, favorites, compare, user } = useApp();
  const t = TRANSLATIONS[language];
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Catalog */}
          <div className="flex items-center space-x-10">
            <Link to="/" className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
              UzStore
            </Link>
            <Link to="/catalog" className="hidden lg:flex items-center space-x-2 bg-slate-900 dark:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-semibold hover:bg-slate-800 dark:hover:bg-indigo-500 transition shadow-lg shadow-slate-200 dark:shadow-none">
              <Layers size={18} />
              <span>{t.catalog}</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-12">
            <div className="relative w-full group">
              <input 
                type="text" 
                placeholder={t.search} 
                className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/30 focus:bg-white dark:focus:bg-slate-900 rounded-2xl text-sm transition-all outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* Lang Switch */}
            <div className="hidden sm:block">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-sm font-bold focus:outline-none cursor-pointer p-1 text-slate-600 dark:text-slate-300"
              >
                <option value="uz">UZ</option>
                <option value="ru">RU</option>
                <option value="en">EN</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors">
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
            </button>

            <div className="flex items-center space-x-1 border-l border-slate-200 dark:border-slate-800 pl-4 md:pl-6">
              {/* Compare */}
              <Link to="/compare" className="relative p-2.5 text-slate-500 hover:text-indigo-600 transition">
                <BarChart2 size={22} />
                {compare.length > 0 && <span className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black animate-pulse">{compare.length}</span>}
              </Link>

              {/* Favorites */}
              <Link to="/favorites" className="relative p-2.5 text-slate-500 hover:text-rose-500 transition">
                <Heart size={22} />
                {favorites.length > 0 && <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black animate-pulse">{favorites.length}</span>}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2.5 text-slate-500 hover:text-indigo-600 transition">
                <ShoppingCart size={22} />
                {cartCount > 0 && <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black animate-pulse">{cartCount}</span>}
              </Link>
            </div>

            {/* User */}
            <button 
              onClick={() => user?.role === 'admin' ? navigate('/admin') : navigate('/profile')} 
              className="flex items-center space-x-2 p-1.5 pl-3 pr-3 rounded-2xl bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 hover:border-indigo-300 transition-all"
            >
              <User size={20} className="text-indigo-600" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 hidden sm:inline">{user ? user.name : t.login}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
