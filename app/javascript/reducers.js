import { combineReducers } from 'redux'

import {
    ACTION_GAME_START,
    ACTION_GAME_STARTED,
    ACTION_GAME_FAILED_START,
    ACTION_GAME_STOP,
    ACTION_TIMER,
    ACTION_ADD_WORD,
    ACTION_CHECK_WORD,
    ACTION_CHECKED_WORD,
    ACTION_FAILED_CHECK_WORD,
    CheckResult
} from './actions'


function started(state = false, action) {
    switch (action.type) {
        case ACTION_GAME_START:
            return null
        case ACTION_GAME_STARTED:
            return true
        case ACTION_GAME_FAILED_START:
            return false
        case ACTION_GAME_STOP:
            return false
        default:
            return state
    }
}


const fakeBoard = {
    size: 4,
    cells: ['MAKE', 'WORD', 'FROM', 'THIS'].map(s => s.split(''))
}

function board(state = fakeBoard, action) {
    switch (action.type) {
        case ACTION_GAME_STARTED:
            return action.board
        default:
            return state
    }
}

function secondsLeft(state = null, action) {
    switch (action.type) {
        case ACTION_GAME_STARTED:
            return action.seconds
        case ACTION_TIMER:
            return state - 1
        default:
            return state
    }
}

function setCheckResult(words, result)
{
    return words.map(word => word.id === result.id
        ? { ...word, checked: result.result, score: result.score }
        : word)
}

function hasWord(words, word)
{
    return words.find(w => w.word == word)
}

function words(state = [], action) {
    switch (action.type) {
        case ACTION_GAME_STARTED:
            return []
        case ACTION_ADD_WORD:
            return [
                ...state,
                {
                    id: action.id,
                    word: action.word,
                    checked: hasWord(state, action.word) ? CheckResult.DUPLICATE : undefined
                }]
        case ACTION_CHECK_WORD:
            return setCheckResult(state, { ...action, result: null })
        case ACTION_CHECKED_WORD:
            return setCheckResult(state, action)
        case ACTION_FAILED_CHECK_WORD:
            return setCheckResult(state, { ...action, result: CheckResult.ERROR })
        default:
            return state
    }
}

export default combineReducers({
    started,
    board,
    secondsLeft,
    words
})
