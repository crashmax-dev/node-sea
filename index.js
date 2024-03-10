const { getAsset } = require('node:sea')
const { styleText } = require('node:util')
const { userInfo } = require('node:os')

const package = JSON.parse(getAsset('package.json', 'utf-8'))
const username = styleText('bold', styleText('bgCyan', userInfo().username))
const description = styleText('green', package.description)

console.log(`Hello, ${username}!\n${description}`)
