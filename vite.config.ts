import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'
import fs from 'fs'
import path from 'path'

// Plugin to restructure output for clean URLs
function cleanUrlsPlugin() {
  return {
    name: 'clean-urls',
    closeBundle() {
      const distPath = resolve(__dirname, 'dist')

      // Pages that should be in directories
      const pages = ['about', 'services', 'contact']

      pages.forEach(page => {
        const htmlFile = path.join(distPath, `${page}.html`)
        const dirPath = path.join(distPath, page)
        const indexFile = path.join(dirPath, 'index.html')

        if (fs.existsSync(htmlFile)) {
          // Create directory
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true })
          }

          // Move and rename file
          fs.renameSync(htmlFile, indexFile)

          // Update links in the moved file
          let content = fs.readFileSync(indexFile, 'utf-8')
          content = content.replace(/href="\/about\.html"/g, 'href="/about/"')
          content = content.replace(/href="\/services\.html"/g, 'href="/services/"')
          content = content.replace(/href="\/contact\.html"/g, 'href="/contact/"')
          fs.writeFileSync(indexFile, content)
        }
      })

      // Update links in index.html and 404.html
      const filesToUpdate = ['index.html', '404.html']
      filesToUpdate.forEach(file => {
        const filePath = path.join(distPath, file)
        if (fs.existsSync(filePath)) {
          let content = fs.readFileSync(filePath, 'utf-8')
          content = content.replace(/href="\/about\.html"/g, 'href="/about/"')
          content = content.replace(/href="\/services\.html"/g, 'href="/services/"')
          content = content.replace(/href="\/contact\.html"/g, 'href="/contact/"')
          fs.writeFileSync(filePath, content)
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    cleanUrlsPlugin()
  ],
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about.html'),
        services: resolve(__dirname, 'src/services.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        '404': resolve(__dirname, 'src/404.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})