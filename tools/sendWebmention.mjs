const child_process = await import('child_process')

const MAX_MENTION_SENDS = 10

const sleep = (sec) => new Promise((res) => setTimeout(res, sec * 1000))

async function sendWebmention(oldCommitHash, newCommitHash) {
  const diff = child_process
    .spawnSync('git', ['diff', '--name-only', oldCommitHash, newCommitHash])
    .stdout.toString()
  const files = diff.split('\n')

  const filtered = files.filter((file) => file.indexOf('_notes/') !== -1)

  if (filtered.length >= 1) {
    await sleep(110)
  }

  for (let i = 0; i < filtered.length && i < MAX_MENTION_SENDS; ++i) {
    const filePath = filtered[i].split('/')
    const linkPath = filePath.slice(1, -1)
    const url = 'https://dl10yr.com/note/' + linkPath.join('/')
    console.log('sending webmention of ' + url)
    child_process.spawnSync('curl', [
      'https://fed.brid.gy/webmention',
      '-d',
      `source=${encodeURIComponent(url)}`,
      '-d',
      `target=https://fed.brid.gy`,
    ])
  }
}

const args = process.argv.slice(2)
sendWebmention(args[0], args[1])
