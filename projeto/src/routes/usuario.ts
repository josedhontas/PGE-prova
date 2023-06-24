import { Router } from "express";
import { Usuario } from "../entity/Usuario";
import { Caixa } from "../entity/Caixa";
import CaixaController from "../controller/CaixaController";
import UsuarioController from "../controller/UsuarioController";

export const routerUsuario = Router();

const usuarioCtrl = new UsuarioController();

const caixaCtrl = new CaixaController();


routerUsuario.post('/', async (req, res) =>{
    const {email, nome, senha, cargo} = req.body;
    const usuario = new Usuario(email, nome, senha, cargo);
    const usuarioSalvo = await usuarioCtrl.criarUsuario(usuario)
    const caixaEntrada = await caixaCtrl.criarCaixa(new Caixa("Entrada", usuario))
    const caixaSaida = await caixaCtrl.criarCaixa(new Caixa("Saida", usuario))
    const caixaArquivada = await caixaCtrl.criarCaixa(new Caixa("Arquivada", usuario))
    res.json(usuarioSalvo);
})

routerUsuario.post('/autenticar', async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      const usuarioAutenticado = await usuarioCtrl.autenticarUsuario(email, senha);
      res.json(usuarioAutenticado);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  })


routerUsuario.get('/:id', async(req, res) => {
    const {id} = req.body;
    const usuarioCaixas = await usuarioCtrl.listarCaixas(id);
    res.json(usuarioCaixas)
}) 

routerUsuario.get('/entrada/:id', async(req, res) => {
    const {id} = req.body;
    const usuarioCaixas = await usuarioCtrl.listarCaixa(id, 'Entrada');
    const processos = await caixaCtrl.listarProcessosJuridicosPorCaixaId(usuarioCaixas)
    res.json(processos)
}) 

routerUsuario.get('/saida/:id', async(req, res) => {
  const {id} = req.body;
  const usuarioCaixas = await usuarioCtrl.listarCaixa(id, 'Saida');
  const processos = await caixaCtrl.listarProcessosJuridicosPorCaixaId(usuarioCaixas)
  console.log(processos)
  res.json(processos)
}) 

routerUsuario.get('/arquivada/:id', async(req, res) => {
  const {id} = req.body;
  const usuarioCaixas = await usuarioCtrl.listarCaixa(id, 'Arquivada');
  const processos = await caixaCtrl.listarProcessosJuridicosPorCaixaId(usuarioCaixas)
  res.json(processos)
})


routerUsuario.put('/arquivar', async(req, res) => {
  const {idUusario, idProcesso} = req.body;
  const entrada = await usuarioCtrl.listarCaixa(idUusario, 'Entrada');
  const arquivar = await usuarioCtrl.listarCaixa(idUusario, 'Arquivada');
  const mover = await caixaCtrl.moverConteudoEntreCaixas(entrada, arquivar, idProcesso);
  res.json(mover)
})


routerUsuario.put('/desarquivar', async(req, res) => {
  const {idUusario, idProcesso} = req.body;
  const entrada = await usuarioCtrl.listarCaixa(idUusario, 'Entrada');
  const arquivar = await usuarioCtrl.listarCaixa(idUusario, 'Arquivada');
  const mover = await caixaCtrl.moverConteudoEntreCaixas(arquivar, entrada, idProcesso);
  res.json(mover)
})


