import { Link } from "react-router-dom";

const RepoList = ({ repos }) => (
  <div className="md:flex-col pt-5 flex  justify-between">
    <p className="py-3 text-xl font-semibold text-indigo-500">
      <Link to="/">Repositories</Link>
    </p>
    {repos.map(({ repoName }) => (
      <Link className="pt-1" to={repoName}>{repoName}</Link>
    ))}
  </div>
);

export default RepoList;