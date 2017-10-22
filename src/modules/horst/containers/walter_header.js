import {compose} from 'recompose'
import {connect} from 'react-redux'
import WalterHeader from '../components/walter_header'

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

const WalterHeaderContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WalterHeader)

export default WalterHeaderContainer
