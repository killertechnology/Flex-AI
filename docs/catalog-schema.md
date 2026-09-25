# Catalog Schema

`data/products.json` is the canonical catalog for all three themes.

Required fields include:

- `id`, `sku`, `brand`, `title`, `slug`
- `department`, `category`, `subcategory`
- `shortDescription`, `description`
- `price`, `compareAtPrice`, `currency`
- `featuredImage`, `images`, `altText`
- `inventoryStatus`, `inventoryQuantity`
- `featured`, `newArrival`, `sale`
- `tags`, `specifications`, `variants`, `relatedProductIds`
- `isPrototype`

Optional merchandising fields include:

- `sizes`, `colors`
- `ageClass`, `playerClass`
- `handedness`, `flex`, `curve`, `length`, `kickPoint`
- `fit`, `width`, `skillLevel`

Variants use a Shopify-friendly structure:

```json
{
  "id": "variant-id",
  "sku": "SKU",
  "options": {
    "Size": "8",
    "Fit": "Standard",
    "Width": "D"
  },
  "price": 649.99,
  "inventoryQuantity": 4
}
```

All product images must be local paths under `/images/products/`.

For private proof-of-concept use, official or distributor product images can be refreshed with `npm run download:product-images`. The script stores local WebP copies and adds `Image source` and `Image source URL` fields under `specifications`.
