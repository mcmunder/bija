import program from 'commander'
import {version} from '../package.json'
import {generate, destroy} from './commands'
import {readCustomConfig} from './config_utils.js'

program.version(version)

program
  .command('generate [type] [name]')
  .alias('g')
  .option(
    '-c, --use-class',
    'extend React.Component class when generating components'
  )
  .description('generate an entity with the name provided')
  .action(function (type, name, options) {
    const customConfig = readCustomConfig()
    generate(type, name, options, customConfig)
  })
  .on('--help', function () {
    console.log('  Choose from the following generator types:')
    console.log('  component, container, module')
    console.log('')
    console.log(
      '  You need to provide module name for component, and container'
    )
    console.log(
      "  Format your 'name' argument in the form of moduleName:entityName"
    )
    console.log('')
    console.log('  e.g. `bija generate action core:post`')
  })

program
  .command('destroy [type] [name]')
  .alias('d')
  .description('delete files generated for the given type and name')
  .action(function (type, name, options) {
    const customConfig = readCustomConfig()

    destroy(type, name, options, customConfig)
  })

program.parse(process.argv)
