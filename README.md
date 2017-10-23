# bija

A command line tool for auto-generation of react components, redux containers, storybooks and more. Forked from [mantra-cli](https://github.com/mantrajs/mantra-cli) and adjusted for non-meteor projects.

*"A bija is a one-syllabled mantra"*


## Installation

    npm install --save-dev bija


## Documentation

`bija` expects you to be in the project root directory.

### Config / customize output

To customise the output adjust the .bija.yml config file in the root of the project to your liking.


### API
| command, alias | [type] | [name] | option, alias |
| :-- | :-- | :-- | :-- | :-- |
| generate, g | component | `<moduleName>:<entityName>` | `--verbose, -v` `--storybook, -s` `--use-class, -c`|
| | container |  `<moduleName>:<entityName>` | `--verbose, -v`<sup>*</sup> `--storybook, -s`<sup>**</sup> `--use-class, -c`<sup>***</sup> |
| destroy, d | component | `<moduleName>:<entityName>` | - |
| | container |  `<moduleName>:<entityName>` | - |

  ** Log the output of the scripts in the console, rather than silencing them.*

  *** Create storybook file*

  **** By default, a stateless component is generated. By using the `--use-class` (`-c`) option, you can generate a ES6 class extending `React.Component`.*


## Examples

Generate a stateless functional component called `myComponent` in module `core`:

    bija g component core:myComponent

Generate a class component called `myComponent` in module `core`:

    bija g component core:myComponent -c

Generates a container called `myComponentContainer` and its corresponding component called `myComponent` in module `core`:

    bija g container core:myComponent
