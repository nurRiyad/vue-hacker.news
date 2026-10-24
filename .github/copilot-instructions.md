# Copilot instructions

The full project guide is in [AGENTS.md](../AGENTS.md). Read it first. The essentials:

- Vue 3 + TypeScript (`<script setup lang="ts">`), Pinia, vue-router, Tailwind 4, VueUse. Client-side only, backed by the public Hacker News Firebase API.
- Use Node 24 (`.nvmrc`). Install with `npm ci`.
- The toolchain is Vite+ (`vp`). All config lives in `vite.config.ts`. There is no ESLint, Prettier, or PostCSS config.
- Validate with `npm run check` (includes `vue-tsc`, which is required for `.vue` type safety), `npm test`, and `npm run build-only`. All three must pass.
- Tests are `*.test.ts` files next to the code, run by `vp test`. Import from `vite-plus/test` and mock `useFetch` from `@vueuse/core`. See the Testing section in `AGENTS.md`.
- Format with `npm run fmt` (Oxfmt: no semicolons, single quotes). Use the `@/` alias for `src/`.
- Style with Tailwind classes only. Type API responses in `src/types/`. No `any`.
- Do not rename the typo'd identifiers (`NotFount`, `useNewStore`, `timeDifferene`, `robot.txt`), upgrade the build toolchain, or add `v-html` on unsanitised content unless asked.
