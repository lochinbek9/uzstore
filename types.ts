
export type Language = 'uz' | 'ru' | 'en';
export type Theme = 'light' | 'dark';

export interface Product {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  isAction?: boolean;
  isNew?: boolean;
  colors: string[];
  sizes: string[];
  specs: Record<string, string>;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AppState {
  language: Language;
  theme: Theme;
  cart: CartItem[];
  favorites: string[];
  compare: string[];
  user: User | null;
  promocode: string | null;
}
