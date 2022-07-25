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

export const destroyRepo = async (repoName) => {
  const response = await axios.post(`${baseURL}/${repoName}/destroy`);
  return response.status;
}

export const teardownRepo = async (repoName) => {
  try {
    const response = await axios.post(`${baseURL}/${repoName}/teardown`);

    if (response.status !== 200) {
      throw new Error(response.data);
    }
    
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error(e.response.data);
  }
}