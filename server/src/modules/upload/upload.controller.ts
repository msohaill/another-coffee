import { Router } from 'express';
import { source } from '../../data-source';
import { Receipt } from '../../entity/Receipt';
import { Item } from '../../entity/Item';
import cohere from "cohere-ai";
const router = Router();
const Client = require("@veryfi/veryfi-sdk");

router.post("", async (req, res) => {
  const receiptRepository = source.getRepository(Receipt);
  const itemRepository = source.getRepository(Item);

  const veryfiClientID = "vrftuS92oT4eloR42BbvpmRTyHEIUUAMMxWJTSN";
  const veryfiClientSECRET =
    "spl5t64dIVUEn4TVmM0it1wL03d74CPLNIuGn3BRWVBZmiSHfSjiO5iaMPfDfY2ks9TzU4EEhDNxpFmVSl9vRRGWDYXabOZjGkbAv5u5y1rkXjhIdxz77abz1D3rjN2j";
  const veryfiUsername = "shahrad2002";
  const apiKey = "2360a1fd67fa93d3cb613093d26868b5";

  let veryfiClient = new Client(
    veryfiClientID,
    veryfiClientSECRET,
    veryfiUsername,
    apiKey
  );

  cohere.init("3DNJDqC2p7HaKjQduEb7RchGymNMgxWP3giiJhLF");

  let veryfiResponse = await veryfiClient.process_document_buffer(req.body.receipt);

  const receipt = receiptRepository.create({
    date: Date.parse(veryfiResponse.date),
    tax: veryfiResponse.tax ?? 0.0,
    total: veryfiResponse.total,
    vendor: veryfiResponse.vendor.name,
    category: req.body.category,
  });

  receiptRepository.insert(receipt);

  veryfiResponse.line_items.forEach(async (item: any) => {
    const name = item.description;
    const cohereResponse = await cohere.generate({
      model: "command-xlarge-20221108",
      prompt: `In what broad category of groceries do you categorize ${name} if you saw it on a receipt? In one word please.`,
      max_tokens: 5,
      temperature: 0.9,
      k: 0,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: [],
      return_likelihoods: "NONE",
    });

    const createdItem = itemRepository.create({
      name: name,
      price: item.total ?? item.price ?? 0.0,
      tag: [`${cohereResponse.body.generations[0].text.trim()}`],
      receipt,
    });

    itemRepository.insert(createdItem);
    console.log(createdItem)
  });
});

export default router;
