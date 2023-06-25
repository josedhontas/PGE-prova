import { getManager } from "typeorm";
import { Caixa } from "../entity/Caixa";
import { ProcessoJuridico } from "../entity/ProcessoJuridico";

class CaixaController {
  async criarCaixa(caixa: Caixa) {
    const caixaSalva = await getManager().save(caixa);
    return caixaSalva;
  }

  async listarCaixas() {
    const caixas = await getManager().find(Caixa);
    return caixas;
  }

  async obterCaixaPorId(id: number) {
    const caixa = await getManager().findOne(Caixa, id);
    return caixa;
  }

  async listarProcessosJuridicosPorCaixaId(caixaId: number) {
    const caixa = await getManager().findOne(Caixa, caixaId, { relations: ["processosjuridicos"] });
    if (!caixa) {
      throw new Error(`Caixa com o ID ${caixaId} não encontrada.`);
    }
    return caixa.processosjuridicos;
  }
  
  async moverConteudoEntreCaixas(origemId: number, destinoId: number, conteudoId: number) {
    const origem = await getManager().findOne(Caixa, origemId, { relations: ["processosjuridicos"] });
    const destino = await getManager().findOne(Caixa, destinoId, { relations: ["processosjuridicos"] });
  
    if (!origem || !destino) {
      throw new Error("Caixa de origem ou caixa de destino não encontrada.");
    }
  
    const conteudo = origem.processosjuridicos.find(processo => processo.id === conteudoId);
  
    if (!conteudo) {
      throw new Error("Conteúdo específico não encontrado na caixa de origem.");
    }
  
    origem.processosjuridicos = origem.processosjuridicos.filter(processo => processo.id !== conteudoId);
    destino.processosjuridicos.push(conteudo);
  
    await getManager().save([origem, destino]);
  
    return destino;
  }

  async removerProcessoJuridicoDeCaixa(processoJuridicoId: number, caixaId: number) {
    const caixa = await getManager().findOne(Caixa, caixaId, { relations: ["processosjuridicos"] });
  
    if (!caixa) {
      throw new Error(`Caixa com o ID ${caixaId} não encontrada.`);
    }
    const processoJuridico = caixa.processosjuridicos.find(processo => processo.id === processoJuridicoId);
  
    if (!processoJuridico) {
      throw new Error(`Processo Jurídico com o ID ${processoJuridicoId} não encontrado na caixa.`);
    }
    caixa.processosjuridicos = caixa.processosjuridicos.filter(processo => processo.id !== processoJuridicoId);
  
    await getManager().save(caixa);
  
    return caixa;
  }


  async adicionarProcessoJuridicoEmCaixa(caixaId: number, processoJuridicoId: number) {
    const caixa = await getManager().findOne(Caixa, caixaId, { relations: ["processosjuridicos"] });
    const processoJuridico = await getManager().findOne(ProcessoJuridico, processoJuridicoId);
  
    if (!caixa) {
      throw new Error(`Caixa com o ID ${caixaId} não encontrada.`);
    }
  
    if (!processoJuridico) {
      throw new Error(`Processo Jurídico com o ID ${processoJuridicoId} não encontrado.`);
    }
  
    caixa.processosjuridicos.push(processoJuridico);
  
    await getManager().save(caixa);
  
    return caixa;
  }
  
  
}

export default CaixaController;
