import { Router } from 'express';
import { source } from '../../data-source';
import { Receipt } from '../../entity/Receipt';

const router = Router();

// create a new receipt. Endpoint for testing
router.post('', async (req, res) => {

  const receiptRepository = source.getRepository(Receipt);
  const receipt = receiptRepository.create({ date: new Date(), tax: 7.99, vendor: "Walmart" });
  const r = await receiptRepository.findOneOrFail({ where: {id: 1} })
  res.json(receipt);
});

export default router;