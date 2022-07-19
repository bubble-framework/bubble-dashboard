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

router.post('/:repoName/teardown', async function (req, res, next) {
  const name = req.params.repoName;
  const path = getAllRepos().find(repo => repo.repoName === name).filePath;
  process.chdir(path);
  exec(`bubble teardown`, async (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      res.status(500).send("Something went wrong");
    }
    console.log(stdout);
    if (stdout.includes("some Lambdas are not ready to be deleted yet")) {
      res.status(500).send("Lambdas not ready to be deleted yet, please try again later");
    } else {
      res.status(200).send("Lambdas are being deleted right now");
    }
  });
});

export default router;
