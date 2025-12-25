# Frontend Mentor Note-Taking App (React Native Expo)

A mobile note-taking app inspired by the premium Frontend Mentor challenge.

## Features
- Note list (with search and tag filtering)
- Create, edit, archive, and restore notes
- Per-note tag management (add/remove tags as pills)
- Archive (soft-delete) notes
- Multiple themes (system light/dark, custom accent colors)
- AsyncStorage data persistence
- Expo Router navigation & clean multi-screen UI

## App Structure
```
/assets/images/         # Icons & graphic stubs
/app/                   # Screens (Expo Router)
/components/            # UI Components
/utils/                 # Helpers (Notes, Theme)
```

## Quick Start
1. Clone/download project
2. Run `npm install` or `yarn`
3. Add your icon images to `assets/images/` (see stubs)
4. Start app: `npx expo start`

## Project Screens
- **Home**: List/search/filter notes
- **Note Editor**: Add/edit note, manage tags, archive
- **Archive**: View and restore archived notes
- **Settings**: Theme preference (light/dark/accent)

---

This is a starter scaffold. UI, styles, and features can easily be extended. You own your data (stored on your device).

