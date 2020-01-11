import { Request, Response } from 'express'
import { join } from 'path';
import Prato from "../schemas/prato";

class PratoController{

  public async index(req: Request, res: Response){
    Prato.find({}, (err, pratos) => {
      res.render('./pratos/index',{
         basedir : join(__dirname, '..', 'views'),
         pratos: pratos})
    })
    };

  public async add(req: Request, res: Response){
    res.render('./pratos/create',{ basedir : join(__dirname, '..', 'views'), message: req.flash('sucess') });
 }
 
  public async store(req: Request, res: Response){

    const prato = await Prato.create(req.body);
    prato.save((err) => {
      if(err){
        req.flash('error','Houve um erro ao tentar cadastrar o prato.');
        res.send(err);
        res.redirect('./create');
      }    
      else{
        req.flash('sucess','Prato cadastrado com sucesso');
        res.redirect('./create');
      }
       
  });
  }

  public async delete(req: Request, res: Response) { 
      var id = req.params.id;
      Prato.deleteOne({
          "_id": id
      }, (err) => {
          if (err) {
              res.send("Falha ao remover prato.");
          }
          else {
              // And forward to success page
              req.flash('sucess','Prato removido com sucesso');
              return res.redirect('/pratos');
          }
        });
  }

public async edit(req: Request, res: Response){
  Prato.find({ _id: req.params.id }, (err, prato) => {
    console.log(prato);
    res.render('./pratos/edit',{
        basedir : join(__dirname, '..', 'views'),
        prato: prato})
  })
};

  public async update(req: Request, res: Response) {           
    Prato.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    });
  }
  
}

export default new PratoController()