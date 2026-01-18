
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const { theme, user, setUser } = useApp();

  // Initial user setup for Demo purposes (Admin)
  useEffect(() => {
    setUser({ id: '1', name: 'Admin User', phone: '+998901234567', email: 'admin@uzstore.uz', role: 'admin' });
  }, []);

  return (
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Router>
        <ScrollToTop />
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/favorites" element={<Home />} /> {/* Demo placeholder */}
            <Route path="/compare" element={<Home />} />   {/* Demo placeholder */}
            <Route path="/terms" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold mb-4">Foydalanish shartlari</h1><p className="text-slate-500">Tez kunda...</p></div>} />
            <Route path="/offer" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold mb-4">Ommaviy oferta</h1><p className="text-slate-500">Tez kunda...</p></div>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
