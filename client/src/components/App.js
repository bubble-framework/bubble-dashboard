import '../App.css';
import { useEffect, useState } from 'react';
import { getCurrentRepoApps } from '../services/awsService.js';
import Branch from './Branch.js';

const App = (repo) => {
  repo = 'color-app'
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getApps = async () => {
      const apps = await getCurrentRepoApps(repo);
      setApps(apps);
    };
    getApps();
  }, [repo])

  return (
    <div>
      <h1>{repo}</h1>
      <div>
        {apps.map(app => <Branch pullRequest={app} key={app.id} />)}
      </div>
    </div>
  );
}

export default App;
