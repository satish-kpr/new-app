const { spawn } = require("child_process");
const fs = require("fs");

function startProgram(command, args, logFilePath) {
  // Open a writable stream to the log file
  const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

  // Spawn the child process with stdout and stderr redirected to the log file
  const childProcess = spawn(command, args, {
    detached: true,
    stdio: ["ignore", logStream, logStream],
  });

  // Close the log stream when the child process exits
  childProcess.on("exit", (code, signal) => {
    logStream.end();
    console.log(
      `Child process ${command} (PID: ${childProcess.pid}) exited with code ${code} and signal ${signal}.`
    );
  });

  // Log the child process status
  console.log(`Child process ${command} (PID: ${childProcess.pid}) started.`);
}

// Replace 'your-app-command' and 'your-app-arguments' with the actual command and arguments of the application you want to run.
const command = "your-app-command";
const args = ["your-app-arguments"];

// Replace 'path/to/your-log-file.log' with the desired path for the log file.
const logFilePath = "path/to/your-log-file.log";

// Start the application and capture its entire logs in the log file
startProgram(command, args, logFilePath);
