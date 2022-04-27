import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer';
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from '@amatlash/vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, './'),
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
  }
});
