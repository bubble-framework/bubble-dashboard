import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const PreviewApp = ({ detail }) => {
  const createDate = new Date(detail.created_at);
  const formattedDate = `${createDate.getMonth() + 1}/${createDate.getDate()}/${String(createDate.getFullYear()).slice(2)}`;

  return (
    <>
      <section className="w-full h-5/6 flex items-start justify-between">
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
            <li className="rounded-full bg-gradient-to-r from-indigo-400 to-blue-600 text-sm text-white py-1 px-3">
              {detail.commit_id}
            </li>
            <li className="py-1">
              {detail.commit_message}
            </li>
            <li className="py-1">
              {formattedDate}
            </li>
          </ul>
        </div>
        <a className="p-2" href={detail.url}>
          {<FontAwesomeIcon icon={faUpRightFromSquare} />}
        </a>
      </section>
    </>
  )
}

export default PreviewApp;