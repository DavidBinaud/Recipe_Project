# Recipe_Project

**Auteurs** : David Binaud - Clément Delafontaine
Licence APIDAE - IUT Montpellier Sète

Ce projet propose aux utilisateurs de créer un compte afin d'accéder à une liste de recettes écrites par la communauté. Chacun peut créer et proposer ses recettes. 

## Back

Le module backend développé avec node.jss qui fonctionne avec une bd restdb.io

### Installation (linux macOS)

Pour déployer le serveur sur votre machine :

- Cloner le module. Assurez-vous que les fichiers package.json sont présents à la racine du projet et dans un terminal lancez la commande suivante :

```shell
npm install
```

- Créer un fichier *restdb.json* avec les éléments suivants :

```json
{
	"restdb_api_key" : "clé_api_rest.io",
	"restdb_db_url" : "nom_de_la_db_rest.io"
}
```

- pour lancer le serveur :

```shell
node index.js
```

# ATTENDUS

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

- [x] ATTENTION: l'api doit communiquer uniquement en JSON (res.json avec express).

- [x] ATTENTION 2: pour communiquer avec votre serveur express depuis une page web, vous aurez besoin de gérer les CORS. voir le middleware express cors

