import nodePolyfills from 'rollup-plugin-node-polyfills'
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const plugins = [
  nodePolyfills(),
  resolve(),
  typescript( {
    typescript: require( 'typescript' ),
    tsconfigOverride: { compilerOptions: { module: "es2015" } }
  } ),
  babel( { exclude: 'node_modules/**' } ),
  terser()
]

const external = [
  ...Object.keys( pkg.dependencies || {} ),
  ...Object.keys( pkg.devDependencies || {} ),
  ...Object.keys( pkg.peerDependencies || {} ),
]

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'umd'
    },
    plugins,
    external
  },
]
