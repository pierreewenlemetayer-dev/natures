# Contrôle simulé des interactions — 31 octobre 2026

## Périmètre
Exécution du code réel de `js/app.js` avec les 268 entrées de `data/corpus-elargi-01-a-tester.json`, dans un environnement JavaScript muni de substituts simples pour `document`, les boutons et les éléments de page.

## Résultat
- 200 parties complètes simulées.
- 2 000 questions parcourues.
- 332 choix de sous-catégories (conjonction, déterminant ou pronom).
- Alternance de réponses correctes et incorrectes.
- Vérification des transitions entre questions, de l'existence des retours de correction et de l'arrivée à l'écran final.
- **Aucune erreur détectée** dans les assertions appliquées.

## Limites
Ce test est un **test d'interactions DOM simulées**, et non un essai dans Chrome, Firefox ou Safari. Il ne garantit pas la qualité de la mise en page, les interactions tactiles, l'accessibilité réelle, ni l'exactitude grammaticale de chaque entrée. Le score final et le contenu détaillé de chaque correction n'ont pas été comparés exhaustivement à un oracle indépendant. Le corpus de test n'est pas publié.

Le fichier `tests/preview-corpus-elargi.html` reste un artefact de développement ; il n'est pas déployé sur le site public.

## À faire
1. Vérification lexicographique indépendante des 68 entrées du lot 01.
2. Tests navigateur et contrôle des libellés et sous-catégories.
3. Publication uniquement après autorisation explicite.
