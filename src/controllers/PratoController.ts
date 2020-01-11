import { Request, Response } from 'express'
import { join } from 'path';
import Prato from "../schemas/prato";
import Restaurante from "../schemas/restaurante";

class PratoController{

  public async index(req: Request, res: Response){
    const nome = req.query.nome;
    if (nome == undefined){
      Prato.find({}, (err, pratos) => {
        res.render('./pratos/index',{
           basedir : join(__dirname, '..', 'views'),
           pratos: pratos})
      })
    }
    else{
      Prato.find({"nome": req.query.nome}, (err, pratos) => {
        res.render('./pratos/index',{
           basedir : join(__dirname, '..', 'views'),
           pratos: pratos})
      })
    }
    /*
    Prato.find({}, (err, pratos) => {
      res.render('./pratos/index',{
         basedir : join(__dirname, '..', 'views'),
         pratos: pratos})
    })*/
    };

  public async add(req: Request, res: Response){
    Restaurante.find({}, (err, restaurantes) => {
    res.render('./pratos/create',{
       basedir : join(__dirname, '..', 'views'), 
       message: req.flash('sucess'),
       restaurantes: restaurantes,
       });
 });
 }
 
  public async store(req: Request, res: Response){
    
    Prato.findOneAndUpdate({ $and : [ 
        { nome: req.body.nome },
        { restaurante: req.body.restaurante }  
        ]
      }, req.body, { new: true }, async (err, result) => {
        if(err){
            res.send(err);
        }else
        {
          if(result == null){
            const prato = await Prato.create(req.body);
            prato.save((err) => {
              if(err){
                req.flash('error','Houve um erro ao tentar cadastrar o prato.');
                res.send(err);
                res.redirect('./create');
              }    
              else{
                req.flash('sucess','Prato cadastrado com sucesso');
                return res.redirect('/pratos');
              } 
            });
          }
          else{
            return res.redirect('/pratos');
          }
        }
      });
    };

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
  Prato.findOne({ _id: req.params.id }, (err, prato) => {
    Restaurante.find({}, (err, restaurantes) => {
      console.log(prato);
      res.render('./pratos/edit',{
          basedir : join(__dirname, '..', 'views'),
          prato: prato,
          restaurantes: restaurantes})
      })
  })
};

public async update(req: Request, res: Response) {           
  Prato.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, contact) => {
      if(err){
          res.send(err);
      }
      return res.redirect('/pratos');
  });
};
  
}

export default new PratoController()