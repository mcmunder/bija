import React from 'react'
import {storiesOf} from '@storybook'
import {action} from '@storybook/addon-actions'
import Button from '../Button'

storiesOf('core', module)
  .add('Button',
  () => (
    <Button />
  )
)
