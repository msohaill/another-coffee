import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "reflect-metadata";

import { createServer } from 'http';
import { config } from 'dotenv';
import { source } from './data-source';

import helloController from './modules/hello/hello.controller';

const cohere = require('cohere-ai');

cohere.init('3DNJDqC2p7HaKjQduEb7RchGymNMgxWP3giiJhLF'); // This is your trial API key

config();
source.initialize();

const app = express();
const port = process.env.PORT ?? 8000;

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());

const http = createServer(app);

app.use('/hello', helloController);

const item = 'Milk';


// the API call for the cohere.ai model
// (async () => {
//   const response = await cohere.generate({
//     model: 'command-xlarge-20221108',
//     prompt: 'In what broad category of groceries do you categorize' + item + 'if you saw it on a receipt? In one word please.',
//     max_tokens: 300,
//     temperature: 0.9,
//     k: 0,
//     p: 0.75,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//     stop_sequences: [],
//     return_likelihoods: 'NONE'
//   });
//   console.log(`Prediction: ${response.body.generations[0].text}`);
// })();


// // import requests
// // import base64

// const CLIENT_ID = "CLIENT_ID";

// const ENVIRONMENT_URL = "ENVIRONMENT_URL";

// const username = "shahrad2002";
// const api_key = "2360a1fd67fa93d3cb613093d26868b5";

// const process_image_url =  ENVIRONMENT_URL  + 'api/v8/partner/documents/';

// const headers = {
//     "Content-Type": "application/json", 
//     "Accept": "application/json",
//     "CLIENT-ID": CLIENT_ID,
//     "AUTHORIZATION": "apikey " + username + ": " + api_key
// }

// import * as fs from 'fs';
// // TODO: download and install the packages
// import * as base64 from 'base64-arraybuffer';
// import * as request from 'request-promise-native';

// // file path and file name
// const imagePath = '/tmp/example.jpg';
// const fileName = 'example.jpg';

// // read image file and convert to ArrayBuffer
// const imageFile = fs.readFileSync(imagePath);
// const imageBuffer = new Uint8Array(imageFile).buffer;

// // convert image to Base64
// const base64EncodedString = base64.encode(imageBuffer);

// // define categories
// const categories = ["Office Expense", "Meals & Entertainment", "Utilities", "Auto"];

// // create payload
// const payload = {
//     file_name: fileName,
//     file_data: base64EncodedString,
//     categories: categories
// };

// // send payload in a POST request
// const options = {
//     method: 'POST',
//     uri: process_image_url,
//     headers: headers,
//     json: payload
// };

// request(options)
//     .then((response: any) => {
//         console.log(response);
//     })
//     .catch((err: any) => {
//         console.error(err);
//     });






http.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
