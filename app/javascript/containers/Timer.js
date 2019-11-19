import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { stop } from '../actions'

const Timer = ({ started, secondsLeft, dispatch }) => {
    if (started && secondsLeft == 0)
        dispatch(stop())

    return (
        <div className={'timer ' + getClass(secondsLeft)}>
            {timeString(secondsLeft)}
        </div>
    )
}

function getClass(secondsLeft)
{
    return secondsLeft < 5 ? 'timer-dngr'
        : secondsLeft < 10 ? 'timer-warn'
        : 'timer-ok'
}

function timeString(secondsLeft)
{
    return secondsLeft
        ?   (Math.floor(secondsLeft / 60)).toString().padStart(2, '0')
          + ':'
          + (secondsLeft % 60).toString().padStart(2, '0')
        : null
}

Timer.propTypes = {
    started: PropTypes.bool,
    secondsLeft: PropTypes.number
}

const mapStateToProps = state => ({
    started: state.started,
    secondsLeft: state.secondsLeft
})

export default connect(mapStateToProps)(Timer)
