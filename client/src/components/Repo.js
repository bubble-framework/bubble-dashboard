import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Branch from './Branch.js';
import { getCurrentRepoApps, destroyRepo, teardownRepo } from '../services/dataService.js';
import { confirmAlert } from 'react-confirm-alert';

import bubbleLogo from '../static/images/random_icon.png';

const Repo = ({ repos }) => {
  const { repoName } = useParams();
  const [apps, setApps] = useState([]);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getApps = async () => {
      const apps = await getCurrentRepoApps(repoName);
      setApps(apps);
    };

    const getStatus = () => {
      if (repos.length === 0) {
        setStatus("destroyed")
      }
      setStatus(repos.find(repo => repo.repoName === repoName).status);
    }

    getStatus();
    getApps();
  }, [repoName])

  const handleDestroyClick = async (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete all preview apps for this repo?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => await destroyRepo(repoName)
        },
        {
          label: 'No'
        }
      ]
    });
  }

  const teardownAttempt = async () => {
    try {
      await teardownRepo(repoName);
      setErrorMessage("")
    } catch (err) {
      setErrorMessage(err.request.response);
      setTimeout(() => {
        setErrorMessage("")
      }, 2000)
    }
  }

  const handleTeardownClick = async (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Lambda deletion may not be ready yet, would you still like to try?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => await teardownAttempt()
        },
        {
          label: 'No'
        }
      ]
    });
  }

  if (!apps && status === "active") return null;

  return (
    <>
      <p>{errorMessage}</p>
      {status === "active" ?
      <>
      <div className="relative container mx-auto bg-blue-100 p-6">
        <div className="flex items-center justify-between">
          <nav className="w-1/4 relative container mx-auto bg-red-300 p-6">
            {/* flex container */}
            <div className="flex-col items-center justify-between">
              <div className="pt 2 bg-red-400">
                <img className="w-20" src={bubbleLogo} alt="Bubble Logo" />
              </div>
              <div className="md:flex-col pt-5 flex bg-red-400 justify-between">
                Repositories
                {repos.map(({ repoName }) => (
                  <a className="pt-1 bg-red-500" href="#">{repoName}</a>
                ))}
              </div>
            </div>
          </nav>

          <div className="relative container mx-auto bg-green-200 p-6 grow">
          <h1>{repoName}</h1>
            <div>
              {apps.map(app => <Branch pullRequest={app} key={app.id} />)}
            </div>
            <button onClick={handleDestroyClick}>Destroy App</button>
          </div>
        </div>
      </div>
      </>
        : <div>
          <p>The bubble for this {repoName} is being destroyed; try bubble teardown to see if lambdas are ready to be deleted.</p>
          <button onClick={handleTeardownClick}>teardown app</button>
        </div>
        }
    </>
  )
}

export default Repo;