---
description: Interactively add a new project card to the portfolio (public/projects/projects.json + thumbnail).
---

You are adding one new entry to `public/projects/projects.json`, the data source for the Projects page (`src/app/projects/page.tsx`, rendered via `ProjectCarousel`/`ProjectCard`). Follow this procedure.

## Schema and conventions (read `public/projects/projects.json` first for live examples)

Each entry: `{ title, description, link, img1, img2?, alt?, github?, category }` (see `src/app/_types/Project.tsx`).

- `category` must be **exactly** `"Web Development"` or `"Other"` (case-sensitive) — `page.tsx` filters on these two literal strings, so anything else silently never renders. Never invent a third category.
- `img1`/`img2` are bare filenames (e.g. `"silverlining.png"`) resolved against `public/` **root** — never `public/projects/`. That folder holds only `projects.json`.
- When there's no separate hover-swap image, existing entries reuse the same filename for both `img1` and `img2`.
- `link` and `github` default to `""` when not applicable (see the "Cellular Automaton" entry).
- `alt` is conventionally the literal string `"link"` in existing entries — use that unless the user wants something else.
- Filenames for new images should match the existing lower-kebab style (`kochivnyky.png`, `graph-algorithms-visualiser.png`), not a generic source name like `IMG_2031.png`.

## Steps

1. **Collect input.** If the user's invocation didn't already supply them, ask conversationally for: title, description, category, and a local file path to a thumbnail image. Also ask (optional) for a live link URL, a GitHub repo URL, and a second "hover" image path. Don't re-ask for anything already given.

2. **Guard.** If title, description, and thumbnail path are *all* missing, stop and ask again — there's nothing to generate from.

3. **Resolve the thumbnail — this is a hard requirement, never skip it:**
   - If a path was given, verify the file exists. If not, say so and ask again.
   - If no path was given at all, explicitly ask again for one. Do not proceed without a real image and do not substitute a placeholder — every existing card has a real screenshot/thumbnail.
   - Once you have a valid file, pick a destination filename in the existing lower-kebab convention, derived from the title if the source filename is generic.
   - If the user didn't give a separate second image, set `img2` equal to `img1`.

4. **Resolve category:**
   - If the user named one, normalize it to exactly `"Web Development"` or `"Other"`.
   - If omitted, infer a best guess from the description/repo, then confirm it with the user via AskUserQuestion before writing anything — a wrong guess means the card ends up in the wrong (or no) carousel.

5. **Resolve description/title when omitted:**
   - If a GitHub or live link is available, fetch it (WebFetch) to ground a 1–3 sentence description matching the tone/length of existing entries (concise, mentions tech stack/purpose — compare the "Silver Lining" or "Framebox-Backend" entries).
   - Without a link, generate from whatever fields *are* filled, and clearly flag anything generated as "generated — please review" in step 7.
   - If title is missing, derive a short one from the repo name or description subject.

6. **Fill remaining defaults:** `link: ""` and `github: ""` if not supplied; `alt: "link"`.

7. **Confirm before writing.** Show the user the full assembled JSON object, flagging any fields you generated rather than were given, and wait for their go-ahead.

8. **Apply changes** (only after confirmation):
   - Copy the source image file(s) into `public/` root under the destination filename(s) from step 3.
   - Append the new object into the array in `public/projects/projects.json`, matching its existing 4-space indent style. Keep valid JSON (no trailing comma).
   - Do not touch `public/artworks/artworks.json` or `public/utils/posts.json` — separate content types, out of scope. If the user mentions this project is also an artwork, note that cross-listing there is a separate manual step; don't do it automatically.

9. **Report and verify.** Summarize what was written/generated, then remind the user to run `npm run dev` and check `/projects` in the browser to confirm the new card renders in the right carousel with the thumbnail loading correctly.
