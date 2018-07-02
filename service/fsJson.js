const fs = require('fs')

// 读取文件
fs.readFile('./data_json/goods.json', 'utf8', (err, data) => {
  if (err) {
    console.log('读取文件失败')
    return
  }

  data = JSON.parse(data)
  let i = 0
  let newData = []
  data.RECORDS.map((val, index) => {
    if (val.IMAGE1 !== null) {
      newData.push(val)
      i++
    }
  })
  console.log('筛选出 '  + i + ' 条数据')

  // 数据写入新文件写入新文件
  fs.writeFile('./data_json/newGoods.json', JSON.stringify(newData), err => {
    if (err) {
      console.log('写入文件失败')
    } else {
      console.log('写入成功')
    }
  })
})
