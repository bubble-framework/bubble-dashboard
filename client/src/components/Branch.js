import PreviewApp from './PreviewApp.js';

const Branch = ({ pullRequest }) => {
  return (
    <div className="relative container mx-auto bg-white rounded-lg px-6 py-8 my-4">
      <h2 className="text-lg font-semibold pb-3">
        {pullRequest.name} #{pullRequest.id}
      </h2>
      <ul className="flex items-start justify-between">
        {pullRequest.commits.map(app => <PreviewApp detail={app} key={app.commit_id} />)}
      </ul>
    </div>
  )
}

export default Branch;