# Website redesign — reference folder

Read in this order:
1. `SITE-DESIGN.md` — the spec. Build exactly this.
2. `REFERENCES.md` — Phase 1 research (Marketer.com style guide + other sites). Patterns to copy.
3. `app-reference/DESIGN.md` — the AdRender app design spec (tokens, components, sidebar).
4. `app-reference/src/**.txt` — real app source files, for copying the look into the site's app preview and components. Reference only: never import or compile them.
5. `app-reference/icons/` — AdRender Home icon (line/fill, dark/light).

This folder is documentation. It is not part of the build.

## Hydration check

Before merging site work, run `npm run build` then `npm run check:hydration`. The check is a dev tool and is not part of the build: it serves `dist/` and fails if any prerendered page throws a React hydration error.

## Proof screenshots

Proof screenshots are generated locally into `docs/redesign/proof/` and are not committed. After `npm run build`, run `npx playwright install chromium && node scripts/proof-screenshots.mjs`. The script and the Playwright dev dependency stay in the repo so the shots can be made again on a local machine.
