import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (...args) => {
    const child = spawn(
      "node",
      [path.join(__dirname, "files", "script.js"), ...args],
      { stdio: ["pipe", "pipe", "pipe", "ipc"] }
    );

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on("error", (err) => {
    console.error("Child process error:", err);
  });

  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Child process exited with code ${code}`);
    }
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess("someArgument1", "someArgument2");
