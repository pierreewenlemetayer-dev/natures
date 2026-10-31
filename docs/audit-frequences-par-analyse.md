# Deuxième tri : fréquence de chaque analyse grammaticale

31 octobre 2026 — **travail hors production**.

L'extraction initiale utilisait `11_FreqOrtho >= 1` (fréquence globale de la forme). Elle pouvait retenir des analyses très rares de formes fréquentes : `le` nom, `sans` nom, `lorsque` adverbe.

Le nouveau filtre exige simultanément :
- `11_FreqOrtho >= 1` pour la forme ;
- `10_FreqMot >= 1` pour **chaque analyse** ;
- `5_Cgram` dans NOM, ADJ, ADV, VER, AUX ;
- `9_InfoVER` contenant `inf` pour les VER/AUX ;
- une forme alphabétique ou à trait d'union, sans chiffre.

Un audit local indépendant du fichier original a relevé :
- 189 863 lignes sources ;
- 4 272 analyses écartées par le filtre individuel de fréquence ;
- 14 653 lignes d'analyses retenues après filtres et quelques exclusions explicites ;
- 12 650 formes simples candidates à vérification ;
- 989 formes placées en revue spéciale (ambiguïtés et mots sensibles).

**Ces nombres sont des résultats d'audit, pas des validations grammaticales.**
Les analyses marginales peuvent subsister au-dessus du seuil ; les classes fermées doivent être fusionnées à partir des listes validées. Ne pas importer directement les candidats dans `js/data.js`.

Les fichiers d'audit locaux sont reproductibles depuis le TSV original ; le script de préparation dans le dépôt applique désormais lui aussi le filtre `FreqMot`.
