# Loot Food - Project Context

## Project Overview
**Name:** Loot Food - Gamified Food Delivery  
**Type:** React SPA (Vite + TypeScript)  
**Domain:** Gamified food ordering with roulette mechanics  
**Language:** FR/EN multi-language support

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18.x |
| Build | Vite 6.4.x |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Routing | State-based (no react-router) |

---

## Critical Implementation Rules

### 1. Styling Conventions
- Use Tailwind CSS classes, NO inline styles except for dynamic values
- Dark mode: Use `isDarkMode` prop pattern for conditional classes
- Custom colors: `loot-red` (#D32F2F), defined in tailwind config
- Animations: Define in `index.css` with `@keyframes`, use `animate-*` classes

### 2. Component Patterns
```typescript
// Standard component signature
interface Props {
  t?: Record<string, string>;     // Translations
  isDarkMode?: boolean;           // Theme
  onAction?: () => void;          // Callbacks
}

const Component: React.FC<Props> = ({ t, isDarkMode = false }) => {
  // Implementation
};
```

### 3. Translation System
- All user-facing text via `t?.key` pattern
- Fallback: `t?.key || "Default French Text"`
- Add new keys to both FR and EN in `translations.ts`

### 4. State Management
- Local state with `useState` hooks
- View state in App.tsx: `currentView`, `selectedBox`, etc.
- No external state management (Redux, Zustand, etc.)

### 5. Lazy Loading
- Secondary views use `React.lazy()` + `Suspense`
- Primary components imported directly

---

## File Structure

```
/
├── App.tsx                 # Main entry, routing, global state
├── main.tsx               # React DOM render
├── index.css              # Global styles, Tailwind, animations
├── translations.ts        # FR/EN translation strings
├── components/
│   ├── Header.tsx         # Global navigation
│   ├── Hero.tsx           # Homepage hero section
│   ├── FeaturedBoxes.tsx  # Roulette cards display
│   ├── WheelView.tsx      # Spin wheel game
│   ├── ProfileView.tsx    # User profile
│   ├── ...                # 28 total components
└── _bmad/                 # BMAD Method files
```

---

## Known Patterns & Gotchas

### ⚠️ Common Issues
1. **Props drilling**: `t` and `isDarkMode` must be passed through component tree
2. **No type safety on translations**: `t?.key` can be undefined
3. **Large App.tsx**: Contains all routing logic (~250 lines)
4. **No error boundaries**: Components can crash entire app

### ✅ Best Practices Already In Place
- Glassmorphism effects with `backdrop-blur`
- Smooth animations with cubic-bezier
- Responsive design with `md:` breakpoints
- Dark mode support throughout
- Lazy loading for secondary views

---

## Performance Considerations

- Images: External URLs (Unsplash), no local optimization
- Bundle: Single SPA, no code splitting beyond lazy routes
- Animations: Hardware-accelerated with `transform`
- No service worker or PWA features

---

## Development Commands

```bash
npm run dev      # Start dev server (port 5173 or 3001)
npm run build    # Production build
npm run preview  # Preview production build
```
