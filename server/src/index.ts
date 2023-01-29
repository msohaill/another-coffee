import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "reflect-metadata";

import { createServer } from 'http';
import { config } from 'dotenv';
import { source } from './data-source';

import uploadController from './modules/upload/upload.controller';
import notificationController from './modules/notifications/notification.controller';
import budgetController from './modules/budget/budget.controller';
import searchController from './modules/search/search.controller';
import messageController from './modules/message/message.controller';
import receiptController from './modules/receipt/receipt.controller';

config();
source.initialize();

const app = express();
const port = process.env.PORT ?? 8000;

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());

const http = createServer(app);

app.use('/budgets', budgetController);
app.use('/upload', uploadController);
app.use('/search', searchController);
app.use('/message', messageController);
app.use('/notif', notificationController);
app.use('/receipts', receiptController);

http.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
