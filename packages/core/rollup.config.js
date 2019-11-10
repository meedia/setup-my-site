import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";

const input = "src/index.ts";

export default [
  // browser-friendly UMD build
  {
    input,
    output: {
      name: "howLongUntilLunch",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      resolve(), // so Rollup can find packages in node_modules
      typescript({
        tsconfig: "./tsconfig.prod.json",
      }),
      commonjs(), // so Rollup can convert packages in node_modules to an ES module
      babel({
        extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
        exclude: "node_modules/**",
      }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input,
    // TODO: auto-external
    external: [],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];
