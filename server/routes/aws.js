import express from 'express';
import { getApps } from '../services/awsService.js';

const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  const apps = await getApps('color-app');
  res.json(apps);
});

export default router;
