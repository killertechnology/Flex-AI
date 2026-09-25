# Shopify Migration

The current implementation uses `JsonProductRepository` in `src/commerce/ProductRepository.ts`.

Future production work should add `ShopifyProductRepository` with the same interface:

- `getAllProducts`
- `getProductBySlug`
- `getProductById`
- `getProductsByCollection`
- `searchProducts`
- `getBrands`

Migration sequence:

1. Create Shopify products, variants, collections, and metafields.
2. Map Shopify products to the normalized `Product` type.
3. Replace repository initialization with the Shopify implementation.
4. Replace prototype cart behavior with Shopify cart or checkout APIs.
5. Connect Shopify checkout instead of the current prototype checkout state.
6. Remove `noindex, nofollow` only after the public launch decision.

Do not hard-code Shopify objects directly in presentation components.
