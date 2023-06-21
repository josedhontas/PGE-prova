import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';

import { conectarServidorNoBD } from './config/db';
import { routerUsuario } from './routes/usuario';
import { routerCaixa } from './routes/caixa';


export const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(logger('dev'));

conectarServidorNoBD();

app.use('/usuario', routerUsuario)
app.use('/caixa', routerCaixa)


