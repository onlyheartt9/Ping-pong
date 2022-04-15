import { requireComponent } from "@/utils";

const r = require.context("./", true, /.js$/);

module.exports = requireComponent(r, {
  excludes: ["./index.js"],
  //callback,
});
