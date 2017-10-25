# bija

A command line tool for auto-generation of react components, redux containers and react storybooks. Forked from [mantra-cli](https://github.com/mantrajs/mantra-cli) and adjusted for non-meteor projects.

*"A bija is a one-syllabled mantra"*


## Installation

    npm install -g bija


## Documentation

Make sure you run `bija` from the root directory of your project.

### API
| command, alias | [type]    | [name]                      |
| :------------- | :-------- | :-------------------------- |
| generate, g    | component | `<moduleName>:<entityName>` |
|                | container | `<moduleName>:<entityName>` |
| destroy, d     | component | `<moduleName>:<entityName>` |
|                | container | `<moduleName>:<entityName>` |


### Config / customise output

To customise the output adjust the .bija.yaml config file in the root of the project to your liking. Some examples can be found in the examples dir.

#### Customisable fields:

| field                  | type            | default              |
| :--------------------- | :-------------- | :--------------------|
| generateComponentTests | boolean         | false                |
| generateContainerTests | boolean         | false                |
| modulesPath            | string          | 'src/modules'        |
| snakeCaseFileNames     | boolean         | false                |
| storybook              | boolean         | false                |
| tabSize                | number          | 2                    |
| useIndexFile           | boolean         | false                |

## Examples

- Generate a component called `myComponent` in module `core`:

    bija g component core:myComponent

- Generate a class component called `myComponent` in module `core`:

    bija g component core:myComponent -c

- Generates a container called `myComponentContainer` and its corresponding component called `myComponent` in module `core`:

    bija g container core:myComponent

## Copyright and license

Copyright 2017, mcmunder.  
Licensed under the [MIT license](./LICENSE).

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
