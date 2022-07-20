import '../App.css';
import { useEffect, useState } from 'react';
import { getRepos } from '../services/dataService.js';
import Repo from './Repo.js';
import {
  Routes,
  Route,
  Link,
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
    <div>

      <nav>
        <ul>
          {repos.map(repo =>
            <>
              <Link key={repo.repoName} to={`/${repo.repoName}`}>
                {repo.repoName}
              </Link>

              {' — '}
            </>
          )}
        </ul>
      </nav>

      <Routes>
        {repos.map(repo =>
          <Route
            key={repo.repoName}
            path="/:repoName"
            element={<Repo repos={repos} />}
          />
        )}
      </Routes>
    </div>
  );
};

export default App;
