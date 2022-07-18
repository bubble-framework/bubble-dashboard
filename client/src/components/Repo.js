import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Branch from './Branch.js';
import { getCurrentRepoApps } from '../services/dataService.js';

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

  if (!apps && status === "active") return null;

  return (
    <>
      {status === "active" ?
        <div>
          <h1>{repoName}</h1>
          <div>
            {apps.map(app => <Branch pullRequest={app} key={app.id} />)}
          </div>
        </div>
        : <div>The bubble for this {repoName} is being destroyed; try bubble teardown to see if lambdas are ready to be deleted.</div>
      }
    </>
  )
}

export default Repo;