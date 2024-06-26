# Cours visualisation - notreHistoire.ch (projet de Mathias Winiger)

**Vers la visualisation**: https://angrykatrine.github.io/cours-visualisation-notrehistoire.ch/

## Descriptif

### Contexte de la problématique
Ce projet de visualisation s'inscrit dans la continuité de mon travail de mémoire d'histoire et d'humanités numériques. Dans ce travail, je me suis interrogé sur la transformation d'archives privées en des éléments d'une histoire partagée. J'ai pour cela analysé la plateforme numérique participative notreHistoire.ch.

Éditée depuis 2009 par la FONSART, cette plateforme invite des institutions, mais aussi des amateurs et des amatrices à publier leurs archives afin de constituer une histoire partagée de la Suisse romande. Aujourd'hui, la plateforme compte plus de 112'000 publications, dont une majorité de photographies. Lors de leur mise en ligne, les utilisateurs et utilisatrices sont encouragé-e-s à contextualiser leurs documents, notamment par l'ajout de coordonnées. De plus, la web-édition sélectionne et met en valeur quotidiennement des contenus sur la page d'accueil du site - ce sont les "repérages" de notreHistoire.

J'ai souhaité créer une visualisation de données afin de montrer quelles sont les régions les plus documentées et mises en valeur sur cette plateforme. 

### Données
Dans le cadre de mon travail de mémoire, j'ai récolté grâce à l'API (https://notrehistoire.ch/api/v1) toutes les données relatives aux 112'000 documents publiés sur ce site. Ces publications sont pourvues de nombreuses métadonnées, dont d'éventuelles coordonnées ainsi qu'un statut *featured*, qui correspond aux "repérages" de la web-édition.
Mon projet de visusalisation a pris en compte les 30'114 publications géolocalisées (coordonnées longitudinales et latitudinales) en date du 30 avril 2024. Chacune de ces entrées est pourvue des variables suivantes: Titre, latitude, longitude, date de publication, type de média, période, standard/repérage, nombre de vues. 
Les repérages de notreHistoire: Au total, 26'698 documents géolocalisés ont le statut "standard" et 3'415 documents géolocalisés ont le statut "repérage". Il me paraissait pertinent de pouvoir filtrer les repérages de sorte à visualiser l'action de valorisation de l'éditeur.ice.
Qualité des données: La qualité des données dépendent du soin apporté par les personnes qui publient et contextualisent leurs documents. L'auteur.e d'une publication est en effet responsable de l'exactitude des éléments contextuels. La fiabilité des données est donc liée à la qualité du travail des membres de notreHistoire.

### Choix de la visualisation
La nature du projet notreHistoire m'a naturellement poussée à créer une visualisation représentant une carte de la Suisse. J'ai d'abord réfléchi à créer des "cluster" plus ou moins grands en fonction du nombre de documents rattachés à certaines régions, mais cela impliquait des choix arbitraire liés à la définition de périmètres. Il m'a semblé plus opportun de représenter toutes ces publications par des points uniques. La superposition de ces points peu saturés révèle avec une plus grande subtilité quelles sont les régions les plus représentées sur cette plateforme. En outre, j'ai décidé de différencier les publications standard et les publications "repérages" par des checkboxes afin de montrer l'action éditoriale des web-éditeur-ice-s de notreHistoire. Chaque publication est représentée par un point et ces derniers peuvent être filtrés selon différentes variables: repérages, type de média, nombre de vues.

### Interprétation des résultats
Cette visualisation montre que les documents géolocalisés de notreHistoire représentent en grande majorité la Suisse romande, et en particulier la ville de Genève, l'arc lémanique et la plaine du Rhône. Les "repérages" se concentrent majoritairement autour de Genève, Lausanne, Vevey, Montreux, Fribourg, et le Valais central. Les cantons du Jura et du Jura bernois sont, quand à eux, relativement peu représentés. 

### Limites interprétatives et développement futur
Cette visualisation offre avant tout une impression. Elle ne permet pas d'expliquer précisemment pourquoi certaines régions sont davantage représentées sur la carte et pourquoi d'autres le sont moins. De plus, elle pourrait être davantage informative, par exemple par l'ajout d'un tableau indiquant le nombre de publications associées à chaque canton. L'idée d'une représentation par clusters pourrait également offrir une interprétation plus informative. De plus, mon jeu de données est "figé" - il s'arrête au 30 avril 2024. Cela soulève des questions quant à l'actualisation de cette visualisation.

## Sources

- Données tirées de https://notrehistoire.ch/api/v1
- d3 version 4
- d3 geoProjection - https://d3js.org/d3-geo/projection
- d3 scale-chromatic - https://d3js.org/d3-scale-chromatic
- Carte interactive - Leaflet: https://github.com/Leaflet/Leaflet?tab=readme-ov-file
- Code inspiré du projet "Where surfers live" de Yan Holtz - https://www.data-to-viz.com/story/GPSCoordWithoutValue.html
- Système de filtre inspiré du projet "Combination filters with checkboxes" - https://codepen.io/piotrek/pen/mXpRmQ?editors=1111
- Tooltip inspiré de "Building tooltips with d3.js" - https://d3-graph-gallery.com/graph/interactivity_tooltip.html  


