import React from 'react'
import {storiesOf} from '@storybook'
import {action} from '@storybook/addon-actions'
import CalendarDay from '../CalendarDay'

storiesOf('calendar', module)
  .add('CalendarDay',
  () => (
    <CalendarDay />
  )
)
