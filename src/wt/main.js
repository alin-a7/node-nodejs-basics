import { Worker } from "worker_threads";
import { cpus } from "os";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
  const cpuCount = cpus().length;
  const startNumber = 10;
  const workers = [];
  const results = new Array(cpuCount);

  for (let i = 0; i < cpuCount; i++) {
    const worker = new Worker(path.join(__dirname, "worker.js"));
    const numberToSend = startNumber + i;

    workers.push(
      new Promise((resolve) => {
        worker.postMessage(numberToSend);

        worker.on("message", (result) => {
          results[i] = {
            status: "resolved",
            data: result,
            number: numberToSend,
          };
          resolve();
        });

        worker.on("error", (err) => {
          console.error(`Worker error for number ${numberToSend}:`, err);
          results[i] = {
            status: "error",
            data: null,
          };
          resolve();
        });
      })
    );
  }

  await Promise.all(workers);

  console.log(results);
};

await performCalculations();
