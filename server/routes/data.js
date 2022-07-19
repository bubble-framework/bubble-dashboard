import express from 'express';
import { getApps } from '../services/awsService.js';
import { getAllRepos } from '../services/jsonService.js';
import { exec } from "child_process";

const router = express.Router();

router.get('/all', function (req, res, next) {
  const names = getAllRepos();
  res.json(names);
})

router.get('/:repoName', async function (req, res, next) {
  const name = req.params.repoName;
  const apps = await getApps(name);
  res.json(apps);
});

router.post('/:repoName/destroy', async function (req, res, next) {
  const name = req.params.repoName;
  const path = getAllRepos().find(repo => repo.repoName === name).filePath;
  process.chdir(path);
  exec(`bubble destroy`, async (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      res.status(500).send();
    }
    console.log(stdout);
  });
  res.status(200).send();
});

export default router;
