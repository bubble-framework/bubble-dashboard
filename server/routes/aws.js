import express from 'express';
import { getApps } from '../services/awsService.js';

const router = express.Router();

/* GET home page. */
router.get('/:repoName', async function (req, res, next) {
  const name = req.params.repoName;
  const apps = await getApps(name);
  res.json(apps);
});

export default router;
