# bija

[![npm version](https://badge.fury.io/js/bija.svg)](https://badge.fury.io/js/bija)

A command line tool for auto-generation of react components, redux containers and react storybooks. Forked from [mantra-cli](https://github.com/mantrajs/mantra-cli) and adjusted for non-meteor projects.

*"A bija is a one-syllabled mantra"*


## Installation

```bash
npm install -g bija
```


## Documentation

Make sure you run `bija` from the root directory of your project.

### API
| command, alias | [type]    | [name]                      |
| :------------- | :-------- | :-------------------------- |
| generate, g    | module    | `<moduleName>`              |
|                | component | `<moduleName>:<entityName>` |
|                | container | `<moduleName>:<entityName>` |
| destroy, d     | module    | `<moduleName>`              |
|                | component | `<moduleName>:<entityName>` |
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

- Generate a module called `myModule` in `src/modules` (or whatever is set as `modulesPath` in `.bija.yaml`):

```bash
bija g module myModule
```

- Generate a component called `myComponent` in module `core`:

```bash
bija g component core:myComponent
```

- Generates a container called `myComponentContainer` and its corresponding component called `myComponent` in module `core`:

```bash
bija g container core:myComponent
```

## Copyright and license

Copyright 2017, mcmunder.  
Licensed under the [MIT license](./LICENSE).

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
