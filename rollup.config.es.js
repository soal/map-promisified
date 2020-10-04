import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  external: ["mapbox-gl"],
  output: [
    {
      file: "dist/mapPromisify.js",
      name: "map-promisified",
      format: "es"
    },
    {
      file: "dist/mapPromisify.min.js",
      name: "vue-mapbox",
      format: "es",
      plugins: [terser()]
    }
  ],
  plugins: [typescript()]
};
