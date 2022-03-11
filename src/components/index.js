// export * from "./Avatar";
// export * from "./Vote";
// export * from "./Progress";
// export * from "./Panel";
// export * from "./Replys";
// export * from "./Comment";


const r = require.context("./", true, /.index.js$/);
let components = {};
const excludes = ["./index.js", "./Layout/index.js"];
r.keys().forEach((key) => {
  if (excludes.includes(key)) {
    return;
  }
  const cmp = r(key);
  components = { ...components, ...cmp };
});


module.exports = components
