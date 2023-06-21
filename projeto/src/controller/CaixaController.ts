import { getManager } from "typeorm";
import { Caixa } from "../entity/Caixa";

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

  async listarProcessosJuridicosId(caixaId: number) {
    const caixa = await getManager().findOne(Caixa, caixaId, { relations: ["processosjuridicos"] });
    if (!caixa) {
      throw new Error(`Caixa com o ID ${caixaId} não encontrada.`);
    }
    return caixa.processosjuridicos;
  }
  
}

export default CaixaController;
