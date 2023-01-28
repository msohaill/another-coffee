import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "reflect-metadata";

import { createServer } from 'http';
import { config } from 'dotenv';
import { source } from './data-source';

import helloController from './modules/hello/hello.controller';

config();
source.initialize();

const app = express();
const port = process.env.PORT ?? 8000;

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());

const http = createServer(app);

app.use('/hello', helloController);

http.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
