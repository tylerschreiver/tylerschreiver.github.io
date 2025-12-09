import './default.css'
import { useEffect } from 'react'

const Pregame = ({ p1Chars, setP1Char, selectedP1Char, p2Chars, setP2Char, selectedP2Char, prevWinner, nextState, matchState }) => {
    const isGameFive = () => matchState.p1 === 2 && matchState.p2 === 2;

    useEffect(() => {
        if (prevWinner === 'g1' || isGameFive()) {
            const p1Char = Math.floor(Math.random() * p1Chars.length);
            setP1Char(p1Chars[p1Char]); 
            const p2Char = Math.floor(Math.random() * p2Chars.length);
            setP2Char(p2Chars[p2Char]);
        } else if (prevWinner === 'p1') {
            const p1Char = Math.floor(Math.random() * p1Chars.length);
            setP1Char(p1Chars[p1Char]);
        } else if (prevWinner === 'p2') {
            const p2Char = Math.floor(Math.random() * p2Chars.length);
            setP2Char(p2Chars[p2Char]);
        }
    }, [p1Chars, p2Chars, prevWinner])

    return <div className='character-select'>
            { prevWinner === 'p2' && !isGameFive() && <>
                <div className='title'>Player 1 Choose Your Character</div>
                <div className='row players'>
                    {p1Chars.map(char => 
                        <img
                            className={`image3 ${selectedP1Char && selectedP1Char.id === char.id ? 'winner' : ''}`}
                            src={`${process.env.PUBLIC_URL}/assets/${char.image}`}
                            onClick={() => setP1Char(char)}
                        />
                    )}
                </div>
            </>}

                { selectedP1Char && (prevWinner === 'p1' || prevWinner === 'g1' || isGameFive()) && 
                    <div className='player'>
                        <div className='title'>Player 1</div>
                        <img className='image2' src={`${process.env.PUBLIC_URL}/assets/${selectedP1Char.image}`} />
                    </div>
                }
                { selectedP2Char && (prevWinner === 'p2' || prevWinner === 'g1' || isGameFive()) && 
                    <div className='player'>
                        <div className='title'>Player 2</div>
                        <img className='image2' src={`${process.env.PUBLIC_URL}/assets/${selectedP2Char.image}`}/>
                    </div>
                }

            { prevWinner === 'p1' && !isGameFive() && <>
                <div className='title'>Player 2 Choose Your Character</div>
                <div className='row players'>
                    {p2Chars.map(char => 
                        <img
                            className={`image3 ${selectedP2Char && selectedP2Char.id === char.id ? 'winner' : ''}`}
                            src={`${process.env.PUBLIC_URL}/assets/${char.image}`}
                            onClick={() => setP2Char(char)}
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