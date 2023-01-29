import { Router } from 'express';
import { source } from '../../data-source';
import { Receipt } from '../../entity/Receipt';
import { Item } from '../../entity/Item';
import * as fs from 'fs';
const cohere = require('cohere-ai');
const router = Router();
const Client = require('@veryfi/veryfi-sdk');


router.get('', async (req, res) => {

    // veryFi API credentials 
    const verifyClientID = "vrftuS92oT4eloR42BbvpmRTyHEIUUAMMxWJTSN";
    const verifyClientSECRET = "spl5t64dIVUEn4TVmM0it1wL03d74CPLNIuGn3BRWVBZmiSHfSjiO5iaMPfDfY2ks9TzU4EEhDNxpFmVSl9vRRGWDYXabOZjGkbAv5u5y1rkXjhIdxz77abz1D3rjN2j";
    const verifyUsername = 'shahrad2002';
    const apiKey = '2360a1fd67fa93d3cb613093d26868b5';
    cohere.init('3DNJDqC2p7HaKjQduEb7RchGymNMgxWP3giiJhLF');
    const categories = ['Grocery', 'Utilities', 'Travel'];

    const base64img = req.body.receipt; // base64 image of the receipt

    let veryfi_client = new Client(verifyClientID, verifyClientSECRET, verifyUsername, apiKey);
    let verifyResponse = await veryfi_client.process_document_buffer(base64img); // receipt OCR
    console.log(verifyResponse);    // print the response

    const receiptRepository = source.getRepository(Receipt);    // get the receipt repository
    const receipt = receiptRepository.create({  date: Date.parse(verifyResponse.date), 
                                                tax: verifyResponse.tax,
                                                vendor: verifyResponse.vendor.stringify(),
                                                items: verifyResponse.line_items}); // create a new receipt


    // iterate over verifyResponse.line_items and for the description attribute of each item, add it to the 
    // end of the string 'In what broad categories of groceries do you categorize' separating every new item using ',' as well as adding the string to a list called tags. In the last iteration, add an
    // 'and' before the last item. And at the end, add 'if you saw it on a receipt? One word for each.'
    // for example: 'In what broad categories of groceries do you categorize milk, eggs, and bread if you saw it on a receipt? One word for each.'
    let starter = 'In what broad categories of ' + req.body.category + ' do you categorize';
    for (let i = 0; i < verifyResponse.line_items.length; i++) {
        const name = verifyResponse.line_items[i].description;
        if (i == verifyResponse.line_items.length - 1) {
            // if it's the last item, add an 'and' before it
            starter += ' and ' + name + ' if you saw it on a receipt? One word for each.';
        } else {
            starter +=  ' ' + name + ',';
        }
    }

    const cohereResponse = await cohere.generate({
        model: 'command-xlarge-20221108',
        prompt: starter,
        max_tokens: 300,
        temperature: 0.9,
        k: 0,
        p: 0.75,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE'
    });

    const tagss = `${cohereResponse.body.generations[0].text}`;
    const lines = tagss.split('\n');
    const tags = lines.map((line) => {
        const parts = line.split(' - ');
        return parts[1];
    });

    // save each receipt item on the database
    // iterate through secondWords and for each item, save it on the database
    for (let i = 0; i < tags.length; i++) {

        const itemRepository = source.getRepository(Item); 
        const item = itemRepository.create({
            name: verifyResponse.line_items[i].description, 
            category: req.body.category,
            tag: [tags[i]],
            receipt: receipt}); // create a new item
        console.log(item);
    }
    res.json(receipt);
});

export default router;


