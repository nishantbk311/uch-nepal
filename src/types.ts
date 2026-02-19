
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  additionalImages?: string[];
  description: string;
  colors: string[];
  sizes: string[];
  weight?: string;
  dimensions?: string;
}

export interface CartItem extends Product {
  cartId: string; // Unique ID for items in cart (same product different size/color)
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum View {
  Home = 'home',
  Products = 'products',
  ColorChart = 'color_chart',
  ProductDetail = 'product_detail',
  Story = 'story',
  Blog = 'blog',
  Auth = 'auth',
  Cart = 'cart',
  PrivacyPolicy = 'privacy_policy',
  ShippingReturns = 'shipping_returns'
}
