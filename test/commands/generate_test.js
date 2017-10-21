import {expect} from 'chai'
import fs from 'fs'

import {generate} from '../../dist/commands'
import {
  setupTestApp,
  teardownTestApp,
  checkFileOrDirExists
} from '../test_helpers'

describe('generate command', function () {
  beforeEach(function () {
    setupTestApp()
  })

  afterEach(function () {
    teardownTestApp()
  })

  describe('container', function () {
    it('generates a container', function () {
      generate('container', 'core:post')
      expect(
        checkFileOrDirExists('./client/modules/core/containers/post.js')
      ).to.equal(true)
    })

    it('generates a component', function () {
      generate('container', 'core:post')
      expect(
        checkFileOrDirExists('./client/modules/core/components/post.jsx')
      ).to.equal(true)
    })

    it('does not generate any files if entity name contains a dot', function () {
      generate('container', 'core:header.menu')
      expect(
        checkFileOrDirExists('./client/modules/core/containers/header.menu.js')
      ).to.equal(false)
      expect(
        checkFileOrDirExists('./client/modules/core/components/header.menu.jsx')
      ).to.equal(false)
    })

    it('does not generate any files if entity name is empty', function () {
      generate('container', 'core::header')
      expect(
        checkFileOrDirExists('./client/modules/core/containers/.js')
      ).to.equal(false)
      expect(
        checkFileOrDirExists('./client/modules/core/components/.js')
      ).to.equal(false)
      expect(
        checkFileOrDirExists('./client/modules/core/containers/header.js')
      ).to.equal(false)
      expect(
        checkFileOrDirExists('./client/modules/core/components/header.jsx')
      ).to.equal(false)
    })

    it('converts the entity name to snakecase for the file name', function () {
      generate('container', 'core:headerMenu')
      expect(
        checkFileOrDirExists('./client/modules/core/containers/header_menu.js')
      ).to.equal(true)
      expect(
        checkFileOrDirExists('./client/modules/core/components/header_menu.jsx')
      ).to.equal(true)
    })
    it('does not generates a container test file if generateContainerTests is false', function () {
      generate(
        'container',
        'core:commentList',
        {},
        {generateContainerTests: false}
      )
      expect(
        checkFileOrDirExists(
          './client/modules/core/containers/tests/comment_list.js'
        )
      ).to.equal(false)
    })
    it('generates a test file for the container if generateContainerTests is true', function () {
      generate(
        'container',
        'core:commentList',
        {},
        {generateContainerTests: true}
      )
      let content = fs.readFileSync(
        './client/modules/core/containers/tests/comment_list.js',
        {encoding: 'utf-8'}
      )
      expect(content).to.equal(
        `const {describe, it} = global;
import {expect} from 'chai';
import {stub, spy} from 'sinon';
import {composer} from '../comment_list';

describe('core.containers.comment_list', () => {
  describe('composer', () => {

//    const Tracker = {nonreactive: cb => cb()};
//    const getCollections = (post) => {
//      const Collections = {
//        Posts: {findOne: stub()}
//      };
//      Collections.Posts.findOne.returns(post);
//      return Collections;
//    };

    it('should do something');
  });
});
`
      )
    })

    it('does not generate a test file for the component if generateComponentTests is false', function () {
      generate(
        'container',
        'core:commentList',
        {},
        {generateComponentTests: false}
      )
      expect(
        checkFileOrDirExists(
          './client/modules/core/components/tests/comment_list.js'
        )
      ).to.equal(false)
    })

    it('generates a test file for the component if generateComponentTests is true', function () {
      generate(
        'container',
        'core:commentList',
        {},
        {generateComponentTests: true}
      )
      let content = fs.readFileSync(
        './client/modules/core/components/tests/comment_list.js',
        {encoding: 'utf-8'}
      )
      expect(content).to.equal(
        `const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import CommentList from '../comment_list';

describe('core.components.comment_list', () => {
  it('should do something');
});
`
      )
    })

    it('does not generate storybook if not configured', function () {
      generate('container', 'core:commentList', {}, {})
      expect(
        checkFileOrDirExists(
          './client/modules/core/components/.stories/comment_list.js'
        )
      ).to.equal(false)
    })

    it('generates storybook if configured', function () {
      generate('container', 'core:commentList', {}, {storybook: true})
      expect(
        checkFileOrDirExists(
          './client/modules/core/components/.stories/comment_list.js'
        )
      ).to.equal(true)
    })
  })

  describe('component', function () {
    it('generates a stateless component by default', function () {
      generate('component', 'core:post', {}, {tabSize: 2})
      let content = fs.readFileSync(
        './client/modules/core/components/post.jsx',
        {encoding: 'utf-8'}
      )
      expect(content).to.equal(
        `import React from 'react';

const Post = () => (
  <div>
    Post
  </div>
);

export default Post;
`
      )
    })

    it('generates a class extending React.Component if useClass option is provided', function () {
      generate('component', 'core:post', {useClass: true}, {tabSize: 2})
      let content = fs.readFileSync(
        './client/modules/core/components/post.jsx',
        {encoding: 'utf-8'}
      )
      expect(content).to.equal(
        `import React from 'react';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Post
      </div>
    );
  }
}

export default Post;
`
      )
    })

    it('does not generate if entity name contains a dot', function () {
      generate('component', 'core:header.menu')
      expect(
        checkFileOrDirExists('./client/modules/core/components/header.menu.jsx')
      ).to.equal(false)
    })

    it('converts the entity name to snakecase for the file name', function () {
      generate('component', 'core:headerMenu')
      expect(
        checkFileOrDirExists('./client/modules/core/components/header_menu.jsx')
      ).to.equal(true)
    })

    it('does not generate a test file if generateComponentTests is false', function () {
      generate(
        'component',
        'core:headerMenu',
        {},
        {generateComponentTests: false}
      )
      expect(
        checkFileOrDirExists(
          './client/modules/core/components/tests/header_menu.js'
        )
      ).to.equal(false)
    })

    it('generates a test file if generateComponentTests is true', function () {
      generate(
        'component',
        'core:headerMenu',
        {},
        {generateComponentTests: true}
      )
      let content = fs.readFileSync(
        './client/modules/core/components/tests/header_menu.js',
        {encoding: 'utf-8'}
      )
      expect(content).to.equal(
        `const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import HeaderMenu from '../header_menu';

describe('core.components.header_menu', () => {
  it('should do something');
});
`
      )
    })

    it('does not generate storybook if not configured', function () {
      generate('component', 'core:commentList', {}, {})
      expect(
        checkFileOrDirExists(
          './client/modules/core/components/.stories/comment_list.js'
        )
      ).to.equal(false)
    })

    it('generates storybook if configured', function () {
      generate('component', 'core:commentList', {}, {storybook: true})
      expect(
        checkFileOrDirExists(
          './client/modules/core/components/.stories/comment_list.js'
        )
      ).to.equal(true)
    })
  })

  describe('module', function () {
    it('generates a module', function () {
      generate('module', 'comments')
      expect(checkFileOrDirExists('./client/modules/comments')).to.equal(true)
      expect(checkFileOrDirExists('./client/modules/comments/libs')).to.equal(
        true
      )
      expect(
        checkFileOrDirExists('./client/modules/comments/components/')
      ).to.equal(true)
      expect(
        checkFileOrDirExists('./client/modules/comments/containers/')
      ).to.equal(true)
      expect(
        checkFileOrDirExists('./client/modules/comments/configs/')
      ).to.equal(true)
      expect(
        checkFileOrDirExists('./client/modules/comments/index.js')
      ).to.equal(true)
      expect(
        checkFileOrDirExists('./client/modules/comments/routes.jsx')
      ).to.equal(true)
    })

    it('updates client/main.js', function () {
      generate('module', 'comments', {}, {})

      let content = fs.readFileSync('./client/main.js', {encoding: 'utf-8'})
      expect(content).to.equal(
        `import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import commentsModule from './modules/comments';

// init context
const context = initContext();

// create app
const app = createApp(context);
// load modules
app.loadModule(coreModule);
app.loadModule(commentsModule);
app.init();
`
      )
    })

    it('updates client/main.js with custom module paths', function () {
      generate(
        'module',
        'comments',
        {},
        {modulesPath: 'imports/modules/foo/bar'}
      )

      let content = fs.readFileSync('./client/main.js', {encoding: 'utf-8'})
      expect(content).to.equal(
        `import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import commentsModule from '../imports/modules/foo/bar/comments';

// init context
const context = initContext();

// create app
const app = createApp(context);
// load modules
app.loadModule(coreModule);
app.loadModule(commentsModule);
app.init();
`
      )
    })

    it('does not generate if entity name contains a dot', function () {
      generate('module', 'group.notes')
      expect(checkFileOrDirExists('./client/modules/group.notes/')).to.equal(
        false
      )
    })

    it('converts the module name to snakecase for the directory name', function () {
      generate('module', 'groupNotes')
      expect(checkFileOrDirExists('./client/modules/group_notes')).to.equal(
        true
      )
    })
  })
})
