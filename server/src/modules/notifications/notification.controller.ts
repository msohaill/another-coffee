import { Router } from 'express';
import { source } from '../../data-source';
import { Receipt } from '../../entity/Receipt';
import { Item } from '../../entity/Item';
import { Budget } from '../../entity/Budget';
import * as fs from 'fs';
const router = Router();
const twiolio = require('twilio');

router.get('', async (req, res) => {
    // Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC0d5408e954102af3cde775a73cc97b3a";
const authToken = "7311a8c28a4bb6989be09756c4631c04";
const client = twiolio(accountSid, authToken);

client.messages
  .create({ body: "Hello from Twilio", from: "+15752375756", to: "+15144412932" })});

export default router;