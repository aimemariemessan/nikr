# Système anti-générique — Index

Ensemble de fichiers de référence à fournir à l'IA (Claude Code, Cursor, agent CLI, ou collés dans le prompt) avant chaque nouveau site, pour casser les réflexes visuels que l'IA reproduit par défaut.

## Fichiers du système

| Fichier | Rôle | Moment d'utilisation |
|---|---|---|
| `01-regles-anti-generique.md` | Règles de fond, patterns à fuir, process de conception en 4 passes | Toujours en premier — c'est le prompt système design |
| `02-bibliotheque-palettes.md` | 18 palettes classées par ambiance, hex nommés par rôle | Au moment de choisir la couleur |
| `03-bibliotheque-typographie.md` | 10 associations display/body/mono classées par ambiance | Au moment de choisir la typo |
| `04-layout-et-signature.md` | Archétypes de hero, dispositifs structurels, élément signature | Pendant le plan de layout |
| `05-checklist-anti-ia.md` | 20 red flags à vérifier avant de livrer | Juste avant de considérer le site fini |

## Utilisation concrète

**Avec Claude Code / Cursor / un agent en CLI** : place ce dossier à la racine du repo (ex. `.claude/design/`) et référence-le explicitement en début de session :

> Avant de concevoir, lis `.claude/design/01-regles-anti-generique.md`. Le sujet du site est [X]. Choisis UNE palette dans `02-bibliotheque-palettes.md` et UNE typo dans `03-bibliotheque-typographie.md` cohérentes avec ce sujet, justifie le choix en une phrase, puis suis le process décrit dans `01`. Vérifie le résultat avec `05-checklist-anti-ia.md` avant de me le montrer.

**Avec claude.ai / une conversation web** : colle le contenu de `01` en premier message du projet, garde `02` et `03` comme fichiers de projet consultables.

## Règle d'usage la plus importante

Ne donne jamais ces fichiers "en vrac" sans préciser le sujet du site. Une bibliothèque de palettes ne sert à rien si l'IA n'est pas forcée de justifier son choix par rapport au sujet — sinon elle reprend son réflexe par défaut même avec 18 options sous les yeux. Exige toujours une phrase de justification du type "j'ai choisi [palette X] parce que [lien avec le sujet]".

## Pourquoi ça marche

Le problème n'est pas un manque d'options dans le modèle — il en connaît des milliers. Le problème est une distribution de sortie très concentrée autour de quelques défauts (voir `01`). Ces fichiers ne remplacent pas le jugement : ils forcent une étape de choix explicite et justifié, qui casse cette concentration statistique.
