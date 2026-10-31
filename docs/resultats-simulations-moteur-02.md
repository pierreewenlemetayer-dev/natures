# Simulation du moteur — deuxième passe (31 octobre 2026)

## Modifications préparatoires

Le script `scripts/test_moteur_corpus_01.js` contenait une chaîne JavaScript mal échappée autour de `split(':')`. La syntaxe a été réparée sur la branche de développement. Le script autonome corrigé **n'a pas été exécuté directement sous Node.js** lors de cette passe.

## Simulation réellement exécutée

Extraction de la fonction `build()` depuis le fichier `js/app.js` de la branche de développement ; exécution dans un environnement JavaScript isolé avec le corpus de `data/corpus-elargi-01-a-tester.json`.

- **3 000 parties simulées**, 10 questions chacune.
- **0 échec** détecté.
- **268 mots distincts vus sur 268**.
- **2 questions ciblant des noms** par partie.
- **Au moins 2 questions ciblant les classes fermées** par partie.
- **Jamais plus de 2 questions ciblant la même catégorie** par partie.
- **Aucun mot répété** dans une partie.
- **Chaque catégorie cible correspond à une réponse effectivement acceptée**.

### Répartition des catégories cibles sur 30 000 questions

| Catégorie | Occurrences |
|---|---:|
| Nom | 6000 |
| Adjectif | 2898 |
| Verbe | 2896 |
| Adverbe | 2901 |
| Préposition | 2934 |
| Coordination | 2927 |
| Subordination | 2938 |
| Déterminant | 2945 |
| Pronom | 2942 |
| Interjection | 299 |
| Onomatopée | 320 |

## Portée et limites

Ce résultat confirme la cohérence du **tirage des questions**, non le rendu graphique ni les interactions réelles dans un navigateur. La validation manuelle du jeu et de l'affichage de toutes les réponses acceptées reste à réaliser avant publication.

**Aucun changement sur `main` ni sur le site public.**
