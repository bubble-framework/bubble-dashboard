import '../App.css';
import { useEffect, useState } from 'react';
import { getApp } from '../services/awsService.js';
import PreviewApp from './previewApp.js';

const App = (repo) => {
  repo = 'color-app'
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getApps = async () => {
      const apps = await getApp(repo);
      setApps(apps);
    };
    getApps();
  }, [repo])

  return (
    <div>
      <h1>{repo}</h1>
      <div>
        <ul>
          {apps.forEach(app => <PreviewApp detail={app} />)}
        </ul>
      </div>
    </div>
  );
}

export default App;
