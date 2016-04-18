##Email client app using Angular 2 beta


###Installation

Requirements:

- NodeJS

Installation:

```bash
npm install -g gulp typescript
npm install
```

bower install

To run:

```bash
gulp
```

typings install

typings install ckeditor --ambient  --save


###Usage


#!/bin/bash

# Install packages
npm install

# Install typings
./node_modules/.bin/tsd reinstall -so

# Transpile
./node_modules/.bin/tsc --sourcemap --module commonjs ./start.ts

# Run
DEBUG=email-client-app:* ./start


running server

1> npm run serverBuild
2> npm run server


http://plnkr.co/edit/wHPV4rOTVK4lLTEZHxif?p=preview