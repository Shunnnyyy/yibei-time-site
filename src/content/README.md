# Content Editing

Add or edit stories in `stories.json`.

Each story needs:

- `slug`: URL name, like `new-coffee-chat`
- `title`: Chinese and English title
- `date`: `YYYY-MM-DD`
- `city`: place label
- `status`: small status label
- `summary`: short preview text
- `image`: path from `public`, like `/images/story-online.jpg`
- `imageAlt`: image description
- `body`: story paragraphs

To connect a coffee icon to a story, use the same `slug` in `src/lib/content.ts` under `coffeeProfiles`.
