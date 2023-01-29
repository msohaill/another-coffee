import { Router } from 'express';
import { source } from '../../data-source';
import { Receipt } from '../../entity/Receipt';
import { Item } from '../../entity/Item';
import { Budget } from '../../entity/Budget';
import * as fs from 'fs';
const router = Router();
const Twilio = require('twilio');

router.get('', async (req, res) => {
    // Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC0d5408e954102af3cde775a73cc97b3a";
const authToken = "7311a8c28a4bb6989be09756c4631c04";
if (accountSid && authToken) {
    const client = new Twilio(accountSid, authToken);
  
    await client.messages
      .create({
        from: "+15752375756",
        to: "+15144412932",
        body: req.body.message,
      })
    res.sendStatus(200)
  } else {
    console.error(
      "You are missing one of the variables you need to send a message"
    );
    res.sendStatus(400)
  };
}

);
export default router;