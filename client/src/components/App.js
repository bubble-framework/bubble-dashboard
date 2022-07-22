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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(null);

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
                element={<Repo
                  repos={repos}
                  setModalVisible={setModalVisible}
                  setModalMessage={setModalMessage}
                  setModalAction={setModalAction}
                />}
              />
            )}
          </Routes>
        </div>
      </div>
      {modalVisible
        ? <Modal
            message={modalMessage}
            onContinue={modalAction}
            onCancel={() => setModalVisible(false)}
          />
        : ''
      }
    </>
  );
};

export default App;