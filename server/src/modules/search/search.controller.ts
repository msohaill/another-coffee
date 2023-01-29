import { Router } from 'express';
import { source } from '../../data-source';
import { Item } from '../../entity/Item';
import { Receipt } from '../../entity/Receipt';
import { Like } from 'typeorm';

const router = Router();


/**
 * create a search endpoint - to find all instances of items that match a tag
 * caclulate the total cost of all items that match a tag
 */
router.get('/items', async (req, res) => {
    const itemRepository = source.getRepository(Item);
    // get all the items which match a tag
    const items = await itemRepository.find({ where: { tag: Like(`%${req.body.tag}%`) } });
    var totalCost = 0;
    // loop through items and add up the total cost
    for (let i = 0; i < items.length; i++) {
        totalCost += items[i].price;
    }
    res.json({ items: items, totalCost: totalCost });

});

/**
 * Create a search endpoint - to find all instances of receipts in a category
 */

router.get('/receipts', async (req, res) => {
    const receiptRepository = source.getRepository(Receipt);
    // get all the receipts which match a category
    const receipts = await receiptRepository.find({ where: { category: req.body.category } });
    res.json({ receipts: receipts });

});

/** 
 * Create a search endpoint - to find all instances of receipts from a store
 * How accurate is the categorization of stores? 
 */

router.get('/stores', async (req, res) => {
    const receiptRepository = source.getRepository(Receipt);
    // get all the receipts which match a store
    const receipts = await receiptRepository.find({ where: { vendor: Like(`%${req.body.vendor}%`) } });
    res.json({ receipts: receipts });
});

/**
 * General search that returns all items where the search query either matches the vendor, name of item, or tag
 */
router.get('/general', async (req, res) => {
    // get the repositories
    const itemRepository = source.getRepository(Item);
    const receiptRepository = source.getRepository(Receipt);
    // get all the items that match the query ( by tags and names )
    const items = await itemRepository.find({ 
        where: [{ name: Like(`%${req.body.query}%`) }, 
        {tag: Like(`%${req.body.query}%`)}] 
    })

    // get all the receipts that match the query ( by vendor )
    const receipts = await receiptRepository.find({ where: { vendor: Like(`%${req.body.query}%`)}, relations: ['items'] })
    // console.log(receipts);

    // concat the items and the items on receipts
    receipts.map(r => items.push(...r.items));

    // console.log(items);
    res.json(items);
}); 

export default router;

