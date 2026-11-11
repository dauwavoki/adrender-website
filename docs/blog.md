# Blog and changelog

Feature posts show up on the blog, the changelog, the sitemap, the RSS feed, and `llms.txt` on the next build.

## Add a feature post

1. Add `src/content/blog/<slug>.md` with `title`, `slug`, `description` (this becomes the Changelog line), `publishedDate`, `tags: New feature`, and `coverScene`.
2. Run `npm run blog:cover -- <slug>`, then set `coverImage` to `/blog/covers/<slug>.png`.
3. Commit. Blog, Changelog, sitemap, RSS and `llms.txt` update on the next build.

The cover script is manual. It is not part of the Vercel build.

`coverScene` is an existing code-drawn scene from the features and about pages. Use the component name or the section id:

| coverScene | Page section |
| --- | --- |
| `ShopifyScene` or `shopify` | Shopify sync |
| `TemplatesScene` or `templates` | Proven templates |
| `EasyScene` or `easy-to-use` | Easy to use |
| `BrandScene` or `brands` | Brand intelligence |
| `BatchScene` or `generation` | Batch rendering |
| `SizesScene` or `sizes` | Every size |
| `LibraryScene` or `library` | Template library |
| `PlaygroundScene` or `playground` | Ad playground |
| `WorkspacesScene` or `workspaces` | Team workspaces |

`tags` is one comma-separated line. Only posts tagged `New feature` are listed on `/changelog`. `coverImage` is optional; when it is set, that PNG is the post's link preview. Other posts keep the logo.

Example:

```md
---
title: "What shipped"
slug: what-shipped
description: "One line that appears on the changelog."
publishedDate: 2026-11-11
tags: New feature
coverScene: ShopifyScene
coverImage: /blog/covers/what-shipped.png
---
```
