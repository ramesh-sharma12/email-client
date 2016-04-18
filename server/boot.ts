/// <reference path='../typings/main.d.ts' />

import path = require('path');
import express = require('express');
import MongoDB = require('mongodb');
import logger = require('winston');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import http = require('http');
import swig = require('swig');

import {MainRoute} from './routes/main';
import {InitialData} from './data/initialData';
var livereload = require('express-livereload');
var fs = require('fs-extra');
var app = express();

MongoDB.MongoClient.connect("mongodb://localhost:27017/emailsdb", function (err, db) {
    if (err) throw err;   

    app.set('port', process.env.PORT || '8000');

    // Register our templating engine
    app.engine('html', swig.renderFile);

    app.set('view engine', 'html');
    app.set('views', __dirname + '');
    app.set('view cache', false);

    swig.setDefaults({ cache: false });

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
   
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, '../build')));  

    // create a write stream (in append mode) 
    //logger.add(logger.transports.File, { filename : 'access.log' });
    //logger.remove(logger.transports.Console);

    logger.log('info', 'Application Started....');
    
    logger.level = 'debug';  

    // Application routes
    new MainRoute(app,db).Register();   

    http.createServer(app).listen(app.get('port'), function () {       

        fs.mkdirs(path.join(__dirname, '/config'));
        fs.mkdirs(path.join(__dirname, '/views'));

        fs.copy(path.join(__dirname + '/../server/config'), path.join(__dirname, '/config') , function (err) {
          if (err) return console.error(err);

          new InitialData(db).verifyData();

        });    

        fs.copy(path.join(__dirname + '/../server/views'), path.join(__dirname, '/views') , function (err) {
          if (err) return console.error(err);

          console.log("views copied!")
        }); 

        
         //livereload(app, { watchDir: path.join(__dirname, '../build')});

        console.log("Express server listening on port " + app.get('port'));
         console.log("Service file from ..." +  path.join(__dirname, '/build'));
    });
});