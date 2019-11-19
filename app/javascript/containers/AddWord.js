import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addWord } from '../actions'

const AddWord = ({ started, dispatch }) => {
    let word

    return (
        <form
            onSubmit = { e => {
                e.preventDefault()
                if (!word.value.trim())
                    return

                dispatch(addWord(word.value))
                word.value = ''
            }}
        >
            <fieldset disabled={ started ? null : 'disabled' }>
                <input ref={ node => (word = node) } />
                <button type='submit' className='button'>Add word</button>
            </fieldset>
        </form>
    )
}

AddWord.propTypes = {
    started: PropTypes.bool
}

const mapStateToProps = state => ({
    started: state.started
})

export default connect(mapStateToProps)(AddWord)
