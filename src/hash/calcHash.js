import { createHash } from "crypto";
import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const calculateHash = async () => {
  const filePath = join(__dirname, "files", "fileToCalculateHashFor.txt");
  const hash = createHash("sha256");
  const stream = createReadStream(filePath);

  stream.on("data", (chunk) => {
    hash.update(chunk);
  });

  stream.on("end", () => {
    const hexHash = hash.digest("hex");
    console.log(hexHash);
  });

  stream.on("error", (err) => {
    console.error(err.message);
  });
};

await calculateHash();
