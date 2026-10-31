# Tests d'interaction du jeu Natures — 31 octobre 2026

## Méthode
Le code réel de `js/app.js` et les 268 entrées du corpus élargi ont été chargés dans un environnement JavaScript isolé doté d'un **DOM simulé**. Les boutons et leurs gestionnaires de clics ont été exercés. **Ce n'est pas un test dans un navigateur réel.**

## Série 1 : réponses correctes
- 200 parties complètes, **2 000 questions**.
- **817 questions** portaient sur un mot ayant plusieurs natures.
- Toutes les réponses correctes sélectionnées ont été acceptées.
- Le retour « Bonne réponse ! » et la mention « Réponses acceptées » étaient présents après validation.
- Aucun échec détecté.

## Série 2 : réponses erronées, score et exhaustivité du retour
- 150 parties complètes, **1 500 questions**.
- **150 réponses volontairement erronées** (une par partie) ; message d'erreur attendu observé.
- **643 questions** portaient sur des mots à plusieurs natures.
- Toutes les étiquettes grammaticales enregistrées pour le mot figuraient dans le retour « Réponses acceptées ».
- Score intermédiaire et résultat final corrects (9/10 pour les parties simulées).
- Aucun échec détecté.

## Portée
Les tests couvrent le déclenchement des actions, les sous-catégories, le retour de correction et le calcul du score dans un DOM simulé. **Restent à contrôler dans un navigateur réel :** lisibilité et placement du retour, navigation au clavier, responsive, éventuels problèmes de CSS, confirmation du retour à l'accueil.

Le corpus et la production ne sont pas modifiés.
