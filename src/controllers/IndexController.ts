import { Request, Response  } from 'express'
import { join } from 'path';

class IndexController{

  public async index(req: Request, res: Response){
    res.render('index',{ basedir : join(__dirname, '..', 'views')});
  }
}

export default new IndexController()

