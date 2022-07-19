import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Branch from './Branch.js';
import { getCurrentRepoApps, destroyRepo } from '../services/dataService.js';
import { confirmAlert } from 'react-confirm-alert';

const Repo = ({ repos }) => {
  const { repoName } = useParams();
  const [apps, setApps] = useState([]);
  const [status, setStatus] = useState("");

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

  if (!apps && status === "active") return null;

  return (
    <>
      {status === "active" ?
        <div>
          <h1>{repoName}</h1>
          <div>
            {apps.map(app => <Branch pullRequest={app} key={app.id} />)}
          </div>
          <button onClick={handleDestroyClick}>Destroy App</button>
        </div>
        : <div>The bubble for this {repoName} is being destroyed; try bubble teardown to see if lambdas are ready to be deleted.</div>
      }
    </>
  )
}

export default Repo;