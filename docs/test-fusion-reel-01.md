# Test de fusion et audit Lexique 4 — 31 octobre 2026

## Fusion exécutée

À partir de `js/data.js` sur la branche de développement :
- 162 formes dans le pilote (sans doublons) ;
- 50 arbitrages humains appliqués en **remplacement complet** des analyses pour ces formes ;
- 3 formes du pilote effectivement corrigées : `bien`, `si`, `mal` ;
- 26 nouvelles formes ajoutées ;
- **188 formes dans le fichier intermédiaire** `data/corpus-pilote-arbitre-a-verifier.json`.

Ce fichier n'est pas le corpus jouable. Aucun fichier de production n'a été modifié.

## Contrôle réellement exécuté sur Lexique400.tsv

Script local indépendant appliquant les règles du filtre de préparation :

| Mesure | Résultat |
|---|---:|
| Lignes source | 189 863 |
| Analyses ouvertes passant les filtres | 14 654 |
| NOM | 9 390 |
| ADJ | 3 352 |
| ADV | 438 |
| VER | 1 472 |
| AUX | 2 |
| Formes distinctes candidates | 13 639 |
| Formes avec plusieurs classes ouvertes candidates | 982 |

Le comptage a été reproduit par exécution directe sur le fichier TSV original, et correspond au dernier audit.

## Tests ciblés

- `or` : Lexique 4 NOM + ADJ ; arbitrage NOM + coordination.
- `avant` : Lexique 4 NOM + ADJ + ADV ; arbitrage NOM + ADV + préposition.
- `vide` : Lexique 4 NOM + ADJ ; arbitrage ADJ uniquement.
- `seul` : Lexique 4 NOM + ADJ ; arbitrage ADJ uniquement.
- `pouvoir`, `devoir`, `savoir` : Lexique 4 NOM + VER ; arbitrage identique.
- `le`, `sans`, `mais`, `lorsque`, `donc` : aucune analyse de classe ouverte après filtrage ; conserver les décisions des classes fermées.

## Étape suivante

Le pilote n'est pas une liste fermée exhaustive. **Ne pas verser automatiquement les 13 639 formes dans le jeu** : des emplois grammaticaux secondaires peuvent manquer, même pour des formes avec une seule classe ouverte dans Lexique 4. Constituer un lot d'ajouts documenté et le tester sur la branche de développement avant publication.
