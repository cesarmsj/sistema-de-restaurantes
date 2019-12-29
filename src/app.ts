//import * as bodyParser from "body-parser";
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

import indexRoutes from './routes/index'
import restauranteRoutes from './routes/restaurantes'

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