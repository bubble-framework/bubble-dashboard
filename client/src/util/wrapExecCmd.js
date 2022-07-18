import { exec } from "child_process";

const wrapExecCmd = (cmd, errMsg) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(errMsg || error);
        return;
      }

      if (stderr) {
        reject(errMsg || stderr);
        return;
      }

      resolve(stdout);
    });
  });
}

export default wrapExecCmd;