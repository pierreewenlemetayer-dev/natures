# Premier lot d'élargissement — contrôle préalable

Date : 31 octobre 2026.

Le fichier `data/lot-lexique4-01-a-verifier.json` contient **80 nouvelles formes**, à raison de 20 noms, 20 adjectifs, 20 adverbes et 20 infinitifs. Elles sont absentes des 188 formes de `data/corpus-pilote-arbitre-a-verifier.json`.

## Méthode de présélection

Lecture directe de `Lexique400.tsv` :
- `10_FreqMot >= 1` et `11_FreqOrtho >= 1` pour l'analyse retenue ;
- catégorie grammaticale unique parmi **toutes les lignes de la graphie dans le TSV**, et non uniquement parmi les lignes ayant passé le filtre de fréquence ;
- formes alphabétiques simples de quatre caractères ou plus ;
- pour les verbes, infinitifs uniquement ;
- sélection manuelle de mots courants, sans graphies manifestement problématiques.

## Limites

Une catégorie unique dans Lexique 4 ne prouve pas que la forme soit grammaticalement univoque. Le corpus est hors contexte et devra accepter toutes les classes justifiées. La présélection n'est donc **pas une certification grammaticale**, et le lot reste explicitement `à vérifier`.

Ne pas fusionner automatiquement avec `js/data.js`, ne pas modifier `main` et ne pas publier le site avant validation.
