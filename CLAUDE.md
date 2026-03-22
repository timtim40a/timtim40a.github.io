# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Vite with HMR)
npm run build    # TypeScript compile + production build
npm run lint     # ESLint
npm run preview  # Preview production build locally
```

No test runner is configured.

## Architecture

Personal portfolio site for Tymur Soroka. React 19 + TypeScript + Vite SPA with React Router for client-side routing and Redux Toolkit for state.

**Routing** (`src/Router.tsx`): Four routes — `/`, `/projects`, `/blog`, `/blog/:slug`. Header and Footer render on all pages.

**Blog system**: Posts are `.md` files in `public/blogs/` named `{YYYY-MM-DD}-{slug}.md`. Metadata (slug, title, date, summary, tags) lives in `public/utils/posts.json`. `BlogIndex` fetches the JSON, sorts by date, and links to posts. `BlogPost` reads the slug from URL params, looks up the filename, and fetches the markdown, rendering it with `react-markdown`.

**Projects**: Hardcoded in `src/pages/Projects.tsx` — no external data source.

**Redux store** (`src/store/store.ts`): Has `counterSlice` and `userSlice` as examples but neither is actively used by any page. Exports typed `useAppDispatch` / `useAppSelector` hooks.

## Conventions

**Styling**: Each component has a co-located `.css` file. Global CSS custom properties in `src/index.css`:
- Colors: `--colour-primary` (#df7126 orange), `--colour-secondary` (#d9a066), dark background (#242034)
- Fonts: `--font-primary` (Fira Code), `--font-secondary` (Press Start 2P)

**Adding a blog post**: Add the `.md` file to `public/blogs/` following the `{YYYY-MM-DD}-{slug}.md` naming convention, then add its metadata entry to `public/utils/posts.json`.

**Code style**: 4-space indentation, double quotes, trailing commas (ES5), semicolons — enforced by `.prettierrc.json`. Strict TypeScript with no unused vars/params.
