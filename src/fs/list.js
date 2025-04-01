import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { tryFs } from "./utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const list = async () => {
  const filesDir = join(__dirname, "files");

  await tryFs(async () => {
    const entries = await fs.readdir(filesDir);

    entries.forEach((entry) => {
      console.log(entry);
    });
  });
};

await list();
