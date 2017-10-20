# Ratataskr

> 

## About

This project uses [Feathers](http://feathersjs.com), [MongoDB](https://docs.mongodb.com/manual/introduction/), and [React](https://reactjs.org/).

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install Mongo, these are good instructions https://treehouse.github.io/installation-guides/mac/mongo-mac.html
3. Install your dependencies

    ```
    cd path/to/ratataskr; npm install
    ```
4. Start Mongo

   ```
   mongod
   ```
5. Start Ratataskr

    ```
    npm start
    ```
## Mongo

To view the database data, open a new terminal window. Run `mongo` to access the [shell utility] (https://docs.mongodb.com/manual/reference/method/).

```
$ show dbs                             # List all databases
$ use ratataskr                        # Apply commands to our database
$ show collections                     # List all collections (i.e. 'tables')
$ db.users.find()                      # List all Users (shows full object)

```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g feathers-cli             # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Deploy

```
npm run build
```
