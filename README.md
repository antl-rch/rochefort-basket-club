# Rochefort Basket Club

Site vitrine React 19, TypeScript strict et Vite. Intégration des écrans desktop/mobile de la [maquette Figma](https://www.figma.com/design/3jwDMXcaU10vfdV3m1O8vn/Rochefort-Basket-Club-%E2%80%94-Site-vitrine?node-id=19-1232).

## Démarrer

Node.js 22.12 minimum (Node 24 conseillé).

```sh
npm ci
npm run dev
```

Site local : http://127.0.0.1:5178. Routes locales : `/` et `/licence`.

Site publié : https://antl-rch.github.io/rochefort-basket-club/. La licence est accessible à `/#/licence` sous ce chemin.

```sh
npm run build
npm run preview
npm run lint
npm run format:check
npm test
```

Les tests locaux utilisent Google Chrome. La CI installe Chromium et vérifie le site sur des profils desktop et mobile.

## Architecture

Structure inspirée d’USV et Script : les layouts composent les écrans, les composants portent les éléments d’interface, les contextes exposent les données et les services isolent leur origine.

```text
src/
  API/services/          Adaptateur de données du club
  context/club/          Contexte et provider des équipes/créneaux
  context/licence/       État temporaire du dossier et de sa signature
  data/                 Données statiques typées
  hooks/                Accès contrôlé aux contextes
  i18n/locales/          Dictionnaires FR et EN
  utils/types/          Contrats de données et de repository
  utils/services/       Export local du dossier signé
  utils/styles/         Tokens et styles SCSS
  views/components/     Composants réutilisables et sections composées
  views/layouts/        Pages assemblées à partir des composants
public/images/          Images locales exactes de Figma
tests/browser/          Parcours Playwright
docs/design-source/    Aperçu et fichiers de conception antérieurs conservés
```

`ClubProvider` accepte un `ClubRepository`. Pour une API future, créer un adaptateur respectant ce contrat et le fournir au provider. Les composants continuent à consommer `useClub()`. Le chargement accepte un `AbortSignal` et ignore les réponses des requêtes annulées.

Les données métier (catégories et créneaux) sont séparées des textes traduits. Les identifiants restent stables dans les deux langues. i18next/react-i18next gèrent les traductions ; seule la préférence de langue est conservée dans le navigateur. Les polices Nunito et DM Sans sont hébergées localement. Les icônes proviennent de react-icons.

Les sélecteurs utilisent le composant générique `AppSelect`, fondé sur `react-select`. Leur hauteur et celle des champs partagent le token `--field-height` (45 px). Le sélecteur conserve la validation obligatoire du formulaire et la navigation clavier.

## Licence et signature

Le parcours contient des champs validés, une signature manuscrite via `signature_pad`, une alternative au clavier, un récapitulatif et un export HTML autonome imprimable. La signature est conservée lors des retours entre étapes. Les informations du dossier restent en mémoire jusqu’à la sortie de la page ; elles ne sont ni stockées dans le navigateur ni envoyées à un serveur.

Le site est statique : le dernier bouton télécharge le dossier et la confirmation précise qu’il n’a pas été transmis au club. Le raccordement à un service de dépôt remplacera cette exportation quand le backend sera disponible. Le dossier exporté comprend les champs et la signature ; son contenu texte est échappé.

## Contenus à compléter

- Les liens externes utilisent volontairement `href="#"` en attendant les adresses.
- Les créneaux sont ceux de la maquette et restent explicitement indiqués comme exemples.
- Adresse du gymnase, e-mail et téléphone à confirmer auprès du club.
- Aucun service de soumission de licence n’est encore configuré.

## Vérification

Les tests couvrent le chargement des 11 assets de conception (12 images avec le logo répété), les deux langues, la persistance de langue, les champs requis, le dessin et l’effacement de signature, les retours entre étapes, l’export réel du dossier et le responsive à 320, 390, 768, 1024 et 1440 pixels. Les captures générées sont dans `artifacts/` et restent locales.

## GitHub Pages

Chaque push sur `main` exécute le formatage, le lint, le build et les tests navigateur. Une fois ces contrôles réussis, le job `deploy` reconstruit le site avec `GITHUB_PAGES=true`, publie les fichiers de `dist/` sur la branche générée `gh-pages`, puis demande un build Pages. Cette méthode évite de dépendre du quota d’artefacts Actions pour la publication. Ne pas modifier manuellement `gh-pages`.

Le build Pages utilise `/rochefort-basket-club/` comme chemin de base et `HashRouter` pour que les rechargements et liens directs fonctionnent sans réécriture serveur. Les liens de sections défilent dans la page sans interférer avec les routes. Le développement conserve `BrowserRouter` et les URL usuelles.

Pour vérifier le build Pages localement :

```sh
GITHUB_PAGES=true npm run build
GITHUB_PAGES=true npm run preview
```

Pour un autre hébergement à la racine, `npm run build` conserve la base `/` ; configurer alors le fallback des routes vers `index.html`. `dist/` est la sortie statique du build.
