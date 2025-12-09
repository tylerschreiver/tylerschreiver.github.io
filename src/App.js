import './App.css';
import { useEffect, useState } from 'react';
import SelectCharacters from './components/select-character';
import Pregame from './components/pre-game';
import Game from './components/game';
import PostGame from './components/post-game';
import AboutModal from './components/about-modal';

function App() {
  const [gameState, setGameState] = useState('cs-p1');
  const [p1Chars, setP1Chars] = useState([]);
  const [p2Chars, setP2Chars] = useState([]);
  const [selectedP1Char, setSelectedP1Char] = useState(null);
  const [selectedP2Char, setSelectedP2Char] = useState(null);
  const [winner, setWinner] = useState('g1');
  const [matchState, setMatchState] = useState({ p1: 0, p2: 0 });

  const onWinnerSet = selectedWinner => {
    const newP1Chars = p1Chars;
    newP1Chars.splice(newP1Chars.map(char => char.id).indexOf(selectedP1Char.id), 1);
    const newP2Chars = p2Chars;
    newP2Chars.splice(newP2Chars.map(char => char.id).indexOf(selectedP2Char.id), 1);
    setP1Chars(newP1Chars);
    setP2Chars(newP2Chars);
    setSelectedP1Char(null);
    setSelectedP2Char(null);
    setWinner(selectedWinner);
    let newMatchState = { ...matchState };
    newMatchState[selectedWinner] = matchState[selectedWinner] + 1;
    setMatchState(newMatchState);

    if (newMatchState.p1 === 3 || newMatchState.p2 === 3) {
      setGameState('postgame')
    } else {
      setGameState('pregame');
    }
  }

  const onMatchFinish = () => {
    setP1Chars([])
    setP2Chars([])
    setSelectedP1Char(null)
    setSelectedP2Char(null)
    setWinner('g1')
    setMatchState({ p1: 0, p2: 0 })
    setGameState('cs-p1')
  } 


  useEffect(() => {
    if (winner === 'g1' || matchState.p1 + matchState.p2 === 4) {
      console.log('yoo')
        const p1Char = Math.floor(Math.random() * p1Chars.length);
        setSelectedP1Char(p1Chars[p1Char]); 
        const p2Char = Math.floor(Math.random() * p2Chars.length);
        setSelectedP2Char(p2Chars[p2Char]);
    } else if (winner === 'p1') {
        const p1Char = Math.floor(Math.random() * p1Chars.length);
        setSelectedP1Char(p1Chars[p1Char]);
    } else if (winner === 'p2') {
        const p2Char = Math.floor(Math.random() * p2Chars.length);
        setSelectedP2Char(p2Chars[p2Char]);
    }
}, [p1Chars, p2Chars, winner, matchState])

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#222', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AboutModal />

      { gameState === 'cs-p1' &&
        <SelectCharacters
          characters={p1Chars}
          setChars={chars => setP1Chars(chars)}
          nextState={() => setGameState('cs-p2')}
          name="Player 1"
        />
      }
      { gameState === 'cs-p2' &&
        <SelectCharacters
          characters={p2Chars}
          setChars={chars => setP2Chars(chars)}
          nextState={() => setGameState('pregame')}
          name="Player 2"
        />
      }

      { gameState === 'pregame' &&
        <Pregame
          p1Chars={p1Chars}
          setP1Char={char => setSelectedP1Char(char)}
          selectedP1Char={selectedP1Char}
          p2Chars={p2Chars}
          setP2Char={char => setSelectedP2Char(char)}
          selectedP2Char={selectedP2Char}
          prevWinner={winner}
          nextState={() => setGameState('game')}
          matchState={matchState}
        />
      }

      { gameState === 'game' &&
        <Game
          p1Char={selectedP1Char}
          p2Char={selectedP2Char}
          setWinner={onWinnerSet}
          gameCount={matchState}
        />
      }

      { gameState === 'postgame' &&
        <PostGame
          startNewGame={onMatchFinish}
          matchState={matchState}
        />
      }
    </div>
  );
}

export default App;
