# Layout et élément signature

## Archétypes de hero (au-delà de "titre + sous-texte + 2 boutons")

Choisis celui qui correspond au sujet, pas celui qui est le plus rapide à produire :

1. **Démo live / interactive** — le produit se montre en fonctionnant réellement (éditeur, calculateur, mini-outil).
2. **Image unique plein cadre** — une seule image caractéristique du sujet, pas un montage de 3 captures d'écran flottantes.
3. **Citation éditoriale** — une phrase forte, seule, grand format typographique, sans image.
4. **Hero data** — un vrai chiffre lié au sujet (pas un chiffre marketing vague), avec son contexte immédiat.
5. **Typographique pur** — le texte est l'image ; aucune illustration, juste une composition de type ambitieuse.
6. **Split process/diagramme** — la moitié de l'écran montre comment ça marche, pas juste ce que c'est.
7. **Terminal / console** — pertinent pour des outils dev : le hero est littéralement une session de commande ou un flux de logs stylisé.
8. **Carte / diagramme spatial** — pertinent si le sujet a une dimension géographique ou réseau.

## Dispositifs structurels

Eyebrows, dividers, labels, numéros : chacun doit encoder une information réelle sur le contenu, jamais décorer par habitude.

- Numéros (01/02/03) : uniquement si le contenu est une vraie séquence (étapes d'un process, timeline datée). Sinon, utilise des labels thématiques.
- Dividers : doivent marquer une vraie rupture de sujet, pas juste "aérer".
- Eyebrows (petit texte au-dessus d'un titre) : doivent apporter une info que le titre seul ne donne pas (catégorie, date, statut) — pas répéter le titre en plus petit.

## Patterns à éviter par défaut

- Bento grid de cartes toutes identiques en taille et traitement.
- Grille 3 colonnes icône + titre + paragraphe où les 3 colonnes sont interchangeables entre elles.
- Cards `rounded-2xl` + `shadow-lg` + glassmorphism appliquées uniformément à tout.
- Fond avec blobs de gradient flous en arrière-plan.
- Carousel de témoignages avec avatars ronds génériques et logos "trusted by" en niveaux de gris.
- Nav sticky avec bouton CTA en pilule, identique sur 90% des sites SaaS actuels.

## Trouver l'élément signature

Pose-toi ces questions jusqu'à en trouver une qui donne une vraie réponse spécifique au sujet (pas "un joli dégradé") :

- Quel est l'objet, geste ou artefact le plus caractéristique de ce domaine ?
- Y a-t-il une donnée réelle, un process réel, ou un vocabulaire réel du domaine qu'on peut rendre visible plutôt que décrire ?
- Si quelqu'un ne devait retenir qu'une seule capture d'écran de ce site, laquelle voudrait-on que ce soit ?
- Qu'est-ce qu'un designer humain spécialisé dans CE domaine précis (pas le design web en général) ajouterait que je n'aurais pas pensé à faire ?

Une fois trouvé : dépense ton audace là, uniquement là, et garde le reste du site discipliné et silencieux autour.

## Mouvement

Un moment orchestré (séquence de chargement, révélation ciblée au scroll, micro-interaction au survol) marque plus que des effets dispersés partout. Le fade-in-up en cascade sur chaque section, sans intention, est un des signaux les plus reconnaissables de génération IA — n'anime que ce qui a une raison de l'être. Respecte toujours `prefers-reduced-motion`.

## Wireframes ASCII — 3 concepts de départ

**Concept A — asymétrique, contenu à gauche**
```
+------------------------+------------------+
|  Eyebrow               |                  |
|  Titre (2-3 lignes)    |   Élément        |
|  Sous-texte court      |   signature      |
|  [CTA]                 |   (grand)        |
+------------------------+------------------+
```

**Concept B — plein cadre, typo pure**
```
+-------------------------------------------+
|                                             |
|         TITRE ÉNORME SUR 3 LIGNES          |
|                                             |
|   sous-texte discret, aligné à droite      |
+-------------------------------------------+
```

**Concept C — démo centrale**
```
+-------------------------------------------+
|         Titre court + [CTA]                |
+-------------------------------------------+
|                                             |
|          [ démo interactive live ]         |
|                                             |
+-------------------------------------------+
```
