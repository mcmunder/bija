import _ from 'lodash'

import {
  _generate,
  _generateTest,
  ensureModuleExists,
  ensureModuleNameProvided,
  getOutputPath,
  getTestOutputPath,
  removeFile,
  updateIndexFile
} from './utils'
import {generateComponent} from './component'
import {generateStorybook, destroyStorybook} from './storybook'
import {getConfig} from '../config_utils'

export function generateContainer (name, options, customConfig) {
  const config = getConfig(customConfig)
  const {modulesPath, snakeCaseFileNames} = config
  let [moduleName, entityName] = name.split(':')
  const casedEntityName = snakeCaseFileNames
    ? _.snakeCase(entityName)
    : _.upperFirst(_.camelCase(entityName))

  ensureModuleNameProvided(name)
  ensureModuleExists(moduleName, customConfig)
  _generate('container', moduleName, casedEntityName, options, config)

  updateIndexFile({
    indexFilePath: `./${modulesPath}/${moduleName}/index.js`,
    insertImport: `export {default as ${casedEntityName}Container} from './containers/${casedEntityName}Container'`,
    omitExport: true
  })

  if (config.generateContainerTests) {
    _generateTest('containerTest', customConfig, moduleName, entityName, config)
  }

  // Also generate the component
  generateComponent(name, options, customConfig)

  if (config.generateComponentTests) {
    _generateTest('componenTest', moduleName, entityName, config)
  }

  if (config.storybook) {
    generateStorybook(name, options, customConfig)
  }
}

export function destroyContainer (name, options, customConfig) {
  let [moduleName, entityName] = name.split(':')

  removeFile(getOutputPath(customConfig, 'container', entityName, moduleName))
  removeFile(getTestOutputPath('container', entityName, moduleName))
  removeFile(getOutputPath(customConfig, 'component', entityName, moduleName))
  destroyStorybook(name, options, customConfig)
  removeFile(getTestOutputPath('component', entityName, moduleName))
}
