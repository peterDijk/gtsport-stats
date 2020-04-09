import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import {
  uglify
} from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import {
  generateSW
} from 'rollup-plugin-workbox';
import babel from 'rollup-plugin-babel';
import preact from 'rollup-plugin-preact';
import purgecss from '@fullhuman/postcss-purgecss';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: './src/index.tsx',
  output: {
    file: `dist/app.bundle.js`,
    format: 'iife',
    name: 'bundle',
    sourcemap: true,
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.PUBLIC_URL': JSON.stringify('https://gtsport-stats-pwa-preact-rollup-zustand.netlify.app'),
    }),
    json(),
    postcss({
      plugins: [
        require('tailwindcss'),
        purgecss({
          content: ['./**/*.tsx'],
        }),
      ],
    }),
    // nodeResolve({ preferBuiltins: true, browser: true }),
    preact({
      preferBuiltins: true,
      browser: true,
      usePreactX: true,
      noPropTypes: false,
      noReactIs: false,
      noEnv: false,
      resolvePreactCompat: true,
    }),
    typescript(),
    commonjs(),
    globals(),
    builtins(),
    // babel needed for zustand (es6) which clashes with uglify (doesnt do es6)
    babel({
      presets: ['@babel/env'],
    }),
    generateSW({
      swDest: 'dist/service-worker.js',
      globDirectory: 'dist',
    }),
    htmlTemplate({
      template: './template.html',
      target: 'index.html',
    }),
    copy({
      targets: [{
        src: 'src/images',
        dest: 'dist'
      }],
    }),
    uglify(),
    !production &&
    (serve({
        contentBase: './dist',
        open: true,
        host: 'localhost',
        port: 3000,
      }),
      livereload({
        watch: 'dist',
      })),
  ],
};