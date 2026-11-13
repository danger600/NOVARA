# NOVARA

**One platform. Infinite possibilities.**

NOVARA is a cross-platform digital workspace built with Expo SDK 54, React Native, TypeScript, Expo Router, and React Native Web.

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
- 12 workspace modules
- Searchable feature lists
- Add and complete tasks, notes, and goals
- Typed, versioned local collection storage with validation and legacy-data migration
- English, Kinyarwanda, and French UI translations for navigation, dashboard, discovery, workspace, feature screens, profile, and settings
- Device-language detection, manual language selection, and local preference persistence
- Expo web export configuration for Vercel

## Data and security boundaries
Task, note, goal, and language data are stored locally on the current device using AsyncStorage. AsyncStorage is **not encrypted**. Do not store passwords, authentication tokens, payment data, or other secrets in it. Browser/app data can be cleared by the user or operating system. Local storage is not cloud synchronization, a server database, or a backup. There is currently no production account system, remote database, multi-device sync, server-side authorization, real-time messaging, payment processing, or connected AI provider. The AI and collaboration modules remain previews.

## Localization status
English, Kinyarwanda, and French translations cover the primary app navigation, dashboard, discovery page, workspace, feature modules, profile, and settings. User-entered content remains in the language in which it was entered. Date, number, and currency formatting by region is a future step; translations should receive a native-speaker review before a public release.

## Validation
The GitHub Actions workflow checks Expo package compatibility, TypeScript, storage schema tests, and the web export on pushes and pull requests to `main`.

## Global launch checklist
- Native-speaker review of translations and accessibility testing
- Add secure authentication and account recovery
- Add backend APIs, database persistence, and encrypted transport
- Add cloud synchronization, conflict resolution, backups, and data export/deletion
- Add privacy policy, consent, retention rules, and security review
- Add integration, end-to-end, and device testing
- Add monitoring, crash reporting, and release automation
- Validate Android and iOS production builds and store requirements

## Product roadmap
The 900-capability catalog in [docs/FEATURE_CATALOG_900.md](docs/FEATURE_CATALOG_900.md) is a proposed roadmap, not a claim that 900 features are implemented.

## Deployment
Vercel project setup requires access to the user's Vercel team. Import the GitHub repository and use:
- Framework preset: Other
- Build command: `expo export -p web`
- Output directory: `dist`
- Install command: `npm install`
- Root directory: repository root

Repository: https://github.com/danger600/NOVARA
