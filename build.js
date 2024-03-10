#!/usr/bin/env zx

const { $ } = require('@cspotcode/zx')
const { copyFile } = require('node:fs/promises')
const { platform } = require('node:os')
const os = platform()

async function build() {
  await $`node --experimental-sea-config sea-config.json`

  if (os === 'linux') {
    buildLinux()
  } else if (os === 'win32') {
    buildWindows()
  } else if (os === 'darwin') {
    // TODO: macOS
  }
}

async function buildLinux() {
  const outputFile = 'bin'
  await $`cp $(command -v node) ${outputFile}`
  await $`npx postject ${outputFile} NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`
}

async function buildWindows() {
  const outputFile = 'bin.exe'
  await copyFile(process.execPath, outputFile)
  await $`npx postject ${outputFile} NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`
}

build()
