![ArgentBank](/src/assets/images/argentBankLogo.png)

[![Netlify Status](https://api.netlify.com/api/v1/badges/1bfd9040-73da-4438-9d12-1947e015d19a/deploy-status)](https://app.netlify.com/sites/argentbank/deploys)

# OPENCLASSROOMS PROJECT 13

# Argent Bank

Open website at [Argent Bank](https://argentbank.netlify.app/)

- Although without the backend you will only be able to access the home & sign in pages.

## Use an API for a bank user account with React

The project is for a new startup bank, Argent Bank, that is trying to break into the industry and needs help setting up their app. 

## Objective
A two-part contract that breaks down into several phases:

### Phase 1: 
User Authentication - Creating a web application for customers to log in and manage their accounts and profiles.

- Create the full responsive web application with React
- As a starting point, the static HTML and CSS for the homepage, login page and profile page are provided
- Use Redux to manage the state of the whole application
- The back-end engineers have already created all the APIs needed. All the Swagger documentation is inside the repo
- What the application should do - see details for each in the `Issues` link below or the `Issues` folder in the repo:
-	The user can visit the home page
-	The user can log in to the system
-	The user can log out of the system
-	User can see their own profile information only after successful login
-	The user can change the profile and keep the data in the database

### Phase 2: 
Transactions - This would involve specifying the API endpoints needed for a possible second mission once phase one is completed.
Transactions are still in the design phase. On our side, we are developing a functionality for transactions that should allow users to :
-	view all their transactions for the current month
-	view the details of a transaction in another view
-	Add, edit or delete transaction information.

Since you are already managing the web application for phase 1, we want to hear your thoughts on how you think the APIs should be modeled on the back end. We need you to provide us with a document describing the proposed transaction APIs, following the Swagger guidelines.

Key elements to specify for each API endpoint will include:
-	The HTTP method (e.g. GET, POST, etc.)
-	The route (e.g. /store/inventory)
-	The description of what the endpoint corresponds to (e.g.: Return of the pet inventory)
-	The possible parameters to account for the different scenarios (e.g. itemId (optional) = ID of the specific item to request from the inventory database)
-	The different responses with corresponding response codes that make sense for this endpoint (e.g. 404: unknown item error response).

You can use the transactions page presented in the mockups to guide your choices (but you don't need to implement this page). Just make sure the document is exported to a YAML file (i.e. File > Save as YAML) using the Swagger syntax, which can be exported in the Swagger editing tool.

## Resources
- [Issues](https://github.com/Stevens-Mark/Project-13-Bank-API/tree/master/.github/ISSUE_TEMPLATE)
- Further information can be found in the folder `Argent Bank Briefs`

## Skills

- [x] Implement a state manager in a React application
- [x] Interacting with an API
- [x] Modeling an API
- [x] Authenticating to an API

# Installation *(English)*

## Prerequisites

- [NodeJS](https://nodejs.org/en/)  Version 16.13.0 
- [Yarn](https://yarnpkg.com/) Version 1.22.11
- [Visual Studio Code](https://code.visualstudio.com/) or another IDE of your choice

## Dependencies

- [React](https://reactjs.org/) Version 17.0.2
- [React-router-dom](https://v5.reactrouter.com/web/guides/quick-start) Version 5.2.0
- [Redux ToolKit](https://redux-toolkit.js.org/) Version 1.7.0
- [react-redux](https://react-redux.js.org/) Version 7.2.6
- [redux](https://redux.js.org/) Version 4.1.2
- [immer](https://www.npmjs.com/package/immer) Version 9.0.7
- [axios](https://axios-http.com/docs/intro) Version 0.24.0
- [Prop-types](https://www.npmjs.com/package/prop-types) Version 15.7.2
- [Styled-components](https://styled-components.com/) Version 5.3.3


## Installing and running the project

### First - Backend Api

- Clone the Backend Api onto your computer :  
`git clone https://github.com/OpenClassrooms-Student-Center/Project-13-Bank-API.git`
or :  
`git clone https://github.com/Stevens-Mark/Project-13-Bank-API.git`

- Follow the installation instructions carefully in the readme file provided.


### Second - Frontend App

- Clone this repository onto your computer:

  `git clone https://github.com/Stevens-Mark/StevensMark_P13_02122021.git`

- Inside this repository, install the packages/dependencies: `yarn`

- Run the Frontend App: `yarn start`

- You will see the message :

  `? something is already running on port 3000.`
  `Would you like to run the app on another port instead >> (Y/n)`

- Answer: Y

The App normally runs on http://localhost:3001/

**Warning, currently only two users.**

### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- First Name: `Steve`
- Last Name: `Rogers`
- Email: `steve@rogers.com`
- Password: `password456`


## Phase 2 - Proposal - API Documentation
The  document describing the proposed transaction APIs, following the Swagger guidelines can be found in the "Yaml" folder. Or once the local environment (backend) is started, visit: http://localhost:3001/api-docs

# OPENCLASSROOMS PROJET 13

# Argent Bank

Ouvrir le site web ?? [Argent Bank](https://argentbank.netlify.app/)

- Bien que sans le backend, vous ne pourrez acc??der qu'aux pages d'accueil et de connexion.

## Utilisez une API pour un compte utilisateur bancaire avec React

Le projet est destin?? ?? une nouvelle banque, Argent Bank, qui essaie de percer dans le secteur et qui a besoin d'aide pour mettre en place son application. 


## Objectif
Un contrat en deux parties qui se d??compose en plusieurs phases :

### Phase 1 : 
Authentification de l'utilisateur - Cr??ation d'une application Web permettant aux clients de se connecter et de g??rer leurs comptes et leurs profils.

- Cr??er l'application web full responsive avec React
- Comme point de d??part, le HTML statique et le CSS pour la page d'accueil, la page de connexion et la page de profil sont fournis
- Utiliser Redux pour g??rer l'??tat de l'ensemble de l'application
- Les ing??nieurs back-end ont d??j?? cr???? toutes les API n??cessaires. Toute la documentation Swagger se trouve dans le d??p??t
- Ce que l'application doit faire - voir les d??tails pour chacun dans le lien `Issues` ci-dessous ou le dossier `Issues` dans le repo :
- L'utilisateur peut visiter la page d'accueil
- L'utilisateur peut se connecter au syst??me
- L'utilisateur peut se d??connecter du syst??me
- L'utilisateur ne peut voir les informations de son propre profil qu'apr??s avoir r??ussi ?? se connecter
- L'utilisateur peut modifier son profil et conserver les donn??es dans la base de donn??es

### Phase 2 : 
Transactions - Il s'agit de sp??cifier les points de terminaison de l'API n??cessaires pour une ??ventuelle deuxi??me mission une fois la premi??re phase termin??e.
Les transactions sont encore en phase de conception. De notre c??t??, nous d??veloppons une fonctionnalit?? pour les transactions qui devrait permettre aux utilisateurs de :
- de visualiser toutes leurs transactions pour le mois en cours
- de visualiser les d??tails d'une transaction dans une autre vue
- ajouter, modifier ou supprimer des informations sur les transactions.

??tant donn?? que vous g??rez d??j?? l'application Web pour la phase 1, nous souhaitons conna??tre votre avis sur la mani??re dont les API doivent ??tre mod??lis??es au niveau du back-end. Nous avons besoin que vous nous fournissiez un document d??crivant les API de transaction propos??es, en suivant les directives Swagger.

Les ??l??ments cl??s ?? sp??cifier pour chaque point de terminaison de l'API comprendront :
- La m??thode HTTP (par exemple, GET, POST, etc.)
- La route (par exemple, /store/inventory)
- La description de ce ?? quoi le point de terminaison correspond (par exemple : Retour de l'inventaire des animaux de compagnie)
- Les param??tres possibles pour tenir compte des diff??rents sc??narios (par exemple, itemId (facultatif) = ID de l'article sp??cifique ?? demander ?? la base de donn??es d'inventaire)
- Les diff??rentes r??ponses avec les codes de r??ponse correspondants qui ont un sens pour ce point de terminaison (par exemple, 404 : r??ponse d'erreur pour un article inconnu).

Vous pouvez utiliser la page de transactions pr??sent??e dans les maquettes pour guider vos choix (mais vous n'avez pas besoin d'impl??menter cette page). Assurez-vous simplement que le document est export?? vers un fichier YAML (c'est-??-dire Fichier > Enregistrer sous YAML) en utilisant la syntaxe Swagger, qui peut ??tre export??e dans l'outil d'??dition Swagger.

## Ressources

- [Issues](https://github.com/Stevens-Mark/Project-13-Bank-API/tree/master/.github/ISSUE_TEMPLATE)
- Vous trouverez plus d'informations dans le dossier `Argent Bank Briefs`

## Skills

- [x] Impl??menter un gestionnaire d'??tat dans une application React
- [x] Int??ragir avec une API
- [x] Mod??liser une API
- [x] S'authentifier ?? une API


# Installation *(fran??ais)*


## Pr??requis

- [NodeJS](https://nodejs.org/en/)  Version 16.13.0 
- [Yarn](https://yarnpkg.com/) Version 1.22.11
- [Visual Studio Code](https://code.visualstudio.com/) ou un autre IDE de votre choix

## D??pendances

- [React](https://reactjs.org/) Version 17.0.2
- [React-router-dom](https://v5.reactrouter.com/web/guides/quick-start) Version 5.2.0
- [Redux ToolKit](https://redux-toolkit.js.org/) Version 1.7.0
- [react-redux](https://react-redux.js.org/) Version 7.2.6
- [redux](https://redux.js.org/) Version 4.1.2
- [immer](https://www.npmjs.com/package/immer) Version 9.0.7
- [axios](https://axios-http.com/docs/intro) Version 0.24.0
- [Prop-types](https://www.npmjs.com/package/prop-types) Version 15.7.2
- [Styled-components](https://styled-components.com/) Version 5.3.3


## Installation et ex??cution du projet

### Premi??rement - Backend Api

- Clonez l'Api Backend sur votre ordinateur :

  `git clone https://github.com/OpenClassrooms-Student-Center/Project-13-Bank-API.git`
ou :
  `git clone https://github.com/Stevens-Mark/Project-13-Bank-API.git`

- Suivez attentivement les instructions d'installation dans le fichier readme fourni.


### Second - Frontend App

- Clonez ce r??f??rentiel sur votre ordinateur :

  `git clone https://github.com/Stevens-Mark/StevensMark_P13_02122021.git`

- Dans ce d??p??t, installez les paquets/d??pendances : `yarn`

- Ex??cutez l'application frontale : `yarn start`

- Vous verrez le message :

  `? something is already running on port 3000.`
  `Would you like to run the app on another port instead >> (Y/n)`

- r??pondre: Y

L'application fonctionne normalement sur http://localhost:3001/


**Attention, actuellement seulement deux utilisateurs.**

### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- First Name: `Steve`
- Last Name: `Rogers`
- Email: `steve@rogers.com`
- Password: `password456`

## Phase 2 - Proposition - API Documentation
Le document d??crivant les API de transaction propos??es, suivant les directives Swagger, se trouve dans le dossier "Yaml". Ou une fois que l'environnement local (backend) est d??marr??, visitez : http://localhost:3001/api-docs.