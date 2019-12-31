import { Request, Response } from 'express'
import { join } from 'path';
import Restaurante from "../schemas/restaurante";

//var RestauranteSchema = require('../schemas/restaurante');

class RestauranteController{

  public async index(req: Request, res: Response){
    res.render('./restaurantes/index',{ basedir : join(__dirname, '..', 'views')});
  }

  public async add(req: Request, res: Response){
    res.render('./restaurantes/create',{ basedir : join(__dirname, '..', 'views')});
 }
 
  public async store(req: Request, res: Response){

    const restaurante = await Restaurante.create(req.body);
    restaurante.save((err, contact) => {
      if(err){
          res.send(err);
      }    
       res.redirect('/restaurantes'); 
  });
  }
   
  public async list(req: Request, res: Response){
    try {
      let restaurantes: any = await Restaurante.find({});
      restaurantes = restaurantes.map((restaurante:any) => { return {id: restaurante._id, nome: restaurante.nome}});
      res.json(restaurantes);
  } catch (err) {
      res.status(500);
      res.end();
      console.error('Caught error', err);
  }
}

/*
 public async update(req: Request, res: Response): Promise<Response>{
  const restaurante = await Restaurante.update()
  return res.json(restaurante)
  }
 */ 
}

export default new RestauranteController()
