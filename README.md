# Static Hosting Demo App

Minimal SPA used to test [static-hosting-for-vibe-coders](https://github.com/AlexeyPopovUA/static-hosting-for-vibe-coders).

## URLs

| Environment | URL |
|-------------|-----|
| Production | `https://hosting-demo.demo.oleksiipopov.com` |
| Branch preview | `https://hosting-demo--{branch}.dev.demo.oleksiipopov.com` |

## Local build

```bash
mise install
pnpm install
pnpm build
```

Output goes to `dist/`. The build copies `public/` and duplicates `index.html` as `404.html` for SPA routing.

## Deploy

Pushes to `main` deploy production content. Pull requests deploy a branch preview and post the preview URL as a comment.

Requires the repository variable `AWS_AUTH_ROLE` and OIDC trust for this repo on the shared IAM role.
