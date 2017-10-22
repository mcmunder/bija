import {compose} from 'recompose'
import {connect} from 'react-redux'
import CalendarWeek from '../components/CalendarWeek'

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

const CalendarWeekContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CalendarWeek)

export default CalendarWeekContainer
