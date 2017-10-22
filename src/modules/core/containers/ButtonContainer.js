import {compose} from 'recompose'
import {connect} from 'react-redux'
import Button from '../components/Button'

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

const ButtonContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Button)

export default ButtonContainer
