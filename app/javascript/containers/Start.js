import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startAsync, stop } from '../actions'

const Start = ({ started, dispatch }) => {
    return (
        <button className='button'
            disabled={ started === null ? 'disabled' : null }
            onClick={ e => {
                if (started)
                    dispatch(stop())
                else {
                    dispatch(startAsync(4, 0, 180))
                    this.word.focus()
                }
            }}
        >
            { started ? 'Stop game' : 'Start game' }
        </button>
    )
}

Start.propTypes = {
    started: PropTypes.bool
}

const mapStateToProps = state => ({
    started: state.started
})

export default connect(mapStateToProps)(Start)
