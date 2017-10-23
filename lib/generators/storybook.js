import _ from 'lodash'
import {
  _generate,
  ensureModuleNameProvided,
  ensureModuleExists,
  removeFile,
  getOutputPath
} from './utils'
import {getConfig} from '../config_utils'

export function generateStorybook (name, options, customConfig = {}) {
  let [moduleName, entityName] = name.split(':')
  const config = getConfig(customConfig)
  const {snakeCaseFileNames} = config
  const casedEntityName = snakeCaseFileNames
    ? _.snakeCase(entityName)
    : _.upperFirst(_.camelCase(entityName))

  ensureModuleNameProvided(name)
  ensureModuleExists(moduleName, customConfig)
  _generate('storybook', moduleName, casedEntityName, options, config)
}

export function destroyStorybook (name, options, customConfig = {}) {
  let [moduleName, entityName] = name.split(':')
  const {snakeCaseFileNames} = getConfig(customConfig)
  const casedEntityName = snakeCaseFileNames
    ? _.snakeCase(entityName)
    : _.upperFirst(_.camelCase(entityName))

  ensureModuleNameProvided(name)
  ensureModuleExists(moduleName, customConfig)
  const storyFile = getOutputPath(
    customConfig,
    'storybook',
    casedEntityName,
    moduleName
  )
  removeFile(storyFile)
}
