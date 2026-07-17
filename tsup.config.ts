import { defineConfig, type Options } from 'tsup';

export default defineConfig((options) => {
  const commonConfig: Options = {
    format: ['cjs', 'esm'],
    sourcemap: true,
  };

  return [
    {
      ...commonConfig,
      entry: {
        index: 'src/index.ts',
      },
      dts: !options.watch,
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