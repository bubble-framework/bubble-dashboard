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
  const WAIT_TO_POPULATE_MSG = "One sec! Grabbing all your bubbles!";

  const { repoName } = useParams();
  const [ apps, setApps ] = useState([]);
  const [ status, setStatus ] = useState("");

  const [ message, setMessage ] = useState("");
  const [ messageColor, setMessageColor ] = useState(NEUTRAL_MESSAGE_COLOR);

  useEffect(() => {
    const getApps = async () => {
      setMessage(WAIT_TO_POPULATE_MSG);
      const apps = await getCurrentRepoApps(repoName);
      setMessage('');
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
        setMessage("We'll get to work emptying this bath!");

        setTimeout(() => setMessage(''), 5000);
      }
    }

    setModalAction(destroy);
  }

  const teardownAttempt = async () => {
    try {
      const successMessage = await teardownRepo(repoName);

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

  return (
    <>
      {status === "active" ?
        <>
        {message
          ?
          <BasicDialog message={message} />
          :
          <>
            {apps.length > 0 && message !== WAIT_TO_POPULATE_MSG
              ?
              <div className="relative container mx-auto rounded-lg bg-gradient-to-r from-bubble-gradient-dark via-bubble-gradient-mid to-bubble-gradient-dark p-10 grow">
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
              :
              <BasicDialog message="Looks like there are no bubbles in this bath! Next time you open a pull request in this repository, check back to see the deployed preview app." />
            }
          </>
        }
        </>
        :
        <div className="flex-col w-full">
          {message && message !== WAIT_TO_POPULATE_MSG
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
