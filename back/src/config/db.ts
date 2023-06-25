import { createConnection } from "typeorm";

export const conectarServidorNoBD = async () => {
    const conexao = await createConnection();
    const nome = conexao.options.database;
    console.log("Servidor ", nome)

    process.on('SIGINT', () =>{
        conexao.close().then(() => console.log('Conexao ao bd fechada'));
    });
}