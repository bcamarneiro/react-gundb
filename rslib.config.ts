import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

const shared = {
  dts: {
    bundle: false,
  },
};

export default defineConfig({
  lib: [
    {
      ...shared,
      format: 'esm',
      output: {
        distPath: {
          root: './dist',
        },
      },
    }
  ],
  plugins: [pluginReact()],
  tools: {
    webpackChain: (chain, { CHAIN_ID }) => {
      chain.module
        .rule('gun')
        .test(/gun\.js$/)
        .use('ignore-loader')
        .loader('ignore-loader');

      chain.module
        .rule('sea')
        .test(/sea\.js$/)
        .use('ignore-loader')
        .loader('ignore-loader');
    },
    rspack: {
      module: {
        noParse: [/node_modules\/gun/, /gun\.js$/]
      },
      externals: {
        gun: 'Gun',
      },
    }
  }
});