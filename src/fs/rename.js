import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { tryFs } from "./utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const rename = async () => {
  const oldPath = join(__dirname, "files", "wrongFilename.txt");
  const newPath = join(__dirname, "files", "properFilename.md");

  await tryFs(async () => {
    await fs.rename(oldPath, newPath);
    console.log("File renamed successfully");
  });
};

await rename();
