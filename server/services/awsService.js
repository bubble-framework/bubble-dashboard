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
};