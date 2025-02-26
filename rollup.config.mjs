import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './src/index.tsx', // <-- Ensure entry file supports .tsx
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
      }
    ],
    plugins: [
      external({
        includeDependencies: true
      }),
      resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }), // <-- Ensure it resolves .tsx files
      commonjs({
        include: /node_modules/,
        requireReturnsDefault: "auto", // ✅ Fix some CJS imports
      }),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // <-- Ensure Babel processes .tsx files
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react'], // <-- Ensure React preset is included
      }),
      terser(),
    ],
    external: ['react', 'react-dom'], // <-- Don't bundle React
  }
];
