export const tryFs = async (fsOperation) => {
  try {
    await fsOperation();
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EEXIST") {
      throw new Error("FS operation failed");
    }
  }
};
