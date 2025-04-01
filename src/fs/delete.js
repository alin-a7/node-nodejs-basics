import { unlink } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { tryFs } from "./utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const remove = async () => {
  const filePath = join(__dirname, "files", "fileToRemove.txt");

  await tryFs(async () => {
    await unlink(filePath);
    console.log("File deleted successfully");
  });
};

await remove();
