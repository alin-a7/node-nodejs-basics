import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
  const compressedFile = join(__dirname, "files", "archive.gz");
  const decompressedFile = join(__dirname, "files", "fileToCompress.txt");

  try {
    await pipeline(
      createReadStream(compressedFile),
      createGunzip(),
      createWriteStream(decompressedFile)
    );
    console.log("File decompressed successfully");
  } catch (err) {
    console.error("Decompression error:", err.message);
  }
};

await decompress();
