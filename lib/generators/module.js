import snakeCase from 'lodash/snakeCase'

import {createDir} from '../utils'
import {getConfig} from '../config_utils'
import {removeFile} from './utils'

export function generateModule (name, options, customConfig = {}) {
  const {modulesPath, storybook, snakeCaseFileNames} = getConfig(customConfig)
  let fileName = snakeCaseFileNames ? snakeCase(name) : name
  const modulePath = `./${modulesPath}/${fileName}`

  createDir(modulePath)
  createDir(`${modulePath}/components`)
  createDir(`${modulePath}/containers`)

  if (storybook) {
    const moduleStoriesDir = `${modulePath}/components/.stories`
    createDir(moduleStoriesDir)
  }
}

export function destroyModule (name, options, customConfig) {
  const {modulesPath, snakeCaseFileNames} = getConfig(customConfig)
  let fileName = snakeCaseFileNames ? snakeCase(name) : name
  const modulePath = `./${modulesPath}/${fileName}`
  removeFile(modulePath)
}
