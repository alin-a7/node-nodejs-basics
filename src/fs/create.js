import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { tryFs } from "./utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const create = async () => {
  const filePath = join(__dirname, "files", "fresh.txt");
  const content = "I am fresh and young";

  await tryFs(async () => {
    await writeFile(filePath, content, { flag: "wx" });
    console.log("File created successfully");
  });
};

await create();
