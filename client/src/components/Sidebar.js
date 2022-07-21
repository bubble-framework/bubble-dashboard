import RepoList from './RepoList.js';
import bubbleLogo from '../static/images/noun_project_bubbles.png';

const Sidebar = ({ repos }) => {
  return (
    <nav className="w-1/4 relative container mx-auto p-6">
      <div className="flex-col items-center justify-between">
        <div className="pt-2">
          <img className="w-12 pt-5" src={bubbleLogo} alt="Bubble Logo" />
        </div>
        <RepoList repos={repos} />
      </div>
    </nav>
  );
}

export default Sidebar;