import { writeFile } from 'node:fs/promises'
import { items } from './data.js'
import {
  byCategory,
  categories,
  groupByCategory,
  search,
  top,
  total,
} from './catalog.js'

const [cmd, ...args] = process.argv.slice(2)

const line = ({ id, name, category, price }) =>
  `${id} · ${name} (${category}) — ${price.toFixed(2)} EUR`

const show = (list) => {
  if (list.length === 0) {
    console.log('Nenhum resultado.')
    return
  }
  console.log(list.map(line).join('\n'))
}

const report = async () => {
  const data = {
    count: items.length,
    total: total(items),
    categories: categories(items),
    top3: top(items, 3).map(({ id, name, price }) => ({ id, name, price })),
  }
  await writeFile('report.json', JSON.stringify(data, null, 2) + '\n')
  console.log('report.json escrito.')
}

switch (cmd) {
  case undefined:
    show(items)
    break
  case 'search':
    show(search(items, args.join(' ')))
    break
  case 'top':
    show(top(items, Number(args[0] ?? 3)))
    break
  case 'groups':
    Object.entries(groupByCategory(items)).forEach(([category, list]) => {
      console.log(`\n${category}`)
      console.log(list.map(line).join('\n'))
    })
    break
  case 'report':
    await report()
    break
  default:
    show(byCategory(items, cmd))
}