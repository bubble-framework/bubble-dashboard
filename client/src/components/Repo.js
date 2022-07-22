import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Branch from './Branch.js';
import Button from './Button.js';

import { getCurrentRepoApps, destroyRepo, teardownRepo } from '../services/dataService.js';
import { confirmAlert } from 'react-confirm-alert';

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

  const handleDestroyClick = async (e) => {
    e.preventDefault();
    setModalVisible(true);

    setModalMessage("This action will teardown all infrastructure associated with preview apps on this branch. Are you sure you want to continue?");
    setModalVisible(true);
    setModalAction(async () => await destroyRepo(repoName));
    setModalVisible(false);

    // confirmAlert({
    //   title: 'Confirm to submit',
    //   message: 'Are you sure you want to delete all preview apps for this repo?',
    //   buttons: [
    //     {
    //       label: 'Yes',
    //       onClick: async () => await destroyRepo(repoName),
    //     },
    //     {
    //       label: 'No',
    //     }
    //   ]
    // });
  }

  const teardownAttempt = async () => {
    try {
      const successMessage = await teardownRepo(repoName);
      console.log(successMessage);

      setMessageColor(POSITIVE_MESSAGE_COLOR);
      setMessage(successMessage);
    } catch (err) {
      setMessageColor(NEGATIVE_MESSAGE_COLOR);
      setMessage(err);

      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }

  const handleTeardownClick = async (e) => {
    e.preventDefault();

    setModalAction(async () => await teardownAttempt());

    // confirmAlert({
    //   title: 'Confirm to submit',
    //   message: 'Lambda deletion may not be ready yet, would you still like to try?',
    //   buttons: [
    //     {
    //       label: 'Yes',
    //       onClick: async () => await teardownAttempt(),
    //     },
    //     {
    //       label: 'No',
    //     }
    //   ]
    // });
  }

  if (!apps && status === "active") return null;

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
              text="Destroy App"
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
          <div className="relative container mx-auto rounded-lg border-4 border-indigo-300 p-10 grow mt-9">
            <div className="flex-col">
              <p className="mb-6">
                The bubble for the repository <span className="font-bold">{repoName}</span> is being destroyed. Try tearing down to see if Lambdas are ready to be deleted.
              </p>
              <div className="flex justify-center">
                <Button
                  text="Teardown"
                  color="red"
                  onButtonClick={handleTeardownClick}
                />
              </div>
            </div>
        </div>
        </div>
        }
    </>
  );
};

export default Repo;
