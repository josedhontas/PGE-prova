import { Router } from "express";
import CaixaController from "../controller/CaixaController";

export const routerCaixa = Router();
const caixaCtrl = new CaixaController();

routerCaixa.get('/:id', async(req, res) => {
    const {id} = req.body;
    const caixaProcessos = await caixaCtrl.listarProcessosJuridicosPorCaixaId(id);
    res.json(caixaProcessos)
}) 

routerCaixa.get('/', async(req, res) => {
    const caixas = await caixaCtrl.listarCaixas();
    res.json(caixas)
}) 

