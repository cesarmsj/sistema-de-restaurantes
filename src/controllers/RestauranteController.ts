import { Request, Response, NextFunction } from 'express'
import { join } from 'path';
import Restaurante from "../schemas/restaurante";

class RestauranteController{

  public async index(req: Request, res: Response){
    const nome = req.query.nome;
    if (nome == undefined){
      Restaurante.find({}, (err, restaurantes) => {
        res.render('./restaurantes/index',{
           basedir : join(__dirname, '..', 'views'),
           restaurantes: restaurantes,
           messages: { 
             success: req.flash('success'),
             error: req.flash('error'),
          } 
          })
      })
    }
    else{
        var busca = Restaurante.find({"nome": req.query.nome}, (err, restaurantes) => {
          busca.count( (err, count) => {
              req.flash("success", "Foram encontrados " + count + " restaurante(s) com este nome.");
              res.render('./restaurantes/index',{
              basedir : join(__dirname, '..', 'views'),
              restaurantes: restaurantes,
              messages: { 
                success: req.flash('success'),
              } 
            })
          })
        })
      }
    };

  public async add(req: Request, res: Response){
    res.render('./restaurantes/create',{ basedir : join(__dirname, '..', 'views'), message: req.flash('sucess') });
 }
 
 public async store(req: Request, res: Response, next: NextFunction ){
    
  Restaurante.findOneAndUpdate({  
       nome: req.body.nome ,  
    }, req.body, { new: true }, async (err, result) => {
      if(err){
          res.send(err);
      }else
      {
        if(result == null){
          const restaurante = await Restaurante.create(req.body);
          restaurante.save((err) => {
            if(err){
              req.flash('error','Houve um erro ao tentar cadastrar o restaurante: ' + err);
              return res.redirect('/restaurantes');
            }    
            else{
              req.flash("success", "Restaurante cadastrado com sucesso.");
              return res.redirect('/restaurantes');
            } 
          });
        }
        else{
          req.flash("success","Restaurante atualizado com sucesso.")
          return res.redirect('/restaurantes');
        }
      }
    });
  };

  public async delete(req: Request, res: Response) { 
      var id = req.params.id;
      Restaurante.deleteOne({
          "_id": id
      }, (err) => {
          if (err) {
            req.flash('error','Não foi possível remover o restaurante.');
          }
          else {
              req.flash('success','Restaurante removido com sucesso');
              return res.redirect('/restaurantes');
          }
        });
  }

public async edit(req: Request, res: Response){
  Restaurante.findOne({ _id: req.params.id }, (err, restaurante) => {
    console.log(restaurante);
    res.render('./restaurantes/edit',{
        basedir : join(__dirname, '..', 'views'),
        restaurante: restaurante})
  })
};

  public async update(req: Request, res: Response) {           
    Restaurante.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, contact) => {
        if(err){
            res.send(err);
        }
        req.flash("success","Restaurante atualizado com sucesso.")
        return res.redirect('/restaurantes');
    });
  };
  
}

export default new RestauranteController()
