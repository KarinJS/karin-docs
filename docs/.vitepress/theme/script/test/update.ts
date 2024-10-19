import { Update } from 'node-karin'

const status = Update.checkUpdate('./plugins/karin-plugin-xxxxxx', 120)

const list = await Update.getCommit({
  path: './plugins/karin-plugin-xxxxxx',
  count: 10,
  hash: 'a1b2c3',
  branch: 'main'
})

Update.getHash('./plugins/karin-plugin-xxxxxx', true)

Update.getTime('./plugins/karin-plugin-xxxxxx')

Update.updatePkg('node-karin', 120)

Update.update('./plugins/karin-plugin-xxxxxx', 'git pull')