# Résultats des simulations du moteur — 31 octobre 2026

## Méthode
- Lecture directe de `js/app.js` et de `data/corpus-elargi-01-a-tester.json` sur la branche `developpement-corpus-lexique4`.
- Extraction et exécution de la fonction `build()` réelle dans un environnement JavaScript isolé, avec le corpus de **268 formes**.
- **2 000 tirages indépendants**, soit 20 000 questions.
- Contrôles sur chaque tirage : exactement 10 questions ; aucune répétition de forme ; catégorie cible effectivement présente parmi les réponses acceptées ; maximum 2 questions par catégorie ; exactement 2 noms, dont un nom non ambigu.

## Résultat
**0 échec sur 2 000 parties.** Les 268 mots ont tous été tirés au moins une fois.

| Catégorie cible | Questions |
|---|---:|
| nom | 4 000 |
| adjectif | 1 940 |
| verbe | 1 952 |
| adverbe | 1 937 |
| préposition | 1 935 |
| coordination | 1 949 |
| subordination | 1 941 |
| déterminant | 1 947 |
| pronom | 1 953 |
| interjection | 207 |
| onomatopée | 239 |
| **Total** | **20 000** |

Les catégories rares apparaissent à une fréquence compatible avec la probabilité de tirage de 10 % par partie prévue dans le moteur.

## Limites importantes
Ce test valide **la fonction de tirage**, pas les interactions DOM (boutons, sous-catégories, score, corrections affichées), ni l'exhaustivité des analyses grammaticales du corpus. Le test JavaScript autonome enregistré dans `scripts/test_moteur_corpus_01.js` n'a pas été exécuté dans Node.js : l'exécution ci-dessus utilise une extraction directe de la fonction réelle dans un environnement JS isolé. Un test navigateur reste nécessaire.

Aucun changement apporté à `main`, `js/app.js`, `js/data.js` ou au site public.
