import { getManager } from "typeorm";
import { Usuario } from "../entity/Usuario";
import { Caixa } from "../entity/Caixa";

class UsuarioController {

  async criarUsuario(usuario: Usuario) {
    const { email } = usuario;
  
    const usuarioExistente = await getManager().findOne(Usuario, { email });
  
    if (usuarioExistente) {
      throw new Error('Já existe um usuário cadastrado com esse email.');
    }
  
    const usuarioSalvo = await getManager().save(usuario);
  
    // Criar as caixas para o novo usuário
    const caixaEntrada = new Caixa("Entrada", usuarioSalvo);
    const caixaSaida = new Caixa("Saída", usuarioSalvo);
    const caixaArquivada = new Caixa("Arquivada", usuarioSalvo);
  
    await getManager().save(caixaEntrada);
    await getManager().save(caixaSaida);
    await getManager().save(caixaArquivada);
  
    return usuarioSalvo;
  }
  

  async listarUsuarios(id: number) {
    const usuarios = await getManager().find(Usuario);
    const usuariosSemId = usuarios.filter(usuario => usuario.id !== id);
    return usuariosSemId;
  }
  

  async obterUsuarioPorId(id: number) {
    const usuario = await getManager().findOne(Usuario, id);
    return usuario;
  }

  async atualizarUsuarioPorId(id: number, dadosAtualizados: Partial<Usuario>) {
    const usuario = await getManager().findOne(Usuario, id);
    if (!usuario) {
      throw new Error(`Usuário com o ID ${id} não encontrado.`);
    }
    const usuarioAtualizado = Object.assign(usuario, dadosAtualizados);
    const usuarioSalvo = await getManager().save(usuarioAtualizado);
    return usuarioSalvo;
  }

  async excluirUsuarioPorId(id: number) {
    const usuario = await getManager().findOne(Usuario, id);
    if (!usuario) {
      throw new Error(`Usuário com o ID ${id} não encontrado.`);
    }
    const usuarioRemovido = await getManager().remove(usuario);
    return usuarioRemovido;
  }

  async listarCaixas(usuarioId: number) {
    const usuario = await getManager().findOne(Usuario, usuarioId, { relations: ["caixas"] });
    if (!usuario) {
      throw new Error(`Usuario com o ID ${usuarioId} não encontrada.`);
    }
    return usuario.caixas;
  }

  async listarCaixa(usuarioId: number, nome: string) {
    const usuario = await getManager().findOne(Usuario, usuarioId, { relations: ["caixas"] });
    if (!usuario) {
      throw new Error(`Usuario com o ID ${usuarioId} não encontrada.`);
    }

    const caixaNome = usuario.caixas.find((caixa) => caixa.nome === nome)

    return caixaNome.id;
  }

  async autenticarUsuario(email: string, senha: string) {
    const usuario = await getManager().findOne(Usuario, { email });
    
    if (!usuario) {
      throw new Error("Credenciais inválidas. Usuário não encontrado.");
    }
    
    if (usuario.senha !== senha) {
      throw new Error("Credenciais inválidas. Senha incorreta.");
    }
    
    return usuario;
  }
  
}

export default UsuarioController;
