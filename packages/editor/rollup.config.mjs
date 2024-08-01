import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';

import pkg from './package.json' assert { type: "json" };;

export default [
  {
    input: 'src/index.tsx', // Adjust this to your entry file
    output: [
      {
        file: pkg.main, // CommonJS output
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module, // ES module output
        format: 'esm',
        sourcemap: true,
      }
    ],
    plugins: [
      peerDepsExternal(), // Automatically externalize peerDependencies in a rollup bundle
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        browser: true

      }),
      commonjs({
        include: 'node_modules/**'
      }),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      babel({
        exclude: 'node_modules/**',
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ],
        babelHelpers: 'bundled'
      }),
      terser(),
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  }
];
