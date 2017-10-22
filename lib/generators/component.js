import _ from 'lodash'

import {
  _generate,
  _generateTest,
  ensureModuleExists,
  ensureModuleNameProvided,
  getOutputPath,
  getTestOutputPath,
  removeFile,
  removeFromIndexFile,
  updateIndexFile
} from './utils'
import {generateStorybook, destroyStorybook} from './storybook'
import {getConfig} from '../config_utils'

export function generateComponent (name, options, customConfig) {
  const config = getConfig(customConfig)
  const {modulesPath, snakeCaseFileNames} = config
  let [moduleName, entityName] = name.split(':')
  const casedEntityName = snakeCaseFileNames
    ? _.snakeCase(entityName)
    : _.upperFirst(_.camelCase(entityName))

  ensureModuleNameProvided(name)
  ensureModuleExists(moduleName, customConfig)

  _generate('component', moduleName, casedEntityName, options, config)

  updateIndexFile({
    indexFilePath: `./${modulesPath}/${moduleName}/index.js`,
    insertImport: `export {default as ${casedEntityName}} from './components/${casedEntityName}'`,
    omitExport: true
  })

  if (config.generateComponentTests) {
    _generateTest('component', customConfig, moduleName, entityName, config)
  }
  if (config.storybook) {
    generateStorybook(name, options, customConfig)
  }
}

export function destroyComponent (name, options, customConfig) {
  const {modulePath, snakeCaseFileNames} = getConfig(customConfig)
  let [moduleName, entityName] = name.split(':')
  const casedEntityName = snakeCaseFileNames
    ? _.snakeCase(entityName)
    : _.camelCase(entityName)

  ensureModuleNameProvided(name)
  ensureModuleExists(moduleName, customConfig)
  removeFile(getOutputPath(customConfig, 'component', entityName, moduleName))
  destroyStorybook(name, options, customConfig)
  removeFile(getTestOutputPath('component', entityName, moduleName))
  removeFromIndexFile(`./${modulePath}/index.js`, casedEntityName)
}
