import {expect} from 'chai'
import fse from 'fs-extra'
import fs from 'fs'

import {generate, destroy} from '../../dist/commands'
import {
  setupTestApp,
  teardownTestApp,
  checkFileOrDirExists
} from '../test_helpers'

describe('destroy command', function () {
  beforeEach(function () {
    setupTestApp()
  })

  afterEach(function () {
    teardownTestApp()
  })

  describe('component', function () {
    it('removes the component file', function () {
      let componentPath = './client/modules/core/components/posts.jsx'
      fse.outputFileSync(componentPath, 'dummy content')
      let storyIndexFile = './client/modules/core/components/.stories/index.js'
      fse.outputFileSync(storyIndexFile, 'dummy content')
      destroy('component', 'core:posts')
      expect(checkFileOrDirExists(componentPath)).to.equal(false)
    })

    it('removes the test file', function () {
      let testPath = './client/modules/core/components/tests/post_list.js'
      fse.outputFileSync(testPath, 'dummy content')
      let storyIndexFile = './client/modules/core/components/.stories/index.js'
      fse.outputFileSync(storyIndexFile, 'dummy content')
      destroy('component', 'core:postList')
      expect(checkFileOrDirExists(testPath)).to.equal(false)
    })
  })

  describe('container', function () {
    it('removes the container file', function () {
      let containerPath = './client/modules/core/containers/posts.js'
      fse.outputFileSync(containerPath, 'dummy content')
      destroy('container', 'core:posts')
      expect(checkFileOrDirExists(containerPath)).to.equal(false)
    })

    it('removes the component file', function () {
      let componentPath = './client/modules/core/components/posts.jsx'
      fse.outputFileSync(componentPath, 'dummy content')
      destroy('container', 'core:posts')
      expect(checkFileOrDirExists(componentPath)).to.equal(false)
    })

    it('removes the test file for container', function () {
      let testPath = './client/modules/core/containers/tests/post_list.js'
      fse.outputFileSync(testPath, 'dummy content')
      destroy('container', 'core:postList')
      expect(checkFileOrDirExists(testPath)).to.equal(false)
    })

    it('removes the test file for component', function () {
      let testPath = './client/modules/core/components/tests/post_list.js'
      fse.outputFileSync(testPath, 'dummy content')
      destroy('container', 'core:postList')
      expect(checkFileOrDirExists(testPath)).to.equal(false)
    })
  })

  describe('module', function () {
    it('removes the module directory', function () {
      generate('module', 'comments')
      destroy('module', 'comments')

      expect(checkFileOrDirExists('./client/modules/comments')).to.equal(false)
    })

    it('updates the main.js file', function () {
      let mainFilePath = './client/main.js'
      let content = `import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import commentsModule from './modules/comments';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(commentsModule);
app.init();

`
      fse.outputFileSync(mainFilePath, content)
      destroy('module', 'comments')
      let updatedContent = fs.readFileSync(mainFilePath, {encoding: 'utf-8'})
      expect(updatedContent).to.equal(
        `import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.init();

`
      )
    })
  })
})
