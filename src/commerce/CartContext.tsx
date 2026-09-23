import { createContext, useContext, useMemo, useState } from 'react';
import { analytics } from '../core/analytics';
import { productRepository } from './ProductRepository';
import type { CartItem, CartLine } from './types';

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  savings: number;
  addItem(productId: string, variantId: string, quantity?: number): void;
  updateQuantity(productId: string, variantId: string, quantity: number): void;
  removeItem(productId: string, variantId: string): void;
  clearCart(): void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = 'penguin-prototype-cart';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(storageKey, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  const lines = useMemo(
    () =>
      items.flatMap((item) => {
        const product = productRepository.getProductById(item.productId);
        const variant = product?.variants.find((candidate) => candidate.id === item.variantId);
        return product && variant ? [{ ...item, product, variant }] : [];
      }),
    [items]
  );

  const subtotal = lines.reduce((total, line) => total + line.variant.price * line.quantity, 0);
  const savings = lines.reduce((total, line) => {
    const compareAt = line.product.compareAtPrice ?? line.variant.price;
    return total + Math.max(compareAt - line.variant.price, 0) * line.quantity;
  }, 0);
  const count = items.reduce((total, item) => total + item.quantity, 0);

  function commit(next: CartItem[]) {
    setItems(next);
    saveCart(next);
  }

  function addItem(productId: string, variantId: string, quantity = 1) {
    const existing = items.find((item) => item.productId === productId && item.variantId === variantId);
    const next = existing
      ? items.map((item) => (item === existing ? { ...item, quantity: item.quantity + quantity } : item))
      : [...items, { productId, variantId, quantity }];
    commit(next);
    analytics.track('add_to_cart', { productId, variantId, quantity });
  }

  function updateQuantity(productId: string, variantId: string, quantity: number) {
    const next = quantity <= 0
      ? items.filter((item) => item.productId !== productId || item.variantId !== variantId)
      : items.map((item) => (item.productId === productId && item.variantId === variantId ? { ...item, quantity } : item));
    commit(next);
  }

  function removeItem(productId: string, variantId: string) {
    commit(items.filter((item) => item.productId !== productId || item.variantId !== variantId));
    analytics.track('remove_from_cart', { productId, variantId });
  }

  function clearCart() {
    commit([]);
  }

  return (
    <CartContext.Provider value={{ items, lines, count, subtotal, savings, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider');
  return value;
}
