# Contrôle de cohérence structurelle du corpus élargi — 31 octobre 2026

Corpus analysé : `data/corpus-elargi-01-a-tester.json` sur la branche de développement.

- **268 formes distinctes**.
- **50 arbitrages historiques** retrouvés à l'identique, sans conflit.
- **80 entrées** dans le lot 01, dont 12 arbitrages explicites et 68 revues grammaticales internes.
- **Aucune étiquette de classe inconnue** au regard des catégories reconnues par le moteur.
- **Aucun arbitrage historique manquant**.
- `son` comporte désormais **déterminant possessif** et **nom**.

## Couverture des catégories principales
Les nombres ci-dessous comptent les formes acceptant la catégorie, et non des catégories exclusives : un même mot peut apparaître dans plusieurs lignes.

| Catégorie | Formes |
|---|---:|
| Nom | 83 |
| Adjectif | 62 |
| Verbe (infinitif uniquement) | 39 |
| Adverbe | 58 |
| Préposition | 21 |
| Conjonction de coordination | 7 |
| Conjonction de subordination | 7 |
| Interjection | 8 |
| Onomatopée | 7 |

Les déterminants et pronoms sont présents dans leurs sous-catégories. Les mots peuvent cumuler plusieurs natures acceptées.

## Limites
Ce contrôle établit la cohérence **structurelle**, pas l'exhaustivité des analyses lexicales. Une vérification grammaticale indépendante reste nécessaire pour les entrées non arbitrées. Aucun exemple explicatif n'est ajouté à ce stade, conformément à la décision de différer cette fonctionnalité.

## Publication
**Aucune modification de `main` ni du site public.**
