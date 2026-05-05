# Deployment Guide

## Prerequisites

- Node.js 16+ and npm installed locally
- GitHub repository (already set up at https://github.com/hectorsum/barbershop)
- Vercel account (free tier works)

## Local Development

```bash
# Install dependencies
npm install

# Run dev server (hot reload enabled)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The dev server will start at `http://localhost:5173` by default.

## Deploying to Vercel

### Option 1: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally (one-time)
npm install -g vercel

# Deploy from project root
vercel

# For production deployment
vercel --prod
```

### Option 2: Using Vercel Dashboard (Easiest)

1. Go to https://vercel.com
2. Sign in or create a free account
3. Click "Add New" → "Project"
4. Select "Import Git Repository"
5. Connect your GitHub account and select the `barbershop` repo
6. Click "Deploy"

**Vercel auto-detects the Vite setup** via `vercel.json` and will:
- Run `npm run build` 
- Deploy the `dist/` folder as static assets
- Give you a live URL instantly

### Option 3: Git Push Deployment

After connecting your repo to Vercel via the dashboard:
- Push to `main` branch
- Vercel automatically rebuilds and deploys
- Deployments are instant (~30 seconds)

## Environment Variables

If you need environment variables later:

1. Create a `.env.local` file locally (for dev):
   ```
   VITE_API_URL=https://api.example.com
   ```

2. In Vercel dashboard:
   - Project Settings → Environment Variables
   - Add the same variables for Production, Preview, Development environments

3. Reference in code:
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

## Build Output

- **Development**: Unoptimized, source maps included, live reload
- **Production**: Minified, optimized, code-split, gzipped (~68KB)
  - React + app code: ~68KB gzipped
  - CSS: ~2.3KB gzipped

## Post-Deployment

After going live:

1. **Test the site**: Open your Vercel deployment URL in browser
2. **Check lighthouse**: Use PageSpeed Insights or Lighthouse extension
3. **Monitor**: Vercel dashboard shows analytics and logs
4. **Custom domain**: Settings → Domains to add your own domain

## Troubleshooting

**Build fails with "Cannot find module":**
- Run `npm install` locally and push `package-lock.json` to GitHub

**Images not loading:**
- Images in `/public` are served at root (e.g., `/fernando-barber.png`)
- Images in `/src` need to be imported as modules

**Styles not loading:**
- CSS is bundled by Vite; check that imports are correct
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

**Need to rollback:**
- Vercel keeps deployment history
- Dashboard → Deployments → select previous version → "Promote to Production"

## Next Steps

After deployment:
- Add analytics (Vercel Analytics or Google Analytics)
- Set up custom domain (vercel.com/domains)
- Configure redirects (if needed) in `vercel.json`
- Monitor performance via Vercel dashboard
