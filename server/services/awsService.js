//pull all preview apps data related to color app
import { fromIni } from "@aws-sdk/credential-providers";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

export const getApps = async (repoName) => {
  const client = new DynamoDBClient({
    region: "us-east-1", credentials: fromIni({ profile: `${repoName}-bubble-user` })
  });
  const command = new ScanCommand({ TableName: `${repoName}-PreviewApps` });
  try {
    const results = await client.send(command);
    return parseTable(results.Items);
  } catch (err) {
    console.error(err);
  }
};

const parseTable = async (table) => {
  const parsed = [];
  table.forEach(pullRequest => {
    if (pullRequest.IsActive.BOOL) {
      const PRInfo = {};
      PRInfo.id = pullRequest.PullRequestId.N;
      PRInfo.name = pullRequest.PRName.S;
      PRInfo.commits = [];

      pullRequest.Commits.L.forEach(commit => {
        const detail = {};
        detail.commitId = commit.M.CommitId.S.slice(0, 7);
        detail.commitMessage = commit.M.CommitMessageHeader.S;
        detail.createdAt = commit.M.CreatedAt.S;
        detail.logUrl = commit.M.BuildLogURL.S;
        detail.url = 'https://' + commit.M.CloudfrontSubdomain.S + '.cloudfront.net';
        PRInfo.commits.push(detail);
      })

      parsed.push(PRInfo);
    }
  })

  return parsed;
};
