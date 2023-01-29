import { Router } from 'express';
import { source } from '../../data-source';
import { Budget } from '../../entity/Budget';
import { Receipt } from '../../entity/Receipt';
import cohere from "cohere-ai";
const router = Router();



/**
 * Send a message with Cohere because a budget has been exceeded
 */

router.post('', async (req, res) => {

    cohere.init("3DNJDqC2p7HaKjQduEb7RchGymNMgxWP3giiJhLF");
    
    const cohereResponse = await cohere.generate({
        model: "command-xlarge-20221108",
        prompt: `I have crossed the limit in the ${req.body.category} category of my budget by ${req.body.overflow} dollars. Tell me off for crossing this limit with a fun joke! Make sure to tell me which category it was and how much I exceeded it by`,
        max_tokens: 50,
        temperature: 0.9,
        k: 0,
        p: 0.75,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: [],
        return_likelihoods: "NONE",
        });
    res.send(cohereResponse.body.generations[0].text.trim())

});

export default router;