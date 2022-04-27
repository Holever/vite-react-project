import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer';
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from '@amatlash/vite-plugin-stylelint';
import svgr from 'vite-plugin-svgr';
import viteImagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, './'),
  base: '/',
  plugins: [
    react({
      babel: {
        plugins: [
          // 适配 styled-component
          'babel-plugin-styled-components',
          // 适配 emotion
          '@emotion/babel-plugin'
        ]
        // 注意: 对于 emotion，需要单独加上这个配置
        // 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法
        // jsxImportSource: "@emotion/react"
      }
    }),
    viteEslint(),
    viteStylelint({
      // 对某些文件排除检查
      exclude: /windicss|node_modules/
    }),
    svgr(),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ],
  css: {
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: '[name]__[local]__[hash:base64:5]'
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  json: {
    stringify: true // JSON 的内容解析为export default JSON.parse("xxx")，这样会失去按名导出的能力，不过在 JSON 数据量比较大的时候，可以优化解析性能。
  },
  assetsInclude: ['.gltf'], // 如果你的项目中还存在其它格式的静态资源，你可以通过assetsInclude配置让 Vite 来支持加载
  optimizeDeps: {
    // 为一个字符串数组
    entries: ['./src/App.tsx'],
    include: ['react'],
    exclude: ['@loadable/component']
  }
});
