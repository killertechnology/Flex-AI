export type Variant = {
  id: string;
  sku: string;
  options: Record<string, string>;
  price: number;
  inventoryQuantity: number;
};

export type Product = {
  id: string;
  sku: string;
  brand: string;
  title: string;
  slug: string;
  department: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  featuredImage: string;
  images: string[];
  altText: string;
  sizes?: string[];
  colors?: string[];
  ageClass?: string;
  playerClass?: string;
  handedness?: string[];
  flex?: string[];
  curve?: string[];
  length?: string[] | string;
  kickPoint?: string;
  fit?: string[] | string;
  width?: string[];
  skillLevel?: string;
  inventoryStatus: string;
  inventoryQuantity: number;
  featured: boolean;
  newArrival: boolean;
  sale: boolean;
  tags: string[];
  specifications: Record<string, string>;
  variants: Variant[];
  relatedProductIds: string[];
  isPrototype: boolean;
};

export type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type CartLine = CartItem & {
  product: Product;
  variant: Variant;
};
