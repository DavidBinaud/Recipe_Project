# Recipe_Project
Node Recipe Project
https://pierrecavalet-apidae.netlify.app/tp/heroku.html

express doc: https://expressjs.com/fr/guide/routing.html
axios doc: https://axios-http.com/docs/intro
nunjucks doc: https://mozilla.github.io/nunjucks/
restDb api doc: https://restdb.io/docs/rest-api#restdb



TP noté

Créez une API de gestion de recettes. Cette API doit contenir:
- [x] une route pour récupérer une recette
- [x] une route pour récupérer la liste des recettes
- [x] une route pour ajouter une recette
- [x] une route pour supprimer une recette
- [x] une route pour modifier une recette

- [x] une route pour créer un compte
- [x] une route pour se connecter (récupérer un JWT)

- [x] Les routes liées à la creation/suppression/modification de recettes doivent être uniquement accessibles aux personnes connectés. 
- [x] La seule personne pouvant modifier ou supprimer une recette doit être la personne qui l'a créé.

- [x] Les utilisateurs ainsi que les recettes seront stockés dans restdb comme vu en TP.

- [x] Le système d'authentification doit être fait avec les librairies utilisées en TP (passport et passport-jwt).

- [x] Le projet doit être déployé sur Heroku.

- [ ] ATTENTION: l'api doit communiquer uniquement en JSON (res.json avec express).

- [x] ATTENTION 2: pour communiquer avec votre serveur express depuis une page web, vous aurez besoin de gérer les CORS. voir le middleware express cors

Le rendu du projet sera

    l'URL d'un github contenant les sources de votre projet ainsi qu'un readme qui explique comment lancer/installer le projet + les parties manquantes et pourquoi (si vous n'avez tout fait).
    l'URL de votre API + l'url de l'application finale (avec la partie Vue.js)


##### Requis pour rendu
- Chaque fichier à sa propre utilité, il faut qu'ils soient court (voir modules avec calc)
- Readme propre avec url du projet en prod, les choses implémentées, image
- bien commenter
