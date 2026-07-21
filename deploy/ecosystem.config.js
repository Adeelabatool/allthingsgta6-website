// PM2 process file for ALLTHINGSGTA6 (TanStack Start SSR)
// Usage: pm2 start ecosystem.config.js && pm2 save
module.exports = {
  apps: [
    {
      name: "allthingsgta6",
      // TanStack Start builds a Node server into .output/server/index.mjs
      // when built with the node preset. See README-DEPLOY.md.
      script: ".output/server/index.mjs",
      cwd: __dirname + "/..",
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOST: "127.0.0.1",
      },
      max_memory_restart: "512M",
      autorestart: true,
      watch: false,
    },
  ],
};
