import {
  _generate,
  ensureModuleNameProvided,
  ensureModuleExists,
  removeFromIndexFile,
  removeFile,
  getOutputPath
} from './utils'
import {getConfig} from '../config_utils'

export function generateStorybook (name, options, customConfig = {}) {
  let [moduleName, entityName] = name.split(':')
  const config = getConfig(customConfig)

  ensureModuleNameProvided(name)
  ensureModuleExists(moduleName, customConfig)
  _generate('storybook', moduleName, entityName, options, config)
}

export function destroyStorybook (name, options, customConfig = {}) {
  let [moduleName, entityName] = name.split(':')
  const config = getConfig(customConfig)
  const modulePath = `${config.modulesPath}/${moduleName}`

  ensureModuleNameProvided(name)
  ensureModuleExists(moduleName, customConfig)
  const storyFile = getOutputPath(
    customConfig,
    'storybook',
    entityName,
    moduleName
  )
  removeFile(storyFile)
  removeFromIndexFile(
    `./${modulePath}/components/.stories/index.js`,
    entityName
  )
}
