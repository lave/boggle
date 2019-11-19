import React from 'react'
import PropTypes from 'prop-types'

const Board = ({ board }) => (
    <table className='board'>
        <tbody>
            {board.cells.map((row, y) => (
                <tr key={y}>
                    {row.map((cell, x) => (
                        <td key={x}>{cell}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
)

Board.propTypes = {
    board: PropTypes.shape({
        size: PropTypes.number.isRequired,
        cells: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.string.isRequired
            ).isRequired
        ).isRequired
    }).isRequired
}

export default Board;
