export default {
  entry: ['src/index.tsx'],
  project: ['src/**/*.{js,jsx,ts,tsx}'],
  ignore: [
    'dist/**',
    '_works/**',
    '_posts/**',
    '_notes/**',
    '.claude_workflow/**',
    'eslint.config.js',
    'knip.config.js',
    'vite.config.js',
    '.prettierrc'
  ],
  ignoreDependencies: [
    'wrangler',
    '@cloudflare/workers-types'
  ],
  rules: {
    files: 'error',
    dependencies: 'error',
    unlisted: 'error',
    exports: 'warn',
    types: 'warn',
    duplicates: 'error'
  }
}