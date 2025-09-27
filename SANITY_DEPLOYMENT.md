# Sanity Studio Deployment Guide

## Option 1: Deploy to admin.xpathpro.vercel.app (Recommended)

### Steps:
1. **Create new Vercel project for Studio:**
   ```bash
   cd studio
   vercel --prod
   ```

2. **Configure custom domain:**
   - Go to Vercel Dashboard → Studio Project → Settings → Domains
   - Add domain: `admin.xpathpro.vercel.app`

3. **Set environment variables in Vercel:**
   ```
   SANITY_STUDIO_PROJECT_ID=6q840ft7
   ```

4. **Update CORS origins in Sanity:**
   - Go to https://www.sanity.io/manage/project/6q840ft7
   - Settings → API → CORS Origins
   - Add: `https://admin.xpathpro.vercel.app`

## Option 2: Use Sanity's Built-in Hosting

### Steps:
1. **Deploy to Sanity Cloud:**
   ```bash
   cd studio
   npm run deploy
   ```

2. **Choose studio hostname:**
   - Use: `xpathpro` (will be available at xpathpro.sanity.studio)

## Current Configuration:
- **Project ID:** 6q840ft7
- **Dataset:** production
- **Local Dev:** http://localhost:3333
- **Manage Project:** https://www.sanity.io/manage/project/6q840ft7

## Environment Variables Needed:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=6q840ft7
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token-here
```

## Next Steps:
1. Choose deployment option
2. Update CORS settings
3. Test studio access
4. Create sample content