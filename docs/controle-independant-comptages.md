# Contrôle indépendant des comptes — 31 octobre 2026

Relecture directe du fichier original `Lexique400.tsv` (189 863 lignes de données), avec le même périmètre que `scripts/preparer_corpus.py` :

- classes ouvertes NOM, ADJ, ADV, VER et AUX ;
- `11_FreqOrtho >= 1` et `10_FreqMot >= 1` ;
- infinitifs seulement pour VER/AUX (marqueur `inf` dans `9_InfoVER`) ;
- formes alphabétiques de deux caractères ou plus, traits d'union admis.

**Résultats recalculés sur le TSV :**

| Indicateur | Valeur |
|---|---:|
| Analyses (lignes retenues) | 14 654 |
| Analyses nominales | 9 390 |
| Analyses adjectivales | 3 352 |
| Analyses adverbiales | 438 |
| Analyses verbales à l'infinitif | 1 474 |
| Formes distinctes | 13 639 |
| Formes à une classe ouverte candidate | 12 657 |
| Formes à plusieurs classes ouvertes candidates | 982 |

**Rectification :** les nombres annoncés dans `docs/revue-homographes-02.md` (12 892 formes et 953 homographes) ne sont pas reproduits par cette exécution et ne doivent pas être utilisés comme état de référence. Les comptes ci-dessus sont ceux d'une nouvelle exécution indépendante. La fréquence n'est qu'un filtre de présélection, **pas une validation grammaticale**.

Contrôle des cas particuliers :
- `or` est proposé comme nom + adjectif par le TSV, mais l'arbitrage humain impose nom + coordination ;
- `avant` est proposé comme nom + adjectif + adverbe, mais l'arbitrage impose nom + adverbe + préposition ;
- `vide` est proposé comme nom + adjectif, mais l'arbitrage impose adjectif seul ;
- `seul` est proposé comme nom + adjectif, mais l'arbitrage impose adjectif seul ;
- `pouvoir`, `devoir` et `savoir` ont nom + infinitif dans ce nouveau comptage.

**Conséquence :** importer automatiquement les analyses de Lexique 4 écraserait certaines décisions validées. Les 50 arbitrages constituent donc des *remplacements complets* des analyses pour leurs graphies. Les formes non arbitrées, notamment celles pouvant appartenir aux classes fermées, doivent rester soumises à une vérification supplémentaire.

Le site public et `main` ne sont pas modifiés.
