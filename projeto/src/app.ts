import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';

import { conectarServidorNoBD } from './config/db';


export const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(logger('dev'));

conectarServidorNoBD();


