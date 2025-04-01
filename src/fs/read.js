import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { tryFs } from "./utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const filePath = join(__dirname, "files", "fileToRead.txt");

  await tryFs(async () => {
    const content = await readFile(filePath, { encoding: "utf8" });
    console.log(content);
  });
};

await read();