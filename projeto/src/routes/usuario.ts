import { Router } from "express";
import { Usuario } from "../entity/Usuario";
import { Caixa } from "../entity/Caixa";
import CaixaController from "../controller/CaixaController";
import UsuarioController from "../controller/UsuarioController";

export const routerUsuario = Router();

const usuarioCtrl = new UsuarioController();

const caixaCtrl = new CaixaController();


routerUsuario.get('/', async (req, res) =>{
  const usuarios = await usuarioCtrl.listarUsuarios();
  res.json(usuarios);
})

routerUsuario.post('/', async (req, res) =>{
    const {email, nome, senha, cargo} = req.body;
    const usuario = new Usuario(email, nome, senha, cargo);
    const usuarioSalvo = await usuarioCtrl.criarUsuario(usuario)
    const caixaEntrada = await caixaCtrl.criarCaixa(new Caixa("Entrada", usuario))
    const caixaSaida = await caixaCtrl.criarCaixa(new Caixa("Saida", usuario))
    const caixaArquivada = await caixaCtrl.criarCaixa(new Caixa("Arquivada", usuario))
    res.json(usuarioSalvo);
})

// autenticar o usuario 

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

// listar os processos do usuario (procurador/acessor) na entrada

routerUsuario.get('/entrada/:id', async(req, res) => {
  const id = parseInt(req.params.id);
    const usuarioCaixas = await usuarioCtrl.listarCaixa(id, 'Entrada');
    const processos = await caixaCtrl.listarProcessosJuridicosPorCaixaId(usuarioCaixas)
    res.json(processos)
}) 

// listar os processos do usuario (procurador/acessor) na saida

routerUsuario.get('/saida/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  const usuarioCaixas = await usuarioCtrl.listarCaixa(id, 'Saida');
  const processos = await caixaCtrl.listarProcessosJuridicosPorCaixaId(usuarioCaixas)
  console.log(processos)
  res.json(processos)
}) 

// listar os processos do usuario (procurador/acessor) em arquivado

routerUsuario.get('/arquivada/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  const usuarioCaixas = await usuarioCtrl.listarCaixa(id, 'Arquivada');
  const processos = await caixaCtrl.listarProcessosJuridicosPorCaixaId(usuarioCaixas)
  res.json(processos)
})

//Arquivar um processo

routerUsuario.put('/arquivar', async(req, res) => {
  const {idUsuario, idProcesso} = req.body;
  const entrada = await usuarioCtrl.listarCaixa(idUsuario, 'Entrada');
  const arquivar = await usuarioCtrl.listarCaixa(idUsuario, 'Arquivada');
  const mover = await caixaCtrl.moverConteudoEntreCaixas(entrada, arquivar, idProcesso);
  res.json(mover)
})

// desarquivar um processo

routerUsuario.put('/desarquivar', async(req, res) => {
  const {idUsuario, idProcesso} = req.body;
  const entrada = await usuarioCtrl.listarCaixa(idUsuario, 'Entrada');
  const arquivar = await usuarioCtrl.listarCaixa(idUsuario, 'Arquivada');
  const mover = await caixaCtrl.moverConteudoEntreCaixas(arquivar, entrada, idProcesso);
  res.json(mover)
})


routerUsuario.put('/enviar', async(req, res) => {
  const {idOrigem, idDestino, idProcesso} = req.body;
  const entrada = await usuarioCtrl.listarCaixa(idOrigem, 'Entrada');
  const saidaOrigem = await usuarioCtrl.listarCaixa(idOrigem, 'Saida');
  const mover = await caixaCtrl.moverConteudoEntreCaixas(entrada, saidaOrigem, idProcesso);
  const entradaDestino = await usuarioCtrl.listarCaixa(idDestino, 'Entrada');
  const resu = await caixaCtrl.adicionarProcessoJuridicoEmCaixa(entradaDestino, idProcesso);
  res.json(resu);
});


// excluir um processo

routerUsuario.delete('/excluir', async(req, res) => {
  const {idProcesso, idUsario} = req.body;
  const idCaixa = await usuarioCtrl.listarCaixa(idUsario, 'Entrada');
  const excluido = await caixaCtrl.removerProcessoJuridicoDeCaixa(idProcesso, idCaixa);
  res.json(excluido);
})




