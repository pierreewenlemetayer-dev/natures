# Revue des homographes — contrôle reproductible

31 octobre 2026. **Aucune publication sur le site.**

Une nouvelle lecture directe du TSV original avec les deux seuils `10_FreqMot >= 1` et `11_FreqOrtho >= 1`, uniquement sur NOM, ADJ, ADV, VER et AUX (ces deux derniers à l'infinitif), donne :

- 12 892 formes distinctes ;
- 953 formes avec au moins deux classes ouvertes candidates ;
- 9 416 lignes NOM, 3 352 ADJ, 439 ADV, 669 VER infinitif, 1 AUX infinitif.

Les chiffres du précédent audit (12 650 formes simples, 989 formes particulières) ne sont **pas reproduits** par ce comptage et ne doivent pas être pris pour un état validé.

## Échantillon de vérification

| Forme | Classes ouvertes candidates après filtrage | Traitement |
|---|---|---|
| sans, le, un, mais, lorsque, donc | Aucune | Conserver les classifications déjà validées des listes fermées/pilote |
| avant | NOM, ADJ, ADV | Refuser ADJ ; garder NOM, ADV, préposition selon décision validée |
| sauf | ADJ | Garder ADJ et préposition |
| courant | NOM, ADJ | Garder les deux |
| rouge | NOM, ADJ | Garder les deux |
| français | NOM, ADJ | Garder les deux |
| pouvoir, devoir | NOM | Conserver aussi VER infinitif selon décisions validées |
| pour, contre | NOM | Fusionner avec les autres emplois déjà validés |
| or | NOM, ADJ | ADJ en quarantaine ; conserver NOM et coordination |

## Décision de méthode

- Ne pas supprimer une analyse déjà validée simplement parce qu'elle est absente de l'extraction.
- Ne pas assimiler « forme à une seule classe candidate » à « mot univoque » : des classes fermées peuvent exister en parallèle.
- Ne pas intégrer automatiquement les 953 homographes : commencer par les listes de mots fréquents et les cas à enjeu pédagogique.
- Documenter les exclusions à l'échelle **(forme, classe)** et non du mot entier.
- Contrôler les verbes à l'infinitif avec une vérification morphologique indépendante avant publication.
