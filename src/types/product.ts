export interface ProductColor {
  colorId: number;
  colorName: string;
  hexCode: string;
}

export interface ProductSize {
  sizeId: number;
  sizeName: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  photoUrl: string;
  createdAt?: string;
  updatedAt?: string;
  sizes?: ProductSize[];
  colors?: ProductColor[];
  rating?: number;
}