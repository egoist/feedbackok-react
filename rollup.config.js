import babel from '@rollup/plugin-babel'
import esbuild from 'rollup-plugin-esbuild'
import dtsPlugin from 'rollup-plugin-dts'
import buble from 'rollup-plugin-buble'

/**
 * @returns {import('rollup').RollupOptions}
 */
const getConfig = ({ dts } = {}) => {
  return {
    input: ['src/index.tsx'],
    output: dts
      ? {
          format: 'esm',
          file: 'dist/index.d.ts',
        }
      : [
          {
            format: 'cjs',
            file: 'dist/index.js',
          },
          {
            format: 'esm',
            file: 'dist/index.mjs',
          },
        ],
    plugins: [
      !dts &&
        esbuild({
          target: 'es2018',
          define: {
            'process.env.NODE_ENV': '"production"',
          },
        }),
      !dts &&
        babel({
          configFile: false,
          babelHelpers: 'inline',
          extensions: ['.js', '.mjs', '.ts', '.tsx'],
          plugins: [['emotion', { sourceMap: false }]],
        }),
      !dts &&
        buble({
          objectAssign: 'Object.assign',
        }),
      dts && dtsPlugin(),
    ].filter(Boolean),
  }
}

export default [getConfig(), getConfig({ dts: true })]
