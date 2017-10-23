# bija

A command line tool for auto-generation of react components, redux containers, storybooks and more. Forked from [mantra-cli](https://github.com/mantrajs/mantra-cli) and adjusted for non-meteor projects.

*"A bija is a one-syllabled mantra"*


## Installation

    npm install --save-dev bija


## Documentation

`bija` expects you to be in the project root directory.

### API
| command, alias | [type]    | [name]                      |
| :------------- | :-------- | :-------------------------- |
| generate, g    | component | `<moduleName>:<entityName>` |
|                | container | `<moduleName>:<entityName>` |
| destroy, d     | component | `<moduleName>:<entityName>` |
|                | container | `<moduleName>:<entityName>` |


### Config / customize output

To customise the output adjust the .bija.yaml config file in the root of the project to your liking. Some examples can be found in the examples dir.

#### Customizable fields:

| field                  | type            | default              |
| :--------------------- | :-------------- | :--------------------|
| generateComponentTests | boolean         | false                |
| generateContainerTests | boolean         | false                |
| generateIndexFile      | boolean         | false                |
| modulesPath            | string          | 'src/modules'        |
| snakeCaseFileNames     | boolean         | false                |
| storybook              | boolean         | false                |
| tabSize                | number          | 2                    |

## Examples

Generate a stateless functional component called `myComponent` in module `core`:

    bija g component core:myComponent

Generate a class component called `myComponent` in module `core`:

    bija g component core:myComponent -c

Generates a container called `myComponentContainer` and its corresponding component called `myComponent` in module `core`:

    bija g container core:myComponent
