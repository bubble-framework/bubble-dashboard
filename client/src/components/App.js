import '../App.css';
import { useEffect, useState } from 'react';
import { getRepos } from '../services/dataService.js';

import Repo from './Repo.js';
import Sidebar from './Sidebar.js';
import Modal from './Modal.js'


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
        <div className="flex items-start justify-between">
          <Sidebar repos={repos} />
          <Routes>
            {repos.map((repo) => 
              <Route
                key={repo.repoName}
                path="/:repoName"
                element={<Repo repos={repos} />}
              />
            )}
          </Routes>
        </div>
      </div>
      <Modal />
    </>
  );
};

export default App;
