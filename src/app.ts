import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from "body-parser";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import sassMiddleware from "node-sass-middleware";

import indexRoutes from './routes/index'
import restauranteRoutes from './routes/restaurantes'
import pratoRoutes from './routes/pratos'

//var sassMiddleware = require('node-sass-middleware')

class App {

  public express: express.Application;
  
  public constructor (){
    this.express = express()
    this.database()
    this.middlewares();
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.set('views', path.join(__dirname, 'views'));
    this.express.set('view engine', 'pug')
    this.express.use(express.static(path.join(__dirname, 'public')));
    this.express.use(cors());
    this.express.use(sassMiddleware({
      src: __dirname + '/sass', 
      dest: __dirname + '/public/',
      debug: true,  
      outputStyle: 'compressed',    
    }));
    this.express.use(bodyParser.json({ limit: '50mb' }));
    this.express.use(bodyParser.urlencoded({ limit: '50mb', extended:true}));
    this.express.use(cookieParser());
    this.express.use(session({ 
      secret: 'zxcv', 
      cookie: { maxAge: 60000 },
      resave: true,
      saveUninitialized: true
    }));
    this.express.use(flash());
  };
  
  private database(): void {
    mongoose.connect('mongodb://127.0.0.1:27017/restaurante', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  };
  
  private routes(): void {
    this.express.use(indexRoutes)
    this.express.use(restauranteRoutes)
    this.express.use(pratoRoutes)

  };
};

export default new App().express