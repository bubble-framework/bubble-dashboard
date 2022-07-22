import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Branch from './Branch.js';
import Button from './Button.js';

import { getCurrentRepoApps, destroyRepo, teardownRepo } from '../services/dataService.js';
import { confirmAlert } from 'react-confirm-alert';

const Repo = ({ repos, setModalVisible, setModalMessage, setModalAction }) => {
  const { repoName } = useParams();
  const [ apps, setApps ] = useState([]);
  const [ status, setStatus ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");

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
      await teardownRepo(repoName);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.request.response);

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }

    setModalVisible(false);
  }

  const handleTeardownClick = async (e) => {
    e.preventDefault();

    setModalMessage("Lambda functions may not be ready for deletion, but you can still try. Continue?");
    setModalVisible(true);
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
      <p>{errorMessage}</p>

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
        : <div>
          <p>The bubble for this {repoName} is being destroyed; try bubble teardown to see if lambdas are ready to be deleted.</p>

          <button onClick={handleTeardownClick}>teardown app</button>
        </div>
        }
    </>
  );
};

export default Repo;
