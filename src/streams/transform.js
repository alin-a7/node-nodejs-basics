import { Transform } from "stream";

const reverseTransform = new Transform({
  transform(chunk, _encoding, callback) {
    const reversed = chunk.toString().split("").reverse().join("");
    callback(null, reversed);
  },
});

const transform = async () => {
  process.stdin
    .pipe(reverseTransform)
    .pipe(process.stdout)
    .on("error", (err) => {
      console.error("Error:", err.message);
    });
};

await transform();
