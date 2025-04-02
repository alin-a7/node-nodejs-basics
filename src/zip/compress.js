import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const compress = async () => {
  const sourceFile = join(__dirname, "files", "fileToCompress.txt");
  const archiveFile = join(__dirname, "files", "archive.gz");

  try {
    await pipeline(
      createReadStream(sourceFile),
      createGzip(),
      createWriteStream(archiveFile)
    );
    console.log("File compressed successfully");
  } catch (err) {
    console.error("Compression error:", err.message);
  }
};

await compress();
