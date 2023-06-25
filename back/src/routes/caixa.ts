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

routerCaixa.put('/arquivar', async (req, res) => {
    const { origemId, destinoId, processoId } = req.body;
    try {
      const caixaDestino = await caixaCtrl.moverConteudoEntreCaixas(origemId, destinoId, processoId);
      res.json(caixaDestino);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });