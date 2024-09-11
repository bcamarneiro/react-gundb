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
});