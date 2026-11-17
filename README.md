# Fate's Passage — Clean Performance Build

This build consolidates the current verified project files into one deployable root.

## Runtime pages
- `index.html` — same-origin launcher
- `studio-title.html` — opening title video
- `studio-title.mp4` — opening video asset
- `character-creation.html` — character creation
- `character-creation-ending.mp4` — character-creation ending cinematic
- `fates-passage.html` — main gameplay
- `character-sheet.html` — character sheet overlay/page
- `arkaedon-map.html` — Arkaedon map
- `melding-forge.html` — Triune Domain skill melding forge
- `404.html` — compatibility redirects for obsolete routes
- `sw.js` — versioned offline/cache layer
- `manifest.webmanifest` — PWA metadata

## Performance restructuring
- Removed redundant outer HTML document wrappers from the two largest pages.
- Removed the embedded duplicate map/character-sheet page payloads from the gameplay page.
- Gameplay now loads the canonical map and character sheet files in the same tab.
- Character-sheet state is transferred with `postMessage` instead of embedding another full HTML document.
- Removed the old Claude artifact/new-tab map route.
- Service worker uses network-first navigation and cache-first static resources, instead of forcing a no-cache network request for every same-origin resource.
- Obsolete duplicate HTML filenames are not deployed in the runtime root.

## Audit status
- Runtime filenames are normalized to the deployed names above; duplicate upload suffixes are not deployed.
- Map, character sheet, skill forge, and Spell Tome return to gameplay in the same tab.
- Character creation now provides an explicit Enter Fate’s Passage handoff after completion.
- Service worker cache version is bumped and includes the Spell Tome.
- The character-creation ending cinematic is optional in this package; Character Creation falls back cleanly if `character-creation-ending.mp4` is not present.

## Important
The current accessible Library did not contain the previously referenced `studio-title.html` or `spell-tome.html` byte-for-byte source files. They are therefore not fabricated or silently replaced in this build. The compatibility router preserves those paths where possible.


## Video extraction
The opening cinematic was separated from Character Creation into `studio-title.mp4` and the ending cinematic into `character-creation-ending.mp4`. Character Creation no longer carries either video as a base64 payload.
