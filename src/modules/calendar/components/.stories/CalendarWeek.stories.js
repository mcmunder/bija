import React from 'react'
import {storiesOf} from '@storybook'
import {action} from '@storybook/addon-actions'
import CalendarWeek from '../CalendarWeek'

storiesOf('calendar', module)
  .add('CalendarWeek',
  () => (
    <CalendarWeek />
  )
)
