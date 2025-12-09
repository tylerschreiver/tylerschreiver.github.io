import './default.css'

const PostGame = ({ startNewGame, matchState }) => {
    const didP1Win = () => matchState.p1 === 3;

    return <div>
        <div className="title">
            { didP1Win()
                ? `Player 1 wins ${matchState.p1}-${matchState.p2}`
                : `Player 2 wins ${matchState.p2}-${matchState.p1}` 
            }
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => startNewGame()} className='confirm-btn'>Start New Set</button>
        </div>
    </div>
}

export default PostGame;