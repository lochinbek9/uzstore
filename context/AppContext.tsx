
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, Language, Theme, CartItem, User, Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface AppContextType extends AppState {
  products: Product[];
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  setUser: (user: User | null) => void;
  setPromocode: (code: string | null) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('uz');
  const [theme, setTheme] = useState<Theme>('light');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [promocode, setPromocode] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === newItem.productId && i.selectedColor === newItem.selectedColor && i.selectedSize === newItem.selectedSize);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.productId !== id));
  const clearCart = () => setCart([]);
  
  const toggleFavorite = (id: string) => setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleCompare = (id: string) => setCompare(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const addProduct = (p: Product) => setProducts(prev => [...prev, p]);
  const updateProduct = (p: Product) => setProducts(prev => prev.map(item => item.id === p.id ? p : item));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      theme, setTheme: handleSetTheme,
      cart, addToCart, removeFromCart, clearCart,
      favorites, toggleFavorite,
      compare, toggleCompare,
      user, setUser,
      promocode, setPromocode,
      products, addProduct, updateProduct, deleteProduct
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
