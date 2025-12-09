import './default.css'

const Pregame = ({ p1Chars, setP1Char, selectedP1Char, p2Chars, setP2Char, selectedP2Char, prevWinner, nextState, matchState }) => {
    const isGameFive = () => matchState.p1 === 2 && matchState.p2 === 2

    return <div className='character-select'>
            { prevWinner === 'p2' && !isGameFive() && <>
                <div className='title'>Player 1 Choose Your Character</div>
                <div className='row players'>
                    {p1Chars.map(char => 
                        <img
                            key={char.id}
                            className={`image3 ${selectedP1Char && selectedP1Char.id === char.id ? 'winner' : ''}`}
                            src={`${process.env.PUBLIC_URL}/assets/characters/${char.image}`}
                            onClick={() => setP1Char(char)}
                            alt={char.name || 'Character'}
                        />
                    )}
                </div>
            </>}

                { selectedP1Char && (prevWinner === 'p1' || prevWinner === 'g1' || isGameFive()) && 
                    <div className='player'>
                        <div className='title'>Player 1</div>
                        <img className='image2' src={`${process.env.PUBLIC_URL}/assets/characters/${selectedP1Char.image}`} alt={selectedP1Char.name || 'Player 1 character'} />
                    </div>
                }
                { selectedP2Char && (prevWinner === 'p2' || prevWinner === 'g1' || isGameFive()) && 
                    <div className='player'>
                        <div className='title'>Player 2</div>
                        <img className='image2' src={`${process.env.PUBLIC_URL}/assets/characters/${selectedP2Char.image}`} alt={selectedP2Char.name || 'Player 2 character'}/>
                    </div>
                }

            { prevWinner === 'p1' && !isGameFive() && <>
                <div className='title'>Player 2 Choose Your Character</div>
                <div className='row players'>
                    {p2Chars.map(char => 
                        <img
                            key={char.id}
                            className={`image3 ${selectedP2Char && selectedP2Char.id === char.id ? 'winner' : ''}`}
                            src={`${process.env.PUBLIC_URL}/assets/characters/${char.image}`}
                            onClick={() => setP2Char(char)}
                            alt={char.name || 'Character'}
                        />
                    )}
                </div>
            </>}

            { !!selectedP1Char && !!selectedP2Char &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        className='confirm-btn'
                        onClick={() => nextState()}
                        style={{ marginTop: 100 }}
                    >
                        Start Game
                    </button>
                </div>
            }
    </div>
}


export default Pregame;