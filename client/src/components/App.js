import '../App.css';
import { useEffect, useState } from 'react';
import { getRepos } from '../services/dataService.js';

import Repo from './Repo.js';
import Sidebar from './Sidebar.js';

import {
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const getRepoNames = async () => {
      const names = await getRepos();
      setRepos(names);
    }

    getRepoNames();
  }, [])

  return (
    <>
      <div className="relative container mx-auto p-6">
        <div className="flex items-start justify-between z-0">
          <Sidebar repos={repos} />
          <Routes>
            {repos.map((repo) =>
              <Route
                path="/:repoName"
                key={repo.repoName}
                element={<Repo repos={repos}/>}
              />
            )}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
