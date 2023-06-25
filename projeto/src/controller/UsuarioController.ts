import { getManager } from "typeorm";
import { Usuario } from "../entity/Usuario";

class UsuarioController {
  async criarUsuario(usuario: Usuario) {
    const usuarioSalvo = await getManager().save(usuario);
    return usuarioSalvo;
  }

  async listarUsuarios() {
    const usuarios = await getManager().find(Usuario);
    return usuarios;
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
    console.log(usuarioId)
    const usuario = await getManager().findOne(Usuario, usuarioId, { relations: ["caixas"] });
    if (!usuario) {
      throw new Error(`Usuario com o ID ${usuarioId} não encontrada.`);
    }

    const caixaNome = usuario.caixas.find((caixa) => caixa.nome === nome)
    console.log(usuario)

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
