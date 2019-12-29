/* var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('prato')
  }) 

module.exports = router; */

import { Request, Response } from "express";

export let allPratos = (req: Request, res: Response) => {
  res.send("Returns all Pratos");
};

export let getPrato = (req: Request, res: Response) => {
  res.send("Returns one prato");
};

export let deletePrato = (req: Request, res: Response) => {
  res.send("Returns one prato");
};

export let updatePrato = (req: Request, res: Response) => {
  res.send("Returns one prato");
};

export let addPrato = (req: Request, res: Response) => {
  res.send("Returns one prato");
};
