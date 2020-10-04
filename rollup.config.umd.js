import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  external: ["mapbox-gl"],
  output: [
    {
      file: "dist/mapPromisify.umd.js",
      name: "map-promisified",
      format: "umd"
    },
    {
      file: "dist/mapPromisify.umd.min.js",
      name: "vue-mapbox",
      format: "umd",
      plugins: [terser()]
    },
  ],
  plugins: [
    typescript(),
  ],
};
