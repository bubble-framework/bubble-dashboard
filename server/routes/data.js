import express from 'express';
import { getApps } from '../services/awsService.js';
import { getAllRepos } from '../services/jsonService.js';

const router = express.Router();

/* GET home page. */
router.get('/all', function (req, res, next) {
  const names = getAllRepos();
  console.log(names);
  res.json(names);
})

router.get('/:repoName', async function (req, res, next) {
  const name = req.params.repoName;
  const apps = await getApps(name);
  res.json(apps);
});

export default router;
