import {destroyComponent} from '../generators/component'
import {destroyContainer} from '../generators/container'
import {destroyModule} from '../generators/module'
import _ from 'lodash'
export default function destroy (type, name, options, customConfig) {
  if (_.isEmpty(name)) {
    console.log(`Please specify a name for the ${type} to destroy:`)
    console.log(`mantra destroy ${type} <name>`)
    return
  }
  let destroyFn = getDestroyFn(type)
  if (!destroyFn) {
    console.log(`Invalid type ${type}`)
    console.log('Run `mantra generate --help` for more options.')
    return
  }
  destroyFn(name, options, customConfig)
}

function getDestroyFn (type) {
  const destroyFnMap = {
    component: destroyComponent,
    container: destroyContainer,
    module: destroyModule
  }

  return destroyFnMap[type]
}
