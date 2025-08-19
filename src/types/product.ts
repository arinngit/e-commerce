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

export interface ProductVariant {
  id: number;
  productId: number;
  sizeId: number;
  sizeName: string;
  colorId: number;
  colorName: string;
  colorHex: string;
  quantity: number;
  sku: string;
}

export interface Rating {
  id: number;
  userId: number;
  productId: number;
  value: number;
  comment?: string;
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  photoUrl: string;
  createdAt: string;
  updatedAt: string;

  variants?: ProductVariant[];
  averageRating?: number;
  ratings?: Rating[];

  colors?: ProductColor[];
  sizes?: ProductSize[];
}