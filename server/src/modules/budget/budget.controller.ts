import { Router } from 'express';
import { source } from '../../data-source';
import { Budget } from '../../entity/Budget';
import { Receipt } from '../../entity/Receipt';

const router = Router();

// create a new receipt
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

export default router;
