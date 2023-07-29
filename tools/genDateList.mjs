import { writeFileSync } from 'fs'
import fs from 'fs'
import { join } from 'path'

async function genDatelist() {
  const returnArray = []
  const years = fs.readdirSync(join(process.cwd(), '_posts'))
  for (const year of years) {
    const months = fs.readdirSync(join(process.cwd(), `_posts/${year}`))
    let yearObj = { year: year, months: [] }
    const monthsArray = []
    for (const month of months) {
      const slugs = fs.readdirSync(join(process.cwd(), `_posts/${year}/${month}`))
      monthsArray.push({
        month: month,
        number: slugs.length,
      })
    }
    yearObj['months'] = monthsArray
    returnArray.push(yearObj)
  }
  writeFileSync('dateList.json', JSON.stringify(returnArray))
}

genDatelist()
