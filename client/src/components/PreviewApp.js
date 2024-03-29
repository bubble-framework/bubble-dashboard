import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

const PreviewApp = ({ detail }) => {
  const createDate = new Date(detail.createdAt);
  const formattedDate = `${createDate.getMonth() + 1}/${createDate.getDate()}/${String(createDate.getFullYear()).slice(2)}`;

  return (
    <>
      <section className="w-full h-5/6 flex items-start justify-between pb-4">
        <div className="w-5/6 p-2">
          <ul className="flex items-start justify-between">
            <li className="py-1 text-xs">
              commit id
            </li>
            <li className="py-1 text-xs">
              commit message
            </li>
            <li className="py-1 text-xs">
              commit date
            </li>
          </ul>
          <ul className="flex items-start justify-between">
            <li className="rounded-full bg-bubble-dark-blue text-sm text-white py-1 px-3">
              {detail.commitId}
            </li>
            <li className="py-1">
              {detail.commitMessage}
            </li>
            <li className="py-1">
              {formattedDate}
            </li>
          </ul>
        </div>
        <a className="p-2 self-center" href={detail.url}>
          {<FontAwesomeIcon title="View Preview App" icon={faUpRightFromSquare} />}
        </a>
        <a className="p-2 self-center" href={detail.logUrl}>
          {<FontAwesomeIcon title="View Build Logs" icon={faFileLines} />}
        </a>
      </section>
    </>
  )
}

export default PreviewApp;