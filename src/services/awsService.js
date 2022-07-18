import wrapExecCmd from '../util/wrapExecCmd';

//pull all preview apps data related to color app
export const getAllApps = async (repoName) => {
  try {
    const apps = await wrapExecCmd(`aws dynamodb scan --table-name ${repoName}-PreviewApps --profile ${repoName}-bubble-user`);
    const parsed = [];
    apps.forEach(pullRequest => {
      if (pullRequest.IsActive.BOOL) {
        pullRequest.Commits.L.forEach(commit => {
          const detail = {};
          detail.pull_request_id = pullRequest.PullRequestId.N;
          detail.pull_request_name = pullRequest.PRName.S;
          detail.commit_id = commit.M.CommitId.S.slice(0, 7);
          detail.commit_message = commit.M.CommitMessageHeader.S;
          detail.created_at = commit.M.CreatedAt.S;
          detail.url = 'https://' + commit.M.CloudfrontSubdomain.S + '.cloudfront.net';
          parsed.push(detail);
        })
      }
    })
    return parsed;
  } catch (err) {
    console.log('The database does not exist for this repo yet; Please run init command first;');
  };
};