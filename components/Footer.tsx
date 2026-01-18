
import React from 'react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { Facebook, Instagram, Send, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { language } = useApp();
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-black text-indigo-600">UzStore</Link>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
            O'zbekistondagi eng yirik elektronika do'koni. Biz sizga faqat sifatli va original mahsulotlarni taqdim etamiz.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-indigo-600 hover:text-white transition shadow-sm"><Instagram size={20} /></a>
            <a href="#" className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-indigo-600 hover:text-white transition shadow-sm"><Send size={20} /></a>
            <a href="#" className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-indigo-600 hover:text-white transition shadow-sm"><Facebook size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">{t.catalog}</h4>
          <ul className="space-y-4">
            <li><Link to="/catalog" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition text-sm font-medium">Smartfonlar</Link></li>
            <li><Link to="/catalog" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition text-sm font-medium">Noutbuklar</Link></li>
            <li><Link to="/catalog" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition text-sm font-medium">Audio texnika</Link></li>
            <li><Link to="/catalog" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition text-sm font-medium">Aksessuarlar</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Ma'lumotlar</h4>
          <ul className="space-y-4">
            <li><Link to="/terms" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition text-sm font-medium">{t.termsOfUse}</Link></li>
            <li><Link to="/offer" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition text-sm font-medium">{t.publicOffer}</Link></li>
            <li><Link to="/faq" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition text-sm font-medium">Savol va javoblar</Link></li>
            <li><Link to="/shipping" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition text-sm font-medium">Yetkazib berish</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Aloqa</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="text-indigo-600 shrink-0" size={18} />
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Toshkent sh., Yunusobod tumani, 4-mavze</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-indigo-600 shrink-0" size={18} />
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">+998 71 123 45 67</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-indigo-600 shrink-0" size={18} />
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">info@uzstore.uz</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-xs font-medium">© 2024 UzStore. Barcha huquqlar himoyalangan.</p>
        <div className="flex gap-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 opacity-50 grayscale hover:grayscale-0 transition" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6 opacity-50 grayscale hover:grayscale-0 transition" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Uzcard_logo.png" className="h-6 opacity-50 grayscale hover:grayscale-0 transition" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
