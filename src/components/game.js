import './default.css'
import { useState } from 'react'

const Game = ({ p1Char, p2Char, setWinner, gameCount }) => {
    const [currentWinner, setCurrentWinner] = useState(null);

    return <div className='character-select'>
        <div className='title' style={{ paddingBottom: 0 }}>Current Set Count</div>
        <div className='gamecount'>
            <div className='player'>
                <div>P1</div>
                <div>{gameCount.p1}</div>
            </div>
            <div className='player'>
                <div>P2</div>
                <div>{gameCount.p2}</div>
            </div>
        </div>

        <div className='title'>Select Winner</div>
        <div className='row players'>
            <div onClick={() => setCurrentWinner(currentWinner === 'p1' ? null : 'p1')}>
                <div className='title'>P1</div>
                <img 
                    className={`image2 ${currentWinner === 'p1' ? 'winner' : ''}`}
                    src={`${process.env.PUBLIC_URL}/assets/${p1Char.image}`}
                />
            </div>
            <div onClick={() => setCurrentWinner(currentWinner === 'p2' ? null : 'p2')}>
                <div className='title'>P2</div>
                <img 
                    className={`image2 ${currentWinner === 'p2' ? 'winner' : ''}`}
                    src={`${process.env.PUBLIC_URL}/assets/${p2Char.image}`}
                />
            </div>
        </div>

        { !!currentWinner && <div style={{ marginTop: 30, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <button className='confirm-btn' onClick={() => setWinner(currentWinner)}>
                Confirm Winner
            </button>
        </div>}
    </div>
}

export default Game;