# Première revue grammaticale ciblée — corpus Natures

Date : 31 octobre 2026. **Branche de développement uniquement ; aucun changement au jeu public.**

## Principe
Lexique 4 sert à **proposer** des classes ouvertes, non à fixer les réponses. Les listes déjà établies des classes fermées restent prioritaires. Une fréquence orthographique >= 1 ne démontre pas que chaque emploi grammatical est fréquent ni pertinent hors contexte.

## Cas contrôlés sur le TSV original

| Forme | Classes ouvertes proposées par Lexique 4 | Décision pour Natures |
|---|---|---|
| sans | NOM | Refuser NOM ; garder préposition de notre liste |
| le | NOM | Refuser NOM ; garder article défini et pronom personnel |
| un | NOM | Refuser NOM ; garder article indéfini |
| mais | ADV | Refuser ADV ; conserver coordination + nom déjà validés |
| lorsque | ADV | Refuser ADV ; conserver subordination |
| avant | NOM, ADJ, ADV | Conserver NOM (rugby) + ADV ; refuser ADJ ; conserver préposition |
| sauf | ADJ | Conserver ADJ + préposition |
| courant | NOM, ADJ | Conserver NOM + ADJ |
| rouge | NOM, ADJ | Conserver NOM + ADJ |
| français | NOM, ADJ | Conserver NOM + ADJ |
| pouvoir | NOM | Conserver NOM + VER infinitif, déjà validés |
| devoir | NOM | Conserver NOM + VER infinitif, déjà validés |
| pour | NOM | Conserver NOM + préposition, déjà validés |
| contre | NOM | Conserver NOM + préposition + adverbe, déjà validés |
| or | NOM, ADJ | Conserver NOM + coordination ; **ADJ à examiner**, ne pas importer automatiquement |

**Attention :** l'inventaire des verbes du TSV est séparé des entrées nominales ci-dessus ; l'absence de VER dans un tableau de classes ouvertes n'invalide pas les infinitifs déjà vérifiés. Certaines lignes du dictionnaire sont manquantes ou différemment codées.

## Règles de publication
1. Ne jamais remplacer les analyses validées des mots présents dans le corpus pilote par les seules étiquettes de Lexique 4.
2. Pour les nouvelles formes, exclure les analyses marginales et les emplois nominalisés occasionnels ; conserver seulement les emplois indépendamment attestés.
3. Mettre les formes multiclasse non contrôlées en quarantaine.
4. Écarter les formes dont une réponse acceptable ne peut pas être garantie.
5. Garder les interjections et onomatopées dans les listes contrôlées.
6. Tester les quotas de tirage avant publication.

La revue ci-dessus est **un premier lot ciblé**, pas un audit exhaustif des 15 749 formes.
