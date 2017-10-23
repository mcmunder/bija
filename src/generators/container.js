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
import {destroyComponent, generateComponent} from './component'
import {getConfig} from '../config_utils'

export function generateContainer (name, options, customConfig) {
  const config = getConfig(customConfig)
  const {useIndexFile, modulesPath, snakeCaseFileNames} = config
  let [moduleName, entityName] = name.split(':')
  const casedEntityName = snakeCaseFileNames
    ? _.snakeCase(entityName)
    : _.upperFirst(_.camelCase(entityName))

  ensureModuleNameProvided(name)
  ensureModuleExists(moduleName, customConfig)
  _generate('container', moduleName, casedEntityName, options, config)

  if (useIndexFile) {
    updateIndexFile({
      indexFilePath: `./${modulesPath}/${moduleName}/index.js`,
      insertImport: `export {default as ${casedEntityName}Container} from './containers/${casedEntityName}Container'`,
      omitExport: true
    })
  }

  if (config.generateContainerTests) {
    _generateTest('containerTest', customConfig, moduleName, entityName, config)
  }

  // Also generate the component and the storybook
  generateComponent(name, options, customConfig)

  if (config.generateComponentTests) {
    _generateTest('componenTest', moduleName, entityName, config)
  }
}

export function destroyContainer (name, options, customConfig) {
  const {useIndexFile, modulesPath, snakeCaseFileNames} = getConfig(
    customConfig
  )
  let [moduleName, entityName] = name.split(':')
  const casedEntityName = snakeCaseFileNames
    ? _.snakeCase(entityName)
    : _.upperFirst(_.camelCase(entityName))

  removeFile(
    getOutputPath(customConfig, 'container', casedEntityName, moduleName)
  )
  removeFile(getTestOutputPath('container', casedEntityName, moduleName))

  if (useIndexFile) {
    removeFromIndexFile(
      `./${modulesPath}/${moduleName}/index.js`,
      'container',
      `${casedEntityName}Container`
    )
  }

  // Also remove component ad storybook
  destroyComponent(name, options, customConfig)
}
