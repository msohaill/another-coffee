import { Router } from 'express';
import { source } from '../../data-source';
import { Receipt } from '../../entity/Receipt';

const router = Router();

// create a new receipt. Endpoint for testing
router.post('', async (req, res) => {

  const receiptRepository = source.getRepository(Receipt);
  const receipts = await receiptRepository.find({ relations: ['items'], order: { date: 'DESC' } });
  res.json({ receipts });
});

export default router;
