import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const write = async () => {
  const filePath = join(__dirname, "files", "fileToWrite.txt");
  const writeStream = createWriteStream(filePath);

  process.stdin.pipe(writeStream).on("error", (err) => {
    console.error("Error:", err.message);
  });
};

await write();
