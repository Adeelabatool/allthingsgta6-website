# ALLTHINGSGTA6 — Hostinger VPS Deployment Guide

This is a **TanStack Start** app (React 19 + Vite 7 + SSR). It needs a **Node.js runtime**, so you must use **Hostinger VPS** (KVM 1 or higher). Shared/premium hosting will NOT work — those only serve static HTML/PHP.

---

## 1) Buy & prepare the VPS

1. In Hostinger, buy **VPS → KVM 1** (or higher).
2. Choose the OS template **Ubuntu 22.04 with Node.js** (or plain Ubuntu 22.04 — we install Node below).
3. SSH into your server:
   ```bash
   ssh root@YOUR_VPS_IP
   ```

## 2) Install runtime dependencies

```bash
# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Nginx + Certbot (SSL) + PM2 (process manager)
apt-get install -y nginx certbot python3-certbot-nginx
npm install -g pm2

# (Optional) Bun — faster installs; you can also use npm
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"
```

## 3) Upload the project

Upload the entire project folder to `/var/www/allthingsgta6` (via SFTP, `scp`, or `git clone`).

```bash
mkdir -p /var/www/allthingsgta6
# then upload via SFTP, OR:
# scp -r ./allthingsgta6-hub/* root@YOUR_VPS_IP:/var/www/allthingsgta6/
cd /var/www/allthingsgta6
```

## 4) Install & build

```bash
bun install        # or: npm install
bun run build      # or: npm run build
```

The build outputs a standard **Node server** — `vite.config.ts` already includes `nitro: { preset: "node-server" }`, so no edits are needed.

You'll get `.output/server/index.mjs` — that is the SSR server entrypoint.

## 5) Start with PM2

```bash
cd /var/www/allthingsgta6
pm2 start deploy/ecosystem.config.js
pm2 save
pm2 startup   # follow the printed instruction so PM2 restarts on reboot
```

Check it's running:
```bash
curl http://127.0.0.1:3000
pm2 logs allthingsgta6
```

## 6) Nginx reverse proxy

Copy the included Nginx config:

```bash
cp deploy/nginx.conf /etc/nginx/sites-available/allthingsgta6
ln -s /etc/nginx/sites-available/allthingsgta6 /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

## 7) Point your domain (`allthingsgta6.com`) to the VPS

In Hostinger DNS (or your registrar):

| Type  | Name | Value          | TTL  |
|-------|------|----------------|------|
| A     | @    | YOUR_VPS_IP    | 3600 |
| A     | www  | YOUR_VPS_IP    | 3600 |

Wait 5–30 minutes for DNS propagation.

## 8) Enable HTTPS (free SSL via Let's Encrypt)

```bash
certbot --nginx -d allthingsgta6.com -d www.allthingsgta6.com
```

Follow prompts. Certbot updates the Nginx config to redirect HTTP → HTTPS automatically. Auto-renewal is already scheduled (`systemctl status certbot.timer`).

## 9) Deploying updates later

```bash
cd /var/www/allthingsgta6
git pull                # or upload new files
bun install
bun run build
pm2 restart allthingsgta6
```

---

## Environment variables

If you add any (e.g. API keys), create `/var/www/allthingsgta6/.env` and edit `ecosystem.config.js` to load it, or pass inline:

```bash
pm2 restart allthingsgta6 --update-env
```

Never prefix secrets with `VITE_` — those ship to the browser.

## Troubleshooting

- **502 Bad Gateway** → PM2 process not running. `pm2 logs allthingsgta6`.
- **Port 3000 in use** → change `PORT` in step 5 and in `nginx.conf` (`proxy_pass`).
- **Blank page** → build didn't complete. Re-run `bun run build`.
- **Wrong Node output** → confirm step 4 (`nitro.preset: "node-server"`).

---

Site: **allthingsgta6.com** — GTA 6 news, wiki, analysis, tools.
