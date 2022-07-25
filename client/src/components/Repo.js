import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BasicDialog from './BasicDialog.js';
import TeardownDialog from './TeardownDialog.js';
import Branch from './Branch.js';
import Button from './Button.js';

import { getCurrentRepoApps, destroyRepo, teardownRepo } from '../services/dataService.js';

const Repo = ({ repos, setModalVisible, setModalMessage, setModalAction }) => {
  const NEUTRAL_MESSAGE_COLOR = "zinc";
  const POSITIVE_MESSAGE_COLOR = "green";
  const NEGATIVE_MESSAGE_COLOR = "red";
  
  const { repoName } = useParams();
  const [ apps, setApps ] = useState([]);
  const [ status, setStatus ] = useState("");

  const [ message, setMessage ] = useState("");
  const [ messageColor, setMessageColor ] = useState(NEUTRAL_MESSAGE_COLOR);

  useEffect(() => {
    const getApps = async () => {
      const apps = await getCurrentRepoApps(repoName);
      setApps(apps);
    };

    const getStatus = () => {
      if (repos.length === 0) {
        setStatus("destroyed");
      }

      setStatus(repos.find(repo => repo.repoName === repoName).status);
    }

    getStatus();
    getApps();
  }, [repoName]);

  const handleDestroyClick = async () => {
    setModalMessage("This action will teardown all infrastructure associated with preview apps on this branch. Are you sure you want to continue?");
    setModalVisible(true);

    const destroy = () => {
      return async () => {
        await destroyRepo(repoName);
        setModalVisible(false);
      } 
    }

    setModalAction(destroy);
  }

  const teardownAttempt = async () => {
    try {
      const successMessage = await teardownRepo(repoName);
      console.log(successMessage);

      setMessageColor(POSITIVE_MESSAGE_COLOR);
      setMessage(successMessage);
    } catch (err) {
      setMessageColor(NEGATIVE_MESSAGE_COLOR);
      setMessage(err.message);

      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }

  const handleTeardownClick = async (e) => {
    e.preventDefault();
    await teardownAttempt();
  }

  if (!apps && status === "active") return (
    <BasicDialog message="Looks like there are no bubbles in this bath! Next time you open a pull request in this repository, check back to see the deployed preview app." />
  );

  return (
    <>
      {status === "active" ?
      <>
        <div className="relative container mx-auto rounded-lg bg-gradient-to-r from-red-100 to-indigo-200 p-10 grow">
          <h1 className="text-xl font-bold">{repoName}</h1>
          <div>
            {apps.map(app =>
              <Branch pullRequest={app} key={app.id} />
            )}
          </div>
          <div className="flex justify-end px-6 py-3">
            <Button
              text="Destroy"
              color="red"
              onButtonClick={handleDestroyClick}
            />
          </div>
        </div>
      </>
        :
        <div className="flex-col w-full">
          {message
            ? <p className={`relative container mx-auto rounded-lg border-4 border-${messageColor}-300 p-5 grow mt-4 text-sm`}>
              {message}
            </p>
            : ''
          }
        <TeardownDialog
          repoName={repoName}
          handleButtonClick={handleTeardownClick}
        />
        </div>
        }
    </>
  );
};

export default Repo;
