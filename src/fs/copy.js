import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { tryFs } from "./utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const copy = async () => {
  const srcDir = join(__dirname, "files");
  const destDir = join(__dirname, "files_copy");

  await tryFs(async () => {
    await fs.mkdir(destDir);
    await copyDirectory(srcDir, destDir);
    console.log("Directory copied successfully");
  });
};

const copyDirectory = async (src, dest) => {
  const entries = await fs.readdir(src, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);

      if (entry.isDirectory()) {
        await fs.mkdir(destPath);
        return copyDirectory(srcPath, destPath);
      } else {
        return fs.copyFile(srcPath, destPath);
      }
    })
  );
};

await copy();
