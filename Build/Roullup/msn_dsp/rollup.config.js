const fs = require('fs');
const path = require('path');

import copy from 'rollup-plugin-copy';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import es3 from 'rollup-plugin-es3';
import { uglify } from 'rollup-plugin-uglify';

function deleteDist(dir) {
  let statObj = fs.statSync(dir);
  if (statObj.isDirectory()) {
    let dirs = fs.readdirSync(dir);
    for (let i = 0; i < dirs.length; i++) {
      deleteDist(path.join(dir, dirs[i]));
    }
    fs.rmdirSync(dir);
  } else {
    fs.unlinkSync(dir);
  }
}

export default {
  input: './src/main.js',
  external: ['jquery'],

  plugins: [
    deleteDist(path.join(__dirname, './dist')),
    deleteDist(path.join(__dirname, './test')),
    copy({ targets: [{ src: './src/plugins/**/*', dest: 'dist/plugins' }] }),
    nodeResolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    es3({ remove: ['defineProperty', 'freeze'] }),
    uglify()
  ],

  output: [
    {
      file: 'dist/msn_dsp.js',
      format: 'umd',
      globals: {
        jquery: '$',
        MSN_DSP: 'MSN_DSP'
      }
    },
    {
      file: 'test/msn_dsp_test.js',
      format: 'umd',
      globals: {
        jquery: '$',
        MSN_DSP: 'MSN_DSP'
      }
    }
  ]
};
