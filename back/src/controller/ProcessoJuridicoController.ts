import { getManager } from "typeorm";
import { ProcessoJuridico } from "../entity/ProcessoJuridico";

class ProcessoJuridicoController {
  async criarProcessoJuridico(processoJuridico: ProcessoJuridico) {
    const processoJuridicoSalvo = await getManager().save(processoJuridico);
    return processoJuridicoSalvo;
  }
  

  async listarProcessosJuridicos() {
    const processosJuridicos = await getManager().find(ProcessoJuridico);
    return processosJuridicos;
  }

  async obterProcessoJuridicoPorId(id: number) {
    const processoJuridico = await getManager().findOne(ProcessoJuridico, id);
    return processoJuridico;
  }

  async atualizarProcessoJuridicoPorId(id: number, dadosAtualizados: Partial<ProcessoJuridico>) {
    const processoJuridico = await getManager().findOne(ProcessoJuridico, id);
    if (!processoJuridico) {
      throw new Error(`Processo Jurídico com o ID ${id} não encontrado.`);
    }
    
    processoJuridico.numero = dadosAtualizados.numero;
    processoJuridico.descricao = dadosAtualizados.descricao;
  
    const processoJuridicoSalvo = await getManager().save(processoJuridico);
    return processoJuridicoSalvo;
  }
  

  async listarCaixasPorProcessoJuridicoId(processoJuridicoId: number) {
    const processoJuridico = await getManager().findOne(ProcessoJuridico, processoJuridicoId, { relations: ["caixas"] });
    if (!processoJuridico) {
      throw new Error(`Processo Jurídico com o ID ${processoJuridicoId} não encontrado.`);
    }
    return processoJuridico.caixas;
  }

  async excluirProcessoJuridicoPorId(id: number) {
    const processoJuridico = await getManager().findOne(ProcessoJuridico, id);
    if (!processoJuridico) {
      throw new Error(`Processo Jurídico com o ID ${id} não encontrado.`);
    }
    const processoJuridicoRemovido = await getManager().remove(processoJuridico);
    return processoJuridicoRemovido;
  }
}

export default ProcessoJuridicoController;
