import fs from "fs";
import path from "path";

export const getAllRepos = () => {
  const activeReposPath = path.join(process.env.HOME, "../temp_data_deleteme/activeRepos.json"); // comment out when tailwind is set up
  // const activeReposPath = path.join(process.env.HOME, "/.bubble/activeRepos.json"); // comment back in when tailwind is set up
  const rawRepoNames = JSON.parse(fs.readFileSync(activeReposPath));
  return rawRepoNames;
};