import { Router } from 'express';
import { source } from '../../data-source';
import { Budget } from '../../entity/Budget';
import { Receipt } from '../../entity/Receipt';

const router = Router();

/**
 * calculate remaining budget based on all receipts in the database
 * could be made to be more efficient by only calculating the difference between the last receipt and the current one
 */

router.get('', async (req, res) => {

  const budgetRepository = source.getRepository(Budget);
  const receiptRepository = source.getRepository(Receipt);

  const budgets = await budgetRepository.find();
  const spentBudgets = await Promise.all(budgets.map(async b =>
    [b, (await receiptRepository.find({ where: { category: b.category } }))
    .reduce((p, c) => p + c.total
      ,0)]
  ));

  res.json({ budgets: spentBudgets });
});

/**
 * Create a budget for a category and a given limit
 */
router.post('', async (req, res) => {
  const budgetRepository = source.getRepository(Budget);
  // check to make sure budget doens't already exist
  const check = await budgetRepository.findOne({ where: { category: req.body.category } });
  if (check != undefined) {
    res.status(400).json({ error: "Budget already exists for this category" });
    return;
  }
  // create the budget and insert it into the database
  const budget = budgetRepository.create({ category: req.body.category, limit: req.body.limit });
  budgetRepository.insert(budget);
  res.json(budget);
});


/**
 * Update a budget for a category and a given limit
 */
router.put('', async (req, res) => {
  const budgetRepository = source.getRepository(Budget);
  // check to make sure budget exists
  const check = await budgetRepository.findOne({ where: { category: req.body.category } });
  if (check == undefined) {
    res.status(400).json({ error: "Budget does not exist for this category" });
    return;
  }
  // update the budget and insert it into the database
  const budget = budgetRepository.create({ category: req.body.category, limit: req.body.limit });
  budgetRepository.update({ category: req.body.category }, budget);
  res.json(budget);
});

export default router;
