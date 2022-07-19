import fs from "fs";
import path from "path";

export const getAllRepos = () => {
  const activeReposPath = path.join(process.env.HOME, "/.bubble/activeRepos.json");
  const rawRepoNames = JSON.parse(fs.readFileSync(activeReposPath));
  return rawRepoNames;
};