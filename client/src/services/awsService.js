//pull all preview apps data related to color app
import { fromIni } from "@aws-sdk/credential-providers";
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

export const getApp = async (repoName) => {
  const client = new DynamoDBClient({
    region: "us-east-1", credentials: fromIni({ profile: `${repoName}-bubble-user` })
  });
  const command = new ListTablesCommand({});
  try {
    const results = await client.send(command);
    console.log(results.TableNames.join("\n"));
  } catch (err) {
    console.error(err);
  }
};

// export const getAllApps = async (repoName) => {
//   try {
//     const apps = JSON.parse(await wrapExecCmd(`aws dynamodb scan --table-name ${repoName}-PreviewApps --profile ${repoName}-bubble-user`));
//     const parsed = [];
//     apps.forEach(pullRequest => {
//       if (pullRequest.IsActive.BOOL) {
//         pullRequest.Commits.L.forEach(commit => {
//           const detail = {};
//           detail.pull_request_id = pullRequest.PullRequestId.N;
//           detail.pull_request_name = pullRequest.PRName.S;
//           detail.commit_id = commit.M.CommitId.S.slice(0, 7);
//           detail.commit_message = commit.M.CommitMessageHeader.S;
//           detail.created_at = commit.M.CreatedAt.S;
//           detail.url = 'https://' + commit.M.CloudfrontSubdomain.S + '.cloudfront.net';
//           parsed.push(detail);
//         })
//       }
//     })
//     return parsed;
//   } catch (err) {
//     console.log('The database does not exist for this repo yet; Please run init command first;');
//   };
// };