# AGENTS.md

Guidance for AI coding agents working in this repo.

## Overview

A client-side Hacker News clone. It reads the public [HN Firebase API](https://github.com/HackerNews/API) directly from the browser. There is no backend and no SSR. It is deployed on Netlify (`public/_redirects` is the SPA fallback) and ships a Dockerfile that runs `vp preview`.

- Vue 3 (`<script setup lang="ts">`), vue-router 5, Pinia 4 (setup-style store)
- Tailwind CSS 4 (via `@tailwindcss/vite`, CSS-first config in `src/assets/main.css`), `@vueuse/core` (`useFetch`), `@vueuse/head`, `moment`
- [Vite+](https://viteplus.dev) (`vite-plus`, project-local `vp` CLI) for dev server, build, lint (Oxlint), format (Oxfmt), and tests (Vitest). Vite itself is aliased to `@voidzero-dev/vite-plus-core`.
- TypeScript 6 with `vue-tsc` 3 for type-checking `.vue` files

## Setup and commands

Node 24 is required (see `.nvmrc`). Run `nvm use` (or `volta`/`fnm`) first. The global `vp` CLI is optional. Every command below works through `npm run`, which resolves the project-local `vp`.

```bash
npm ci                # install exactly what package-lock.json pins
npm run dev           # vp dev: dev server at http://localhost:5173
npm run check         # vp check (format + lint + type-aware check) then vue-tsc: the main command
npm run fmt           # vp fmt: format everything in place (Oxfmt)
npm run fmt:check     # vp fmt --check: fail if anything is unformatted (used by CI)
npm run lint          # vp lint .: Oxlint only
npm run lint:fix      # vp lint . --fix
npm run type-check    # vue-tsc for src/ and for vite.config.ts (understands .vue templates)
npm test              # vp test: run all tests once (Vitest)
npm run test:watch    # vp test watch
npm run build-only    # vp build -> dist/
npm run build         # type-check + build-only
npm run preview       # vp preview: serve dist/ at :4173
```

Baseline on Node 24: `check`, `test`, and `build` all pass. `check` reports one intentional `no-console` warning for `console.error` in `src/stores/news.ts`. Keep it at zero errors.

## Testing

- Tests run with `vp test` (Vitest 5, bundled in `vite-plus`). Do not install `vitest` separately. Import test APIs from `vite-plus/test`.
- Put tests next to the code as `*.test.ts` (for example `src/utils/time.test.ts`, `src/stores/news.test.ts`, `src/components/NewsItems.test.ts`, `src/components/CommentCounts.test.ts`).
- Component tests use `@vue/test-utils` and the `happy-dom` environment, enabled per file with a `// @vitest-environment happy-dom` first line. Pure logic and store tests stay in the default Node environment.
- Mock the network by mocking `useFetch` from `@vueuse/core` (`vi.hoisted` + `vi.mock('@vueuse/core', ...)`). It resolves to `{ data: ref(JSON string) }` because the HN endpoint is called with `?print=pretty`. Never hit the real HN API in tests.
- Item components use top-level `await`, so mount them inside `<Suspense>` (see `NewsItems.test.ts`) and `await flushPromises()`.
- Tests assert real behavior, so when you change behavior, change its test in the same edit. Cover the "missing field" case: the HN API omits `kids`, `url`, `text` and similar fields entirely when they are empty, so `undefined` is a normal value, not an edge case.

## Vite+ toolchain

- `vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script. Prefer the `npm run` scripts above, or `vp check`, `vp fmt`, `vp lint`, `vp test`, `vp build`.
- All tool config lives in [vite.config.ts](vite.config.ts): the `fmt` block (Oxfmt), the `lint` block (Oxlint), and the `plugins` list. Add a `test` block there for Vitest settings. Do not add `.eslintrc`, `eslint.config.*`, `.prettierrc`, `.oxlintrc.json`, `vitest.config.*`, `postcss.config.*`, or `tailwind.config.*`.
- Import config helpers from `vite-plus`, not `vite`. In tests, import from `vite-plus/test`.
- Run `vp toolchain` to see bundled tool versions. Docs are online at https://viteplus.dev/guide/ and locally at `node_modules/vite-plus/docs`.
- If `vp` or the runtime looks broken, run `vp env doctor` (needs the global CLI).
- Upgrade Vite+ with `vp migrate` (see https://viteplus.dev/guide/upgrade). The `vite` entry in `package.json` and its `overrides` must always point at the same `@voidzero-dev/vite-plus-core` version as `vite-plus`.
- **Do not remove the `overrides.vite` entry.** It makes every package that depends on `vite` (`@vitejs/plugin-vue`, `@tailwindcss/vite`, `vitest`, `vue-router`) use Vite+'s core instead of installing real Vite. Without it, `npm install` either fails with `ERESOLVE` (when only the `vite` devDependency alias is kept) or installs two copies of Vite. With two copies, `vue-tsc` crashes on `vite.config.ts` ("Debug Failure") because the plugin types come from a different Vite than `defineConfig`. The `devDependencies.vite` alias is not strictly required, but it declares the package that `env.d.ts` (`vite/client`) imports, so keep it too.
- **Keep `vue-tsc`.** `vp check` type-checks with the native TypeScript compiler (tsgo), which cannot read `.vue` files. Verified on this repo: `vp check` caught a type error in a `.ts` file but missed a bad assignment in a `.vue` script, an unknown method call in a template, an undefined name in a template, and a wrong prop type. `vue-tsc` caught all of them. Most of this app lives in `.vue` files, so removing `vue-tsc` would drop type safety for almost all of it. Revisit if Vite+ adds Vue template type-checking.

## Project layout

```
src/
  main.ts            app bootstrap (Pinia, router, @vueuse/head)
  App.vue            shell: navbar, <RouterView>, footer, <head> meta, triggers fetchAllNews()
  router/index.ts    all routes, lazy-loaded views
  stores/news.ts     Pinia store `useNewStore`: ID lists for top/new/best/ask/show/jobs
  views/             route-level pages (TheNews, NewsDetails, UserPage, NotFount)
  components/        item cards (NewsItems, AskItem, ShowItem, JobItem), CommentsCom,
                     User, loaders (*Loader.vue), icons/
  types/             API response interfaces (News, Ask, Show, Jobs, Comment, User)
  utils/time.ts      `timeDifferene()` relative-time helper
  utils/comments.ts  `formatCommentCount()`: "0 Comments" / "1 Comment" / "N Comments". Use it for every comment label, never inline the plural logic
public/              static assets, `_redirects` (Netlify SPA fallback)
```

## How data flows

1. `App.vue` calls `newsStore.fetchAllNews()` on mount. The store fetches only the **ID lists** for each category.
2. `views/TheNews.vue` picks a list from the `:type` route param, paginates it client-side (20 per page), and renders one item component per ID.
3. Each item component (`NewsItems`, `AskItem`, `ShowItem`, `JobItem`, `CommentsCom`) fetches its **own item** with a top-level `await useFetch(...)` and is wrapped in `<Suspense>` with `NewsLoader` as the fallback.
4. `views/NewsDetails.vue` renders the item, then comment IDs (`kids`) are rendered recursively via `CommentsCom`.

Routes: `/`, `/:type` (top|new|best|show|ask|jobs), `/news/:newsid`, `/show/:newsid`, `/ask/:newsid`, `/user/:userid`, and a catch-all not-found.

## Conventions

Follow the surrounding code. `npm run fmt` and `npm run check` enforce formatting and most rules.

- Format is Oxfmt (Prettier-compatible) with no semicolons and single quotes, configured in `vite.config.ts`. Do not hand-format. Run `npm run fmt`. `no-console` is a warning, so use `console.error` only for real error handling.
- Use `<script setup lang="ts">`, with `defineProps` via an `interface Props` plus `withDefaults`.
- Import with the `@/` alias (maps to `src/`), and use `import type` for types.
- API response shapes go in `src/types/`. Do not use `any`.
- Style with Tailwind utility classes. Scoped `<style>` blocks exist only for tiny layout bits. Do not add a CSS framework.
- Components are `.vue` files in PascalCase. Views are lazy-loaded in the router and heavy children via `defineAsyncComponent`.
- The HN item endpoint is called with `?print=pretty`, which returns a string that is then `JSON.parse`d. Follow this pattern in existing code. If you change it, change all call sites together.

## CI

[.github/workflows/ci.yml](.github/workflows/ci.yml) runs on every pull request and on pushes to `main`. Format, lint, type check, test, and build are separate jobs that run in parallel, and a final `CI` job fails if any of them fails (use it as the single required check). Each job runs one npm script: `fmt:check`, `lint`, `type-check`, `test`, `build-only`.

- Node comes from `.nvmrc`, so bumping that file bumps CI too.
- If you add or rename one of those scripts, update the workflow in the same change.
- A new independent check should be its own job and be added to the `needs` list of the `CI` job.
- Before pushing, `npm run check`, `npm test`, and `npm run build-only` reproduce the same checks locally. Add `npm run fmt:check` to confirm formatting.

## Skills

Project skills live in `.agents/skills/` (symlinked into `.claude/skills/`) and are pinned in `skills-lock.json`. Load them for the matching work:

- `vue-best-practices`: any Vue or `.vue` change
- `vue-router-best-practices`: `src/router/` and anything using `useRoute`/`useRouter`
- `vue-pinia-best-practices`: `src/stores/`

Restore them with `npx skills experimental_install`, and update them with `npx skills update`.

## Things to know before editing

- **Intentional typos in names.** `NotFount.vue`, `useNewStore`, `timeDifferene`, `commnetData`, `public/robot.txt`. Do not rename them as a drive-by. Rename only when asked, and update every reference.
- **`@unhead/vue` vs `@vueuse/head`.** `main.ts` installs `@vueuse/head`'s `createHead()`, while `App.vue` imports `useHead` from `@unhead/vue`. `@unhead/vue` is a transitive dependency and not listed in `package.json`. Do not change this without testing that the `<head>` meta still works.
- **`v-html` on API content** in `User.vue`, `CommentsCom.vue`, and `NewsDetails.vue`. HN returns HTML, but it is untrusted. Never add new `v-html` usages without sanitising. Flag any you find.
- **TypeScript is held at 6.x.** `vue-tsc` 3 does not work with TypeScript 7 (the native compiler), so do not bump `typescript` to 7 until `vue-tsc` supports it. `@types/node` follows the Node 24 runtime, not the latest major.
- **Tailwind 4 has no `tailwind.config.js` or PostCSS config.** Theme and plugins go in CSS (`src/assets/main.css`) with `@theme` and `@plugin`.
- **Interrupted page loads log Vue "Unhandled error during execution of setup function" warnings.** Item components `JSON.parse` the fetch result without handling an aborted request. This is a known pre-existing weakness, not a regression.
- **`/:type` accepts any string.** Unknown types render an empty list (`EmptyNews`) and not the 404 page.
- Install-script warnings from `npm ci` (for example `fsevents`) are expected and harmless. Build and dev work without extra steps.

## Definition of done

Before finishing a change:

1. `npm run check` has no errors (the one `no-console` warning is expected). It includes `vue-tsc`.
2. `npm test` passes. Add or update tests for any logic you change.
3. `npm run build-only` succeeds.
4. For UI changes, run `npm run dev` and check the affected route in a browser, including the loading state and an empty or error state.
5. Do not commit `dist/`, `node_modules/`, or `.env*` files. Do not add dependencies without a clear reason.
