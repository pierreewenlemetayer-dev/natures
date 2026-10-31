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


## Réorientation validée : catégories fermées / ouvertes

Les listes de déterminants, pronoms, prépositions et conjonctions déjà décidées pour Natures sont la référence ; Lexique 4 n'a pas vocation à les reconstruire. Le fichier pilote `js/data.js` contient un ensemble de ces formes, mais **ne prouve pas à lui seul l'exhaustivité** des listes décidées. Avant toute publication, vérifier leur exhaustivité dans les décisions précédentes.

Pour Lexique 4, limiter l'extraction principale à `NOM`, `ADJ`, `ADV`, `VER` et `AUX` (infinitif seulement). Les interjections et onomatopées restent des listes contrôlées, enrichissables après examen individuel.

### Mesure reproductible de cette extraction ouverte

Calcul effectué sur `Lexique400.tsv`, seuil `11_FreqOrtho >= 1`, mots alphabétiques ou composés avec trait d'union, longueur >= 2, et verbes/auxiliaires à `9_InfoVER` commençant par `inf` :

| Catégorie candidate | Lignes retenues |
|---|---:|
| Noms | 11 733 |
| Adjectifs | 5 219 |
| Adverbes | 486 |
| Infinitifs | 1 169 |
| **Total lignes** | **18 607** |

**15 749 formes distinctes**, dont **2 804** possèdent au moins deux classes ouvertes candidates. Ces nombres diffèrent de l'inventaire initial parce que les classes fermées sont désormais exclues de l'extraction automatique.

### Avertissement essentiel sur les homographes

La fréquence orthographique s'applique à **tous les emplois de la forme**. Ainsi `sans` ressort artificiellement comme nom candidat dans l'extraction ouverte, `le` comme nom, `un` comme nom, alors que ces emplois ne doivent pas être acceptés automatiquement dans Natures. **Même les candidats mono-classe nécessitent donc une revue et des exclusions explicites.**

Aucune de ces extractions n'a été intégrée au jeu public.
