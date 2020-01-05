import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from "body-parser";

import indexRoutes from './routes/index'
import restauranteRoutes from './routes/restaurantes'

var sassMiddleware = require('node-sass-middleware')

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
    this.express.use(cors())
    this.express.use(sassMiddleware({
      src: __dirname + '/sass', 
      dest: __dirname + '/public/stylesheets/',
      debug: true,  
      outputStyle: 'compressed',
      //prefix:  '/stylesheets'     
    }))
    //Allows us to receive requests with data in json format
    this.express.use(bodyParser.json({ limit: '50mb' }));
    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.express.use(bodyParser.urlencoded({ limit: '50mb', extended:true}));
  };
  
  private database(): void {
    mongoose.connect('mongodb://127.0.0.1:27017/restaurante', {
      useNewUrlParser: true
    })
  };
  
  private routes(): void {
    this.express.use(indexRoutes)
    this.express.use(restauranteRoutes)

  };
};

export default new App().express