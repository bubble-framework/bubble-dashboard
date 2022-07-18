import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Branch from './Branch.js';
import { getCurrentRepoApps } from '../services/dataService.js';

const Repo = () => {
  let { repoName } = useParams();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getApps = async () => {
      const apps = await getCurrentRepoApps(repoName);
      console.log(apps);
      setApps(apps);
    };
    getApps();
  }, [repoName])

  return (
    <div>
      <h1>{repoName}</h1>
      <div>
        {apps.map(app => <Branch pullRequest={app} key={app.id} />)}
      </div>
    </div>
  )
}

export default Repo;