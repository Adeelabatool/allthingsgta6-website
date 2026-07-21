# Host ALLTHINGSGTA6 for FREE on Cloudflare Workers

No VPS needed. No credit card needed. This project is pre-configured for
Cloudflare — just build and deploy.

---

## Option A — No coding tools, all in the browser (recommended)

1. Create a free account at https://github.com and a free account at
   https://dash.cloudflare.com
2. On GitHub: create a new repository (e.g. "allthingsgta6"), then use
   "uploading an existing file" to drag ALL the project files/folders in
   (everything in this archive). Commit.
3. On Cloudflare dashboard: Workers & Pages → Create → Workers →
   "Import a repository" → connect GitHub → pick your repository.
4. In the build settings enter:
   - Build command:   npm install && npm run build
   - Deploy command:  npx wrangler deploy
5. Click Deploy. In ~3 minutes your site is live at:
   https://allthingsgta6.<your-account>.workers.dev
6. Every time you upload changed files to GitHub, the site redeploys
   automatically.

## Option B — From a computer with Node.js installed

```bash
npm install
npm run build
npx wrangler deploy    # first run opens a browser to log in to Cloudflare
```

## Custom domain (optional, later)

Workers dashboard → your worker → Settings → Domains & Routes →
Add custom domain. Requires the domain to be on Cloudflare DNS (free).
Until then the free *.workers.dev address works fine.

## Free plan limits

100,000 requests/day — far more than a new site needs. If the site ever
outgrows it, the paid plan is $5/month, still cheaper than a VPS.
