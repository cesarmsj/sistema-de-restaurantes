import { Request, Response } from 'express'
import { join } from 'path';

var Restaurante = require('../schemas/restaurante');

class RestauranteController{

  public async index(req: Request, res: Response){
    res.render('./restaurantes/index',{ basedir : join(__dirname, '..', 'views')});
  }

  public async create(req: Request, res: Response){
    res.render('./restaurantes/create',{ basedir : join(__dirname, '..', 'views')});
 }

  public async store(req: Request, res: Response){
    const restaurante = new Restaurante(req.body);
    restaurante.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(restaurante);
      }
    });
  };
  

  public async list(req: Request, res: Response): Promise<Response>{
     const restaurantes = await Restaurante.list()
     return res.json(restaurantes)
  }

 public async update(req: Request, res: Response): Promise<Response>{
  const restaurante = await Restaurante.update()
  return res.json(restaurante)
  }
  
}

export default new RestauranteController()
