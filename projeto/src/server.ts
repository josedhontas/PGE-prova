import {app} from './app';

const porta = 8000;

const server = app.listen(porta, () => console.log('App iniciado na porta', porta));

process.on('SIGINT', () => {
    server.close();
    console.log('App encerado');
})