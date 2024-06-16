import ssg from "@hono/vite-ssg";
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    ssg(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ]
})
