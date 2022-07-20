import '../App.css';
import { useEffect, useState } from 'react';
import { getRepos } from '../services/dataService.js';

import Repo from './Repo.js';
import Header from './Header.js';
import NavBar from './NavBar.js';
import Content from './Content.js';

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
      <div className="App h-screen overflow-y-scroll scrollbar-hide overflow-x-hidden px-6">
        <Header />
        <div className="flex items-start space-x-2 justify-start w-full">
          <NavBar />
          <Content />
        </div>
      </div>
      <nav>
        <ul>
          {repos.map(repo => <Link key={repo.repoName} to={`/${repo.repoName}`}>{repo.repoName}</Link>)}
        </ul>
      </nav>
      <Routes>
        {repos.map(repo => <Route path="/:repoName" element={<Repo repos={repos} />} />)}
      </Routes>
    </div>
  );
}

export default App;
