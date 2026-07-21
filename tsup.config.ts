// SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
// SPDX-License-Identifier: ISC

import { defineConfig, type Options } from 'tsup';

export default defineConfig((options) => {
  const commonConfig: Options = {
    format: ['cjs', 'esm'],
    dts: false,
    sourcemap: true,
  };

  return [
    {
      ...commonConfig,
      entry: {
        index: 'src/index.ts',
      },
      clean: true,
    },
    {
      ...commonConfig,
      entry: {
        'index.min': 'src/index.ts',
      },
      format: ['esm'],
      minify: true,
      dts: false,
    }
  ] as Options[];
});
