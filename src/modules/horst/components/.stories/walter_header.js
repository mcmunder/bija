import React from 'react'
import {storiesOf} from '@storybook'
import {action} from '@storybook/addon-actions'
import WalterHeader from '../walter_header'

storiesOf('horst', module)
  .add('WalterHeader',
  () => (
    <WalterHeader />
  )
)
