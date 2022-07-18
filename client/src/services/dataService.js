import axios from "axios";

const baseURL = 'http://localhost:3005'

export const getCurrentRepoApps = async (repoName) => {
  try {
    const apps = await axios.get(`${baseURL}/${repoName}`);
    return apps.data;
  } catch {
    return [];
  }
}

export const getRepos = async () => {
  const repos = await axios.get(`${baseURL}/all`);
  return repos.data;
}