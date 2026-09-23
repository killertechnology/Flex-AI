import productsJson from '../../data/products.json';
import { assetUrl } from '../core/assets';
import type { Product } from './types';

export interface ProductRepository {
  getAllProducts(): Product[];
  getProductBySlug(slug: string): Product | undefined;
  getProductById(id: string): Product | undefined;
  getProductsByCollection(handle: string): Product[];
  searchProducts(query: string): Product[];
  getBrands(): string[];
}

const products = (productsJson as unknown as Product[]).map((product) => ({
  ...product,
  featuredImage: assetUrl(product.featuredImage),
  images: product.images.map(assetUrl)
}));

function normalize(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export class JsonProductRepository implements ProductRepository {
  getAllProducts() {
    return products;
  }

  getProductBySlug(slug: string) {
    return products.find((product) => product.slug === slug);
  }

  getProductById(id: string) {
    return products.find((product) => product.id === id);
  }

  getProductsByCollection(handle: string) {
    if (handle === 'sale') return products.filter((product) => product.sale);
    if (handle === 'deals') {
      return products.filter((product) =>
        product.newArrival || product.price < 50 || product.department === 'Services' || product.category === 'Sticks'
      );
    }
    if (handle === 'new-arrivals') return products.filter((product) => product.newArrival);
    if (handle === 'under-50') return products.filter((product) => product.price < 50);
    if (handle === 'under-75') return products.filter((product) => product.price < 75);
    if (handle === 'under-100') return products.filter((product) => product.price < 100);
    if (handle === 'value-sticks') return products.filter((product) => product.category === 'Sticks').sort((a, b) => a.price - b.price);
    if (handle === 'service-essentials') return products.filter((product) => product.department === 'Services');
    if (handle === 'brands') return products;
    return products.filter((product) =>
      [product.department, product.category, product.subcategory, ...product.tags].some((value) => normalize(value) === handle)
    );
  }

  searchProducts(query: string) {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    return products.filter((product) => {
      const haystack = [
        product.title,
        product.brand,
        product.sku,
        product.department,
        product.category,
        product.subcategory,
        product.shortDescription,
        product.description,
        ...product.tags,
        ...Object.values(product.specifications)
      ].join(' ').toLowerCase();
      return haystack.includes(needle);
    });
  }

  getBrands() {
    return Array.from(new Set(products.map((product) => product.brand))).sort();
  }
}

export const productRepository = new JsonProductRepository();
export { normalize };
