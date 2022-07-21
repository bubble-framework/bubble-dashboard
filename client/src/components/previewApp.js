const PreviewApp = ({ detail }) => {
  const createDate = new Date(detail.created_at);
  const formattedDate = `${createDate.getMonth() + 1}/${createDate.getDate()}/${String(createDate.getFullYear()).slice(2)}`;

  return (
    <>
      <li>
        {detail.commit_id} {detail.commit_message} {formattedDate}
        <p><a href={detail.url}>Link to App</a></p>
      </li>
    </>
  );
};

export default PreviewApp;
