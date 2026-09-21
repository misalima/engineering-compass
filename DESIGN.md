# Engineering Compass — Design

## Foundation

- Portfolio-derived colors configured in `src/styles/tokens.css`.
- IBM Plex Sans for headings, Geist for the interface, and Geist Mono for technical labels.
- Near-black background, layered neutral-teal surfaces, cool text, and restrained aqua accents.
- Containers use simple rounded corners and rely on surface contrast more than borders.

## Implementation

- Components are styled with Tailwind CSS v4 utilities.
- `globals.css` contains only global foundations, selection, focus, and reduced motion.
- The application imports no portfolio styles or code at runtime.
