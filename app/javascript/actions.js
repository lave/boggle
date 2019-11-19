export const ACTION_GAME_START = 'ACTION_GAME_START'
export const ACTION_GAME_STARTED = 'ACTION_GAME_STARTED'
export const ACTION_GAME_FAILED_START = 'ACTION_GAME_FAILED_START'

export const ACTION_GAME_STOP = 'ACTION_GAME_STOP'

export const ACTION_TIMER = 'ACTION_TIMER'

export const ACTION_ADD_WORD = 'ACTION_ADD_WORD'

export const ACTION_CHECK_WORD = 'ACTION_CHECK_WORD'
export const ACTION_CHECKED_WORD = 'ACTION_CHECKED_WORD'
export const ACTION_FAILED_CHECK_WORD = 'ACTION_FAILED_CHECK_WORD'

export const CheckResult = {
    VALID: 'VALID',
    TOO_SHORT: 'TOO_SHORT',
    DUPLICATE: 'DUPLICATE',
    NOT_A_WORD: 'NOT_A_WORD',
    NOT_ON_BOARD: 'NOT_ON_BOARD',
    ERROR: 'ERROR'
}

let nextId = 0

function start()
{
    return { type: ACTION_GAME_START }
}

function started(board, seconds)
{
    nextId = 0
    return { type: ACTION_GAME_STARTED, board, seconds }
}

function failedStart(error)
{
    return { type: ACTION_GAME_FAILED_START, error }
}


let timer = null

export function startAsync(size, seed, seconds)
{
    return dispatch => {
        dispatch(start())

        return fetch(`v1/boggle/genBoard?size=${size}&seed=${seed}`)
            .then(
                response => response.json(),
                error => {
                    console.log('Failed to generate board:', size, seed, error)
                    dispatch(failedStart(word.id, error))
                })
            .then(json => {
                    dispatch(started(json.board, seconds))

                    clearInterval(timer)
                    timer = setInterval(() => dispatch(tickTimer()), 1000)
                })
    }
}

export function stop()
{
    clearInterval(timer)
    return { type: ACTION_GAME_STOP }
}

function tickTimer()
{
    return { type: ACTION_TIMER }
}

export function addWord(word)
{
    return { type: ACTION_ADD_WORD, id: nextId++, word: word.toUpperCase() }
}

function toString(board)
{
    return board.cells.map(row =>
        row.map(cell => cell[0]).join('')
    ).join('')
}

export function checkWordAsync(word, board)
{
    return dispatch => {
        dispatch(checkWord(word.id))

        return fetch(`v1/boggle/checkWord?id=${word.id}&word=${word.word}&board=${toString(board)}&size=${board.size}`)
            .then(
                response => response.json(),
                error => {
                    console.log('Failed to check word:', word, error)
                    dispatch(failedCheckWord(word.id, error))
                })
            .then(json =>
                    dispatch(checkedWord(parseInt(json.id), json.result, json.score))
                )
    }
}

function checkWord(id)
{
    return { type: ACTION_CHECK_WORD, id }
}

function checkedWord(id, result, score)
{
    return { type: ACTION_CHECKED_WORD, id, result, score }
}

function failedCheckWord(id, error)
{
    return { type: ACTION_FAILED_CHECK_WORD, id, error }
}

