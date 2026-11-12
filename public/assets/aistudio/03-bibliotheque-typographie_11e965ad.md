# Bibliothèque de typographie

10 associations display/body/mono, classées par ambiance. Toutes les polices citées sont disponibles gratuitement (Google Fonts ou Fontshare). Couple la typo choisie avec une palette de la même famille d'ambiance, ou volontairement en contraste — mais dis-le.

## Polices à ne jamais choisir par réflexe

Inter, Poppins, Montserrat, Roboto, Open Sans, DM Sans — et le duo Playfair Display + serif sur fond crème. Ce ne sont pas de mauvaises polices, mais leur omniprésence dans les templates SaaS et les générations IA signale "généré" avant même que le contenu soit lu. Utilisables uniquement si tu peux justifier pourquoi elles servent mieux ce brief précis qu'une alternative.

Règle annexe : ne jamais prendre le display et le body dans la même superfamille sans raison (ex. "Inter Display" + "Inter" — c'est le réflexe Vercel/shadcn par défaut).

## 1. Technique retenue
Display **Bricolage Grotesque** · Body **Public Sans** · Mono **JetBrains Mono**
Usage : outils dev, dashboards, produits techniques qui veulent un peu de personnalité sans perdre en lisibilité.

## 2. Éditorial contemporain
Display **Fraunces** (graisses 600–900) · Body **Source Sans 3** · Mono **IBM Plex Mono**
Usage : contenu long, blogs, essais, sites à lire plutôt qu'à scanner.

## 3. Luxe sombre
Display **Instrument Serif** (italique pour les accents) · Body **Karla** · Mono **Space Mono**
Usage : marque premium, portfolio, hôtellerie.

## 4. Brutaliste affirmé
Display **Unbounded** (graisse 900) · Body **Work Sans** · Mono **Fragment Mono**
Usage : manifeste, produit à message fort, marque qui veut trancher.

## 5. Scientifique clinique
Display **Newsreader** (italique) · Body **IBM Plex Sans** · Mono **IBM Plex Mono**
Usage : recherche, data, papers, santé.

## 6. Chaleureux artisanal
Display **Fraunces** (graisse basse, optical size large) · Body **Figtree** · Mono **Commit Mono**
Usage : artisanat, food, lifestyle, produit local.

## 7. Corporate décalé
Display **Clash Display** (Fontshare) · Body **General Sans** (Fontshare) · Mono **Space Mono**
Usage : startup qui veut sortir du look SaaS générique sans partir dans l'extrême.

## 8. Minimal monochrome
Display **Big Shoulders** (condensed) · Body **Hanken Grotesk** · Mono **JetBrains Mono**
Usage : portfolio design, mode, studio créatif.

## 9. Vintage revisité
Display **Domine** · Body **Petrona** · pas de mono nécessaire
Usage : édition, littéraire, archive.

## 10. Système / documentation technique
Display **Schibsted Grotesk** · Body **Source Sans 3** · Mono **IBM Plex Mono**
Usage : documentation produit, specs techniques, sites orientés développeurs — pertinent pour un profil système/logiciel.

## Comment choisir

1. Vérifie que le display porte vraiment une personnalité liée au sujet — pas juste "joli".
2. Le body doit rester lisible en paragraphe long ; teste avec un vrai paragraphe de contenu, jamais du lorem ipsum.
3. Fixe une échelle de tailles avec des graisses et espacements intentionnels — pas les valeurs par défaut du framework.
4. Une police mono n'est utile que s'il y a réellement du contenu technique/data à distinguer (code, chiffres, labels).
