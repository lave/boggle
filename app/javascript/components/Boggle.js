import React from 'react'

import Board from 'containers/Board'
import Start from 'containers/Start'
import Timer from 'containers/Timer'
import AddWord from 'containers/AddWord'
import Words from 'containers/Words'

const Boggle = () => (
    <div className='main'>
        <h1>Game of Boogle</h1>
        <div className='rules'><b>Rules:</b> player's goal is to search for words that can be constructed from the letters of sequentially adjacent cubes, where "adjacent" cubes are those horizontally, vertically, and diagonally neighboring. Words must be at least three letters long, may include singular and plural (or other derived forms) separately, but may not use the same letter cube more than once per word. After time has elapsed, player must stop writing and the game enters the scoring phase.</div>
        <Board />
        <Start />
        <Timer />
        <AddWord />
        <Words />
    </div>
)

export default Boggle;
