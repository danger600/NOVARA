# NOVARA

**One platform. Infinite possibilities.**

NOVARA is a cross-platform digital workspace built with Expo, React Native, TypeScript, Expo Router, and React Native Web.

## Platforms
- Web
- Android
- iOS

## Run locally
```bash
npm install
npm run typecheck
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
- Local persistence for feature collections using AsyncStorage (browser storage on web and native storage on mobile)
- Language selection for English, Kinyarwanda, and French
- Device-language detection with English fallback
- Language preference saved locally
- Expo web export configuration for Vercel

## Data and security boundaries
Local storage is device-specific and is not cloud synchronization or a backup. Clearing browser/app data can remove locally saved content. There is currently no production account system, remote database, multi-device sync, secure server authorization, real-time messaging, payment processing, or connected AI provider. The AI and collaboration modules remain previews.

## Localization status
English, Kinyarwanda, and French are available as initial language choices. Navigation labels and shared feature-screen controls are translated; some module-specific content still needs complete translation review. Date, number, and currency formatting by region is a future step.

## Global launch checklist
- Complete translation coverage and accessibility testing
- Add secure authentication and account recovery
- Add backend APIs, database persistence, and encrypted transport
- Add cloud synchronization, conflict resolution, backups, and data export/deletion
- Add privacy policy, consent, retention rules, and security review
- Add unit, integration, end-to-end, and device testing
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
