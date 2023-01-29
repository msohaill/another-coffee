import { Router } from 'express';
import { source } from '../../data-source';
import { Receipt } from '../../entity/Receipt';

const router = Router();

router.get('', async (req, res) => {

  const receiptRepository = source.getRepository(Receipt);
  const receipt = receiptRepository.create({ date: new Date(), tax: 7.99, vendor: "Walmart" });

  res.json(receipt);
});

export default router;
