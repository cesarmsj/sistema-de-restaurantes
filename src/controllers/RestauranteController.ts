import { Request, Response } from 'express'
import { join } from 'path';
import Restaurante from "../schemas/restaurante";
import { ObjectId } from 'mongodb';

class RestauranteController{

  public async index(req: Request, res: Response){
    Restaurante.find({}, (err, restaurantes) => {
      res.render('./restaurantes/index',{
         basedir : join(__dirname, '..', 'views'),
         restaurantes: restaurantes})
    })
    };
    /*
    try {
      let restaurantes: any = await Restaurante.find({});
      restaurantes = restaurantes.map((restaurante:any) => { return {id: restaurante._id, nome: restaurante.nome}});
      res.render('restauranteslist', {
        'restauranteslist': restaurantes.lenght, 
      });
    } catch (err) {
        res.status(500);
        res.end();
        console.error('Caught error', err);
  } */
  //}

  public async add(req: Request, res: Response){
    res.render('./restaurantes/create',{ basedir : join(__dirname, '..', 'views'), message: req.flash('sucess') });
 }
 
  public async store(req: Request, res: Response){

    const restaurante = await Restaurante.create(req.body);
    restaurante.save((err) => {
      if(err){
        req.flash('error','Houve um erro ao tentar cadastrar restaurante.');
        res.send(err);
        res.redirect('./create');
      }    
      else{
        req.flash('sucess','Restaurante cadastrado com sucesso');
        res.redirect('./create');
      }
       
  });
  }

  public async delete(req: Request, res: Response) { 
      // Set our internal DB variable
     // var id = JSON.parse(req.params.id);
      var id = req.params.id;
      console.log(id)
      // Set our collection
      // Submit to the DB
      Restaurante.deleteOne({
          "_id": id
      }, (err) => {
          if (err) {
              // If it failed, return error
              res.send("Falha ao remover restaurante.");
          }
          else {
              // And forward to success page
              req.flash('sucess','Restaurante removido com sucesso');
              return res.redirect('/restaurantes');
          }
        });
  }

  public async edit(req: Request, res: Response){
    Restaurante.find({ _id: req.params.contactId }, (err, restaurante) => {
      res.render('./restaurantes/index',{
         basedir : join(__dirname, '..', 'views'),
         restaurante: restaurante})
    })
    };

  public async update(req: Request, res: Response) {           
    Restaurante.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    });
  }
  
}



/*
 public async update(req: Request, res: Response): Promise<Response>{
  const restaurante = await Restaurante.update()
  return res.json(restaurante)
  }
 */ 


export default new RestauranteController()
