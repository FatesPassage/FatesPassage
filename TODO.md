# TODO

## First — verify the current prototype
- [x] Verify the launch routing statically.
- [x] Verify character creation and selection statically.
- [x] Verify the gameplay handoff statically.
- [x] Verify same-tab map/character-sheet overlays statically.
- [x] Verify same-tab skill forge navigation from the character sheet.
- [x] Audit safe-area, touch targets, viewport, and iframe sizing statically.

## Next — stabilize the project
- [x] Implement the audit fixes found during source inspection.
- [x] Identify embedded assets and external font/Three.js dependencies.
- [ ] Move reusable assets into `assets/` only when their links can be updated and tested.
- [ ] Move game definitions into `data/` as JSON/CSV in small, tested steps.
- [ ] Create a backup before each structural change.

## Longer-term direction
- [ ] Confirm the first Godot milestone and build a tiny single-player 3D area.
- [ ] Keep gameplay rules separate from engine-specific presentation where practical.
- [ ] Plan multiplayer only after the single-player foundation works.
- [ ] Set up a GitHub repository after the owner is ready; never upload secrets or private information.

## Three Sun Gods — visual and lore QA
- [ ] Verify Dronnar is visibly the largest red sun on both the map and gameplay sky.
- [ ] Verify Oscrom is the medium golden sun and Melarmony the smallest pearly-white sun.
- [ ] Open the map options on iPhone and check the Three Sun Gods key fits without hiding controls.
- [ ] Review the Three Sun Gods references in quests, dialogue, shrines, and later story beats for consistency.
- [ ] Confirm the new lore does not alter the separate meteor and Ashfall chronology.
