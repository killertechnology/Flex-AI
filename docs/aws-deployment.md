# AWS S3 and CloudFront Deployment

The prototype builds as static assets with Vite:

```bash
npm run build:all
```

Upload `dist/` to an S3 bucket configured for static hosting or private CloudFront origin access.

Required CloudFront behavior:

- Serve `index.html` for unknown routes so React Router paths work.
- Configure custom error responses for `403` and `404` to return `/index.html` with status `200`.
- Keep prototype builds private or protected until approved.
- Keep `noindex, nofollow` enabled until launch approval.

Do not overwrite existing AWS infrastructure without explicit authorization.
