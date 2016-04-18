#!/bin/bash

# Transpile
./node_modules/.bin/tsc --sourcemap --outDir ./dist --rootDir ./server --module commonjs ./server/boot.ts

# Run
DEBUG=email-client-app:* ./start
