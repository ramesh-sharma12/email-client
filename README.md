##Email client app using Angular 2 beta on MEAN Stack.

###Installation

Requirements:

- NodeJS, MongoDB

# Install packages

```bash
npm install -g gulp typescript webpack express

npm install
typings install

```
Create folder in following path to run mongodb
C:\data\db

#To run:

Run mongoDb server from path C:\Program Files\MongoDB\Server\3.2\bin\mongodb
Open mongo.exe
Create database using below command

> use emailsDb

#Building client

```bash
gulp build

```

# Transpile
./node_modules/.bin/tsc --sourcemap --module commonjs ./start.ts

# Run

Running  express server
> npm run server


http://plnkr.co/edit/wHPV4rOTVK4lLTEZHxif?p=preview
