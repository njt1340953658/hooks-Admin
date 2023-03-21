import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'

export default defineConfig((mode: ConfigEnv): UserConfig => {
  const viteEnv = loadEnv(mode.mode, process.cwd())

  const { VITE_PUBLIC_PATH } = viteEnv

  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      https: false,
      host: true, // host: "0.0.0.0"
      port: 3000,
      open: false,
      cors: true,
      strictPort: false,
      hmr: true,
      fs: {
        strict: false
      },
      proxy: {
        '/api': {
          target: 'https://mock.mengxuegu.com/mock/62abda3212c1416424630a45', // easymock
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        format: {
          comments: false
        }
      },
      chunkSizeWarningLimit: 2000,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks(id: any) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    plugins: [
      react(),
      eslintPlugin(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      })
    ]
  }
})
