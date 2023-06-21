import { Router } from "express";
import { ProcessoJuridico } from "../entity/ProcessoJuridico";
import ProcessoJuridicoController from "../controller/ProcessoJuridicoController";

export const routerProcessoJuridico = Router();
const processoJuridicoCtrl = new ProcessoJuridicoController();

routerProcessoJuridico.get('/', async (req, res) => {
  const processosJuridicos = await processoJuridicoCtrl.listarProcessosJuridicos();
  res.json(processosJuridicos);
});

routerProcessoJuridico.get('/:id', async (req, res) => {
  const { id } = req.params;
  const processoJuridico = await processoJuridicoCtrl.obterProcessoJuridicoPorId(Number(id));
  
  if (!processoJuridico) {
    return res.status(404).json({ error: `Processo Jurídico com o ID ${id} não encontrado.` });
  }

  res.json(processoJuridico);
});

routerProcessoJuridico.post('/', async (req, res) => {
  const { numero, descricao, caixaId } = req.body;

  // Crie uma instância de ProcessoJuridico com os dados recebidos
  const novoProcessoJuridico = new ProcessoJuridico(numero, descricao, caixaId);

  const processoJuridicoSalvo = await processoJuridicoCtrl.criarProcessoJuridico(novoProcessoJuridico);
  res.json(processoJuridicoSalvo);
});

routerProcessoJuridico.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { numero, descricao, caixaId } = req.body;

  const dadosAtualizados = {
    numero,
    descricao,
    caixa: caixaId
  };

  try {
    const processoJuridicoAtualizado = await processoJuridicoCtrl.atualizarProcessoJuridicoPorId(Number(id), dadosAtualizados);
    res.json(processoJuridicoAtualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

routerProcessoJuridico.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const processoJuridicoRemovido = await processoJuridicoCtrl.excluirProcessoJuridicoPorId(Number(id));
    res.json(processoJuridicoRemovido);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
