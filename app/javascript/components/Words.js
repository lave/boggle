import React from 'react'
import PropTypes from 'prop-types'
import { CheckResult } from '../actions'

const Words = ({ board, words, checkWordAsync }) => {
    let score = 0
    let count = 0
    return (
        <table className='words'>
            <tbody>
                {words.map(word => {
                    if (word.checked === undefined)
                        checkWordAsync(word, board)

                    let data = checkData(word.checked)
                    if (isGood(word.checked))
                        count++
                    if (word.score)
                        score += word.score

                    return (
                        <tr key={word.id} className={data[1]}>
                            <td>{word.word}</td>
                            <td>{word.score === undefined ? '' : word.score}</td>
                            <td>{data[0]}</td>
                        </tr>
                    )}
                )}
                <tr className='wr-total'>
                    <td>Total</td>
                    <td>{score}</td>
                    <td>{count}</td>
                </tr>
            </tbody>
        </table>
    )}

function isGood(checkResult) {
    return checkResult == CheckResult.VALID
        || checkResult == CheckResult.TOO_SHORT
}

function checkData(checkResult) {
    switch (checkResult) {
        case undefined:
            return ['?', 'wr-un']
        case null:
            return ['?...', 'wr-un']
        case CheckResult.VALID:
            return ['OK', 'wr-ok']
        case CheckResult.TOO_SHORT:
            return ['too short', 'wr-short']
        case CheckResult.DUPLICATE:
            return ['duplicate', 'wr-bad']
        case CheckResult.NOT_A_WORD:
            return ['not a word', 'wr-bad']
        case CheckResult.NOT_ON_BOARD:
            return ['not on board', 'wr-bad']
        case CheckResult.ERROR:
            return ['error', 'wr-bad']
    }
}

Words.propTypes = {
    board: PropTypes.object,
    words: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            word: PropTypes.string.isRequired,
            checked: PropTypes.string,
            score: PropTypes.number
        }).isRequired
    ).isRequired
}

export default Words
