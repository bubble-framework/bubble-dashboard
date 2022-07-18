import axios from "axios";

const baseURL = 'http://localhost:3005'

export const getCurrentRepoApps = async (repoName) => {
  const apps = await axios.get(`${baseURL}/${repoName}`);
  return apps.data;
}