import { Router } from "express";
import { Usuario } from "../entity/Usuario";
import { Caixa } from "../entity/Caixa";
import CaixaController from "../controller/CaixaController";
import UsuarioController from "../controller/UsuarioController";

export const routerUsuario = Router();

const usuarioCtrl = new UsuarioController();

const caixaCtrl = new CaixaController();

routerUsuario.post('/', async (req, res) =>{
    const {email, senha, cargo} = req.body;
    const usuario = new Usuario(email, senha, cargo);
    const usuarioSalvo = await usuarioCtrl.criarUsuario(usuario)
    const caixaEntrada = await caixaCtrl.criarCaixa(new Caixa("Entrada", usuario))
    const caixaSaida = await caixaCtrl.criarCaixa(new Caixa("Saida", usuario))
    const caixaArquivada = await caixaCtrl.criarCaixa(new Caixa("Arquivada", usuario))
    res.json(usuarioSalvo);
})


routerUsuario.get('/:id', async(req, res) => {
    const {id} = req.body;
    const usuarioCaixas = await usuarioCtrl.listarCaixas(id);
    res.json(usuarioCaixas)
}) 