# Checklist anti-IA — avant de livrer

Réponds honnêtement par oui/non à chaque question. Les 14 premières sont des red flags directs : plus de 5 "oui" sur celles-ci, il faut reprendre une partie du design.

## Red flags directs

1. Mon accent principal est-il à moins de 10% de teinte du terracotta `#D97757` ?
2. Mon fond clair est-il un beige/crème proche de `#F4F1EA` ?
3. Ai-je un fond quasi-noir avec un seul accent néon (vert acide/vermillon) ?
4. Ma police d'affichage est-elle Inter, Poppins, Montserrat ou Playfair Display, choisie sans justification écrite ?
5. Ai-je une grille en filets fins, border-radius zéro, façon broadsheet, alors que le sujet n'a rien d'éditorial ?
6. Mon hero suit-il exactement "titre + sous-texte + 2 boutons + logos trust" sans variation ?
7. Ai-je des numéros 01/02/03 sur du contenu qui n'est pas réellement une séquence ?
8. Ai-je un bento grid de cartes toutes identiques en taille et traitement ?
9. Ai-je des blobs de gradient flous en arrière-plan ?
10. Toutes mes cards ont-elles `rounded-2xl` + `shadow-lg` sans aucune variation ?
11. Ai-je un carousel de témoignages générique avec avatars ronds ?
12. Mon CTA principal dit-il juste "Commencer" / "Get Started" sans verbe lié à l'action réelle ?
13. Ai-je une animation fade-in-up en cascade sur absolument chaque section au scroll ?
14. Utilise-je les couleurs Tailwind par défaut non retouchées (`slate-900`, `indigo-600`, `violet-500`) ?

## Questions de fond

15. Ce site ressemblerait-il à n'importe quel autre site du même secteur si je changeais juste le texte ?
16. Est-ce que j'ai un élément signature identifiable, ou est-ce que tout est "propre mais interchangeable" ?
17. Ma copie utilise-t-elle le vocabulaire du système ("webhook configuré") plutôt que ce que l'utilisateur contrôle réellement ("notifications activées") ?
18. Ai-je testé le focus clavier visible et `prefers-reduced-motion` ?
19. Ai-je pris une capture d'écran et comparé objectivement à 3 sites générés par IA que je connais ?
20. Ai-je enlevé un accessoire avant de livrer (règle de Chanel) — ou est-ce que j'ai plutôt tendance à en rajouter par peur du vide ?

## Si le score est mauvais

Ne corrige pas red flag par red flag isolément — reviens à `01-regles-anti-generique.md`, passe 2 (critique du plan), et identifie quelle décision de fond (pas de surface) a produit ces symptômes. Changer juste une couleur sans revoir le plan redonnera un résultat générique ailleurs.
