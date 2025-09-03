export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'digital-art' | 'poster' | 'illustration';
  tags: string[];
  dimensions: string;
  format: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Commission {
  type: 'poster' | 'digital-art' | 'illustration' | 'custom';
  description: string;
  budget: string;
  timeline: string;
  email: string;
  name: string;
}