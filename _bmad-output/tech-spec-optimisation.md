# Loot Food - Optimisation Tech Spec (BMAD Quick Spec)

## 📊 Résumé de l'Analyse

| Métrique | Valeur | Statut |
|----------|--------|--------|
| Composants | 28 | ✅ Modularisé |
| Taille App.tsx | 252 lignes | ⚠️ À refactorer |
| Taille bundle | ~500KB estimé | ⚠️ Optimisable |
| Lazy loading | Partiel | ⚠️ À étendre |
| Type safety | Faible | 🔴 Critical |
| Error handling | Absent | 🔴 Critical |

---

## 🎯 Optimisations Prioritaires

### Epic 1: Architecture & Performance

#### Story 1.1: Optimisation du Bundle (Quick Win)
**Priorité:** Haute | **Effort:** 2h

**Changements:**
- [ ] Lazy load tous les composants secondaires (Footer, Rewards, HowItWorks)
- [ ] Ajouter React.memo() sur les composants statiques
- [ ] Implémenter useMemo/useCallback pour les fonctions coûteuses

```typescript
// Avant
import Footer from './components/Footer';

// Après
const Footer = lazy(() => import('./components/Footer'));
```

---

#### Story 1.2: Error Boundaries (Critical)
**Priorité:** Haute | **Effort:** 1h

**Créer:** `components/ErrorBoundary.tsx`

```typescript
class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
```

---

#### Story 1.3: Optimisation Images (Performance)
**Priorité:** Moyenne | **Effort:** 3h

**Changements:**
- [ ] Créer composant `OptimizedImage` avec lazy loading
- [ ] Ajouter attributs `loading="lazy"` et `decoding="async"`
- [ ] Implémenter placeholder blur pendant le chargement

---

### Epic 2: Type Safety & Code Quality

#### Story 2.1: Types Stricts pour Translations
**Priorité:** Haute | **Effort:** 2h

**Créer:** `types/translations.ts`

```typescript
export interface TranslationKeys {
  welcome: string;
  playBtn: string;
  spinBtn: string;
  // ... toutes les clés
}

export type Language = 'fr' | 'en' | 'es' | 'de' | 'ja';
export type Translations = Record<Language, TranslationKeys>;
```

---

#### Story 2.2: Refactoring App.tsx
**Priorité:** Moyenne | **Effort:** 3h

**Créer:**
- `hooks/useViewState.ts` - État de navigation
- `hooks/useTranslations.ts` - Gestion des langues
- `contexts/AppContext.tsx` - Context provider

**Résultat:** App.tsx réduit de 252 → ~80 lignes

---

### Epic 3: UX & Accessibilité

#### Story 3.1: Améliorer la Navigation Clavier
**Priorité:** Moyenne | **Effort:** 2h

- [ ] Ajouter `tabIndex` sur les éléments interactifs
- [ ] Implémenter la navigation par flèches dans les roulettes
- [ ] Ajouter `aria-labels` sur les boutons

---

#### Story 3.2: Loading States Premium
**Priorité:** Basse | **Effort:** 1h

**Créer:** Skeletons animés pour :
- Cartes de roulette
- Wheel view
- Profil utilisateur

---

### Epic 4: PWA & Offline

#### Story 4.1: Service Worker Basique
**Priorité:** Basse | **Effort:** 4h

- [ ] Installer vite-plugin-pwa
- [ ] Configurer cache des assets
- [ ] Ajouter manifest.json

---

## 📋 Sprint Planning Suggéré

### Sprint 1 (1-2 jours) - Quick Wins
1. ✅ Story 1.2: Error Boundaries
2. ✅ Story 1.1: Lazy Loading étendu
3. ✅ Story 2.1: Types stricts

### Sprint 2 (2-3 jours) - Refactoring
4. Story 2.2: Refactoring App.tsx
5. Story 1.3: Images optimisées
6. Story 3.1: Accessibilité

### Sprint 3 (Optionnel) - PWA
7. Story 4.1: Service Worker
8. Story 3.2: Loading states

---

## 🔧 Commandes BMAD à Exécuter

```bash
# Pour chaque story, utiliser le cycle BMAD:
/create-story   # Préparer la story
/dev-story      # Implémenter
/code-review    # Valider la qualité
```

---

## 📈 Métriques de Succès

| Métrique | Avant | Après (Cible) |
|----------|-------|---------------|
| Lighthouse Performance | ~75 | 90+ |
| Bundle Size | ~500KB | <350KB |
| First Contentful Paint | ~2s | <1s |
| Type Coverage | ~20% | 80%+ |
| Error Recovery | 0% | 100% |
