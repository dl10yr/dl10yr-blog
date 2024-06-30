import ssg from "@hono/vite-ssg";
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

const entry = 'src/index.tsx'

export default defineConfig({
  plugins: [
    ssg({ entry }),
    devServer({
      adapter,
      entry
    })
  ]
})
