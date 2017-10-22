import {compose} from 'recompose'
import {connect} from 'react-redux'
import CalendarDay from '../components/CalendarDay'

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

const CalendarDayContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CalendarDay)

export default CalendarDayContainer
