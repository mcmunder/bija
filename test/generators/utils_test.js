import {expect} from 'chai'
import path from 'path'
import fse from 'fs-extra'
import _ from 'lodash'

import * as utils from '../../dist/generators/utils'

describe('removeWholeLine', function () {
  it('removes the whole line on which the given string appears', function () {
    let line = '{\n  User,\n  Posts,\n  Comments}'
    let result = utils.removeWholeLine(line, 'User')
    expect(result).to.equal('{\n  Posts,\n  Comments}')
  })

  it('removes the whole line on which the given regex matches', function () {
    let line = '{\n  User,\n  Posts,\n  Comments}'
    let result = utils.removeWholeLine(line, /[a-zA-Z]{5}/g)
    expect(result).to.equal('{\n  User,\n  Comments}')
  })
})

describe('removeFromIndexFile', function () {
  let dummyPath = path.resolve(__dirname, '../../tmp/removeFromIndexFile.js')

  afterEach(function () {
    // Cleanup
    fse.removeSync(dummyPath)
  })

  it('removes import/export lines - capitalizeVarName', function () {
    // Setup
    fse.outputFileSync(
      dummyPath,
      `
import Comments from './comments';
import Users from './users';
import Posts from './posts';

export {
  Commnets,
  Users,
  Posts
};
`
    )

    utils.removeFromIndexFile(dummyPath, 'users', {capitalizeVarName: true})
    let result = fse.readFileSync(dummyPath, {encoding: 'utf-8'})
    expect(result).to.equal(`
import Comments from './comments';
import Posts from './posts';

export {
  Commnets,
  Posts
};
`)
  })

  it('removes import/export lines', function () {
    // Setup
    fse.outputFileSync(
      dummyPath,
      `
import comments from './comments';
import users from './users';

export default function () {
  comments();
  users();
}
`
    )

    utils.removeFromIndexFile(dummyPath, 'users', {capitalizeVarName: false})
    let result = fse.readFileSync(dummyPath, {encoding: 'utf-8'})
    expect(result).to.equal(`
import comments from './comments';

export default function () {
  comments();
}
`)
  })
})

describe('getOutputPath', function () {
  const customConfig = {}

  it('returns a correct output path for container', function () {
    let result = utils.getOutputPath(
      customConfig,
      'container',
      'user_list',
      'core'
    )
    expect(result).to.equal('./client/modules/core/containers/user_list.js')
  })

  it('returns a correct output path for component', function () {
    let result = utils.getOutputPath(
      customConfig,
      'component',
      'user_list',
      'core'
    )
    expect(result).to.equal('./client/modules/core/components/user_list.jsx')
  })

  it('returns a correct output path for a storybook', function () {
    let result = utils.getOutputPath(
      customConfig,
      'storybook',
      'user_list',
      'core'
    )
    expect(result).to.equal(
      './client/modules/core/components/.stories/user_list.js'
    )
  })
  describe('with custom modules path', function () {
    const customConfig = {modulesPath: 'foo/bar/mantra/modules'}

    it('returns a correct output path for container', function () {
      let result = utils.getOutputPath(
        customConfig,
        'container',
        'user_list',
        'core'
      )
      expect(result).to.equal(
        './foo/bar/mantra/modules/core/containers/user_list.js'
      )
    })

    it('returns a correct output path for component', function () {
      let result = utils.getOutputPath(
        customConfig,
        'component',
        'user_list',
        'core'
      )
      expect(result).to.equal(
        './foo/bar/mantra/modules/core/components/user_list.jsx'
      )
    })

    it('returns a correct output path for a storybook', function () {
      let result = utils.getOutputPath(
        customConfig,
        'storybook',
        'user_list',
        'core'
      )
      expect(result).to.equal(
        './foo/bar/mantra/modules/core/components/.stories/user_list.js'
      )
    })
  })
})

describe('getTemplateVariables', function () {
  describe('for components', function () {
    let expected = {
      componentName: 'UserList',
      moduleName: 'core'
    }

    it('gets template variables - variation 1', function () {
      let result = utils.getTemplateVariables('component', 'core', 'userList')
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('gets template variables - variation 2', function () {
      let result = utils.getTemplateVariables('component', 'core', 'user_list')
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('gets template variables - variation 3', function () {
      let result = utils.getTemplateVariables('component', 'core', 'UserList')
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })
  })

  describe('for storybook', function () {
    let expected = {
      moduleName: 'core',
      componentName: 'UserList',
      componentFileName: 'user_list'
    }

    it('gets template variables - variation 1', function () {
      let result = utils.getTemplateVariables('storybook', 'core', 'userList')
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('gets template variables - variation 2', function () {
      let result = utils.getTemplateVariables('storybook', 'core', 'user_list')
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('gets template variables - variation 3', function () {
      let result = utils.getTemplateVariables('storybook', 'core', 'UserList')
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })
  })

  describe('for containers', function () {
    let expected = {
      componentName: 'UserList',
      componentFileName: 'user_list',
      moduleName: 'core'
    }

    it('gets template variables - variation 1', function () {
      let result = utils.getTemplateVariables('container', 'core', 'userList')
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('gets template variables - variation 2', function () {
      let result = utils.getTemplateVariables('container', 'core', 'user_list')
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('gets template variables - variation 3', function () {
      let result = utils.getTemplateVariables('container', 'core', 'UserList')
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })
  })

  describe('for collections', function () {
    let expected = {
      collectionName: 'PullRequests',
      collectionFileName: 'pull_requests'
    }

    it('gets template variables - variation 1', function () {
      let result = utils.getTemplateVariables(
        'collection',
        null,
        'pullRequests'
      )
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('gets template variables - variation 2', function () {
      let result = utils.getTemplateVariables(
        'collection',
        null,
        'pull_requests'
      )
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('gets template variables - variation 3', function () {
      let result = utils.getTemplateVariables(
        'collection',
        null,
        'PullRequests'
      )
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('gets templates variables with collection2 option', function () {
      let result = utils.getTemplateVariables(
        'collection',
        null,
        'PullRequests',
        {schema: 'collection2'}
      )
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('gets templates variables with astronomy option', function () {
      let result = utils.getTemplateVariables(
        'collection',
        null,
        'PullRequests',
        {schema: 'astronomy'}
      )
      let matched = _.isEqual(result, {
        collectionName: 'PullRequests',
        collectionFileName: 'pull_requests',
        className: 'PullRequest'
      })
      expect(matched).to.equal(true)
    })
  })
})

describe('checkForModuleName', function () {
  it('returns true if module name is provided', function () {
    let result = utils.checkForModuleName('core:user_list')
    expect(result).to.equal(true)
  })

  it('returns false if module name is provided', function () {
    let result = utils.checkForModuleName('user_list')
    expect(result).to.equal(false)
  })
})

describe('getTestTemplateVariables', function () {
  describe('for components', function () {
    let expected = {
      componentName: 'HeaderMenu',
      componentFileName: 'header_menu',
      moduleName: 'user_management'
    }

    it('getes templates varaibles - variation 1', function () {
      let result = utils.getTestTemplateVariables(
        'component',
        'user_management',
        'headerMenu'
      )
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('getes templates varaibles - variation 2', function () {
      let result = utils.getTestTemplateVariables(
        'component',
        'userManagement',
        'headerMenu'
      )
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('getes templates varaibles - variation 3', function () {
      let result = utils.getTestTemplateVariables(
        'component',
        'UserManagement',
        'header_menu'
      )
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })
  })

  describe('for containers', function () {
    let expected = {
      containerFileName: 'comment_lists',
      moduleName: 'core'
    }

    it('getes templates varaibles - variation 1', function () {
      let result = utils.getTestTemplateVariables(
        'container',
        'core',
        'comment_lists'
      )
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })

    it('getes templates varaibles - variation 2', function () {
      let result = utils.getTestTemplateVariables(
        'container',
        'core',
        'comment_lists'
      )
      let matched = _.isEqual(result, expected)
      expect(matched).to.equal(true)
    })
  })
})

describe('getTemplatePath', function () {
  it('gets template path for collection - collection2', function () {
    let result = utils.getTemplatePath('collection', {schema: 'collection2'})
    expect(result).to.match(/generic_collection2.tt/)
  })
})

describe('compileTemplate', function () {
  it('applies tabSize', function () {
    let content = `function() {
  if (true) {
    console.log('hello world');
  }
}
`
    let result = utils.compileTemplate(content, {}, {tabSize: 4})
    expect(result).to.equal(`function() {
    if (true) {
        console.log('hello world');
    }
}
`)
  })
})

describe('readTemplateContent', function () {
  it('returns the custom content if config is provided', function () {
    let options = {}
    let customContent = 'hello world'
    let configs = {templates: [{name: 'action', text: customContent}]}
    let result = utils.readTemplateContent('action', options, configs)

    expect(result).to.equal(customContent)
  })
})
