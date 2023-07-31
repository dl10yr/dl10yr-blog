const child_process = await import('child_process')

const MAX_MENTION_SENDS = 10

const args = process.argv.slice(2)

const diff = child_process
  .spawnSync('git', ['diff', '--name-only', args[0], args[1]])
  .stdout.toString()
const files = diff.split('\n')

const filtered = files.filter((file) => file.indexOf('_notes/') !== -1)

for (let i = 0; i < filtered.length && i < MAX_MENTION_SENDS; ++i) {
  const filePath = filtered[i].split('/')
  const linkPath = filePath.slice(1, -1)
  const url = 'https://dl10yr.com/note/' + linkPath.join('/')
  console.log('sending webmention of ' + url)
  // child_process.spawnSync('curl', [
  //   'https://fed.brid.gy/webmention',
  //   '-d',
  //   `source=${encodeURIComponent(url)}`,
  //   '-d',
  //   `target=https://fed.brid.gy`,
  // ])
}
