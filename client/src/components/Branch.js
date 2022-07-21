import PreviewApp from './PreviewApp.js';

const Branch = ({ pullRequest }) => {
  return (
    <div>
      <h2>{pullRequest.name} #{pullRequest.id}</h2>

      <ul>
        {pullRequest.commits.map(app =>
          <PreviewApp detail={app} key={app.commit_id} />
        )}
      </ul>
    </div>
  );
};

export default Branch;
