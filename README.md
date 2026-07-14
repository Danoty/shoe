# Stride Kenya Premium Website

## Preview locally
Open `index.html` in a browser. For the installable PWA and service worker, use a local web server such as VS Code Live Server.

## Publish with GitHub Pages
1. Create a new public GitHub repository, for example `stride-kenya`.
2. Upload `index.html`, `manifest.webmanifest`, `service-worker.js`, and this README to the repository root.
3. Commit the files to the `main` branch.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select **main** and **/(root)**, then save.
7. Wait briefly for GitHub to provide the public address.

## Important customisation
- Replace `Stride Kenya`, contact details, testimonials, product names, prices, and policies with your real business information.
- The product photographs are loaded from Unsplash. Replace them with your own photographs before commercial launch for consistent branding and dependable image availability.
- Connect the contact and newsletter forms to Formspree, Basin, Netlify Forms, or your backend.
- GitHub Pages is static and cannot securely process payments itself. Use a hosted payment checkout or a secure backend/serverless function for M-Pesa, Pesapal, Flutterwave, Stripe, or PayPal. Never put private API keys in the website code.

## Included features
Responsive design, mobile navigation, dark mode, product search, category filtering, sorting, wishlist, persistent cart, quantity controls, Kenyan pricing, contact form, newsletter form, PWA manifest, basic offline shell, SEO metadata, accessibility support, reduced-motion support, and GitHub Pages compatibility.
