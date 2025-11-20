# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start Expo development server
npm start

# Platform-specific development
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web browser

# Code quality
npm run lint       # Run ESLint

# Reset to blank project state
npm run reset-project
```

## Tech Stack

- **Framework**: Expo ~54.0.25 with React Native 0.81.5
- **Routing**: Expo Router (file-based routing in `app/` directory)
- **Language**: TypeScript with strict mode
- **UI**: React Native with Reanimated for animations, Gesture Handler for touch
- **Navigation**: React Navigation with Stack navigator

## Architecture

**File-Based Routing**: Routes are defined by the file structure in `app/`:
- `app/_layout.tsx` - Root Stack navigator layout
- `app/index.tsx` - Home screen (maps to `/`)
- Add new routes by creating files in `app/` (e.g., `app/pokemon/[id].tsx`)

**Import Aliases**: Use `@/*` to import from project root (configured in tsconfig.json)

**Experimental Features Enabled**:
- React Compiler
- Typed Routes
- New Architecture (Fabric)

## Code Conventions

- Strict TypeScript - all code must be properly typed
- ESLint configured with Expo standards
- VS Code set up for organize imports on save
