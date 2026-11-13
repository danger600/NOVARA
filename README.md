# NOVARA

**One platform. Infinite possibilities.**

NOVARA is a cross-platform digital workspace built with Expo SDK 54, React Native 0.81, React 19, TypeScript, Expo Router 6, and React Native Web.

## Platforms
- Web
- Android
- iOS

## Run locally
```bash
npm install
npm run typecheck
npm test
npm run build:web
npm run web
```
Or use `npx expo start` and press `a`, `i`, or `w`. The iOS simulator requires macOS and Xcode.

## Current frontend capabilities
- Responsive navy, white, and champagne-gold interface
- Home, Discover, Tasks, Workspace, Profile, and Settings navigation
- Workspace modules for tasks, notes, goals, calendar, learning, business, AI preview, analytics, messages preview, notifications, and help
- Searchable feature lists
- Add and complete tasks, notes, and goals
- Local persistent storage using AsyncStorage on web, Android, and iOS
- Versioned storage envelope (schema version 2), strict record validation, and migration from the earlier unversioned collections
- Migration of the earlier saved language preference
- Loading, retry, and save-error states for local collections
- English, Kinyarwanda, and French translations across navigation, dashboard, discovery, workspace, profile, settings, and feature pages
- Device-language detection, English fallback, and a saved manual language choice
- GitHub Actions checks for dependency compatibility, storage tests, TypeScript, and web export

## Data and security boundaries
Collection data is stored locally on the current browser or device. It is not cloud synchronization or a backup; clearing browser/app data can remove it. AsyncStorage is unencrypted, so do not store passwords, payment details, or other secrets in these collections. There is currently no production account system, remote database, multi-device sync, server-side authorization, server backup, real-time messaging, payment processing, or connected AI provider. The AI and collaboration modules remain previews.

## Localization status
English, Kinyarwanda, and French are supported as the initial app languages. Core navigation, dashboard, discovery, workspace, profile, settings, and feature-page copy are translated. User-entered content remains in the language in which it was written. Date, number, and currency formatting by region and a professional translation review remain future work.

## Validation
The repository CI workflow runs:
- `npx expo install --check`
- `npm test`
- `npm run typecheck`
- `npm run build:web`

A green CI run is required before merging implementation changes. Passing a web export does not prove Android/iOS production builds or store readiness.

## Global launch checklist
- Complete translation review and accessibility testing with native speakers
- Add secure authentication and account recovery
- Add backend APIs, database persistence, and encrypted transport
- Add cloud synchronization, conflict resolution, backups, and data export/deletion
- Add privacy policy, consent, retention rules, and security review
- Add integration, end-to-end, and physical-device testing
- Add monitoring, crash reporting, and release automation
- Validate Android and iOS production builds and store requirements

## Product roadmap
The 900-capability catalog in [docs/FEATURE_CATALOG_900.md](docs/FEATURE_CATALOG_900.md) is a proposed roadmap, not a claim that 900 features are implemented.

## Deployment
For Vercel web deployment:
- Framework preset: Other
- Build command: `npx expo export -p web`
- Output directory: `dist`
- Install command: `npm install`
- Root directory: repository root

Repository: https://github.com/danger600/NOVARA
