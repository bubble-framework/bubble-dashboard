import { Link } from "react-router-dom";

const RepoList = ({ repos }) => (
  <div className="md:flex-col pt-5 flex  justify-between">
    <p className="py-3 text-xl font-semibold text-bubble-dark-blue">
      <Link to="/">Repositories</Link>
    </p>
    {repos.map(({ repoName }) => (
      <Link
        key={repoName}
        className="pt-1 hover:text-bubble-yellow"
        to={repoName}
      >
        {repoName}
      </Link>
    ))}
  </div>
);

export default RepoList;