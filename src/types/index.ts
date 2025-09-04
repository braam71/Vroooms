export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;
  image_url: string | null;
  currency: string;
  resolution: string | null;
  format: string | null;
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