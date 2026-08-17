---
"isa4js": patch
---

- test.yml: added a Type-check step (pnpm exec tsc --noEmit) before tests, concurrency group, timeout-minutes: 10, SHA-pinned pnpm/action-setup.
- reuse.yml: added concurrency group, timeout-minutes: 5, SHA-pinned fsfe/reuse-action.
- release.yml: aligned Node version to 24 (was 22, now matches the other workflows), timeout-minutes: 10, SHA-pinned pnpm/action-setup and changesets/action.
- deploy-docs.yml: removed the now-unused BUILD_PATH env var (was set but never referenced), timeout-minutes on both jobs, SHA-pinned pnpm/action-setup. Left the install/build steps untouched since you've confirmed the deploy actually works.
