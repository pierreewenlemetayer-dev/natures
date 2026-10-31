# Audit initial du corpus Lexique 4 — 31 octobre 2026

**État : travail préparatoire, non publié dans le jeu.**

Source : fichier original `Lexique400.tsv` fourni par l'utilisateur (189 863 lignes de données).

## Premier inventaire
- 162 117 lignes sous le seuil de fréquence orthographique de 1.
- 8 250 lignes de verbes ou auxiliaires sans infinitif explicite.
- 120 lignes avec forme non admissible au filtre orthographique (ou un seul caractère).
- 49 lignes de numéraux (classe `ADJ:num`).
- 19 327 lignes candidates retenues, correspondant à **16 231 formes distinctes**.
- 2 984 formes ont plusieurs codes de classe dans cet inventaire brut.

Ces valeurs sont celles d'un comptage indépendant sur le TSV original. Les classes candidates ne sont pas encore les réponses acceptées par Natures.

## Répartition des lignes candidates (non dédoublonnées)
NOM 11 733 ; ADJ 5 219 ; VER infinitif 1 494 ; ADV 486 ; PRE 49 ; CON 23 ; ONO 105 ; AUX infinitif 2 ; autres sous-types de déterminants et pronoms 216.

## Vigilances
1. La fréquence `11_FreqOrtho` est associée à la forme orthographique, non nécessairement à chaque acception : une forme fréquente peut posséder un emploi extrêmement rare. La présence d'un code grammatical ne suffit donc pas à rendre cet emploi acceptable.
2. Les `NOM` de Lexique 4 comprennent des nominalisations et des analyses contestables pour l'exercice ; les noms propres et nominalisations occasionnelles doivent être écartés.
3. Les codes `CON` ne séparent pas coordination et subordination.
4. Les codes `ART:def` et `ART:ind` ne suffisent pas à distinguer tous les articles contractés ou partitifs.
5. Les codes `ONO` doivent être examinés : `comment` apparaît par exemple parmi les candidats.
6. Les verbes ne doivent être retenus qu'à l'infinitif ; les participes adjectivaux restent acceptables si l'emploi adjectival est lexicalement attesté.
7. Conserver les décisions spécifiques : `donc` adverbe + coordination, `sauf` préposition + adjectif, `sans` préposition uniquement, `durant` préposition uniquement, etc.
8. Ne pas modifier `js/data.js` sur `main` avant revue et tests.

## Suite
- Construire un export d'audit regroupé par forme et par catégorie.
- Appliquer une table explicite de corrections et d'exclusions.
- Examiner prioritairement les formes multiclasse et les catégories fermées.
- Tester les tirages et toutes les réponses possibles avant publication.
