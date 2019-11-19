import { connect } from 'react-redux'
import Words from '../components/Words'
import { checkWordAsync, CheckResult } from '../actions'

const mapStateToProps = state => ({
    board: state.board,
    words: state.words
})

const mapDispatchToProps = dispatch => {
    return {
        checkWordAsync: (word, board) => dispatch(checkWordAsync(word, board))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Words)
