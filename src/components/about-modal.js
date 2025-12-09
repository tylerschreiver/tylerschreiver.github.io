import { useState } from "react"
import Stages from '../stages.json';

const AboutModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {/* info icon */}
      {/* { !isOpen && */}
        <div onClick={() => setIsOpen(true)} style={{ position: 'absolute', right: '20px', top: '20px', cursor: 'pointer' }}>
          <img
            className="image"
            src={`${process.env.PUBLIC_URL}/assets/info.svg`}
            alt="About"
            style={{ height: '32px', width: '32px' }}
          />
        </div>
      {/* } */}



      {/* overlay */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: "absolute",
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
          zIndex: 2,
          background: isOpen ? 'rgba(0,0,0,.6)' : 'transparent',
          transition: 'background .15s ease-in-out',
          pointerEvents: isOpen ? 'all' : 'none'
        }}
      />

      {/* actual modal */}
      <div
        style={{
          position: "absolute",
          left: '50%',
          top: isOpen ? '50%' : '-100%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#222',
          borderRadius: '8px',
          zIndex: 3,
          transition: 'top .15s ease-in-out',
          maxHeight: '95%',
          height: '950px',
          width: '650px',
          maxWidth: '95%',
          color: '#ddd',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        {/* close icon */}
        { isOpen && <div onClick={() => setIsOpen(false)} style={{ position: 'absolute', right: '16px', top: '16px', cursor: 'pointer', zIndex: 4 }}>
          <img
            className="image"
            src={`${process.env.PUBLIC_URL}/assets/close.svg`}
            alt="Close"
            style={{ height: '24px', width: '24px' }}
          />
        </div>}

        <div style={{ padding: '12px'}}>
          <h3>Basic rules</h3>

          <ul>
            <li>Each player selects 5 characters</li>
            <li>In Game 1, each player receives a random character from their selected list</li>
            <li>After each game:</li>
            <ul>
              <li>Each player's used character is removed from their remaining pool</li>
              <li>The winner receives a random character from their remaining pool</li>
              <li>The loser then counterpicks their character from their remaining pool</li>
            </ul>
            <li>The set continues until one player wins 3 games</li>
          </ul>

          <h3>Stages</h3>

          <ul>
            <li>Game 1, after each player has been assigned a character, strike stages until there's 1 left</li>
            <li>Optional Rule: After a game, the winner can strike 1 stage before the loser has selected their character</li>
            <li>DSR is off since characters and matchups are constantly changing</li>
            <li>You can use normal competitive stagelist</li>
            <li>Or you can you use this suggested fun stagelist:</li>
          </ul>

          <h4 style={{ width: '100%', display: "flex", justifyContent: "center", marginBottom: '4px', marginTop: '0' }}>
            Starters
          </h4>

          <div className="row" style={{ width: '100%', flexWrap: 'wrap', gap: '4px' }}>
            { Stages.starters.map((starter, index) => (
              <div style={{ display: "flex", alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
                <img
                  className="image"
                  src={`${process.env.PUBLIC_URL}/assets/stages/${starter.image}`}
                  alt={starter.name || `stage${index}`}
                  style={{ height: '100px' }}
                />
                <div>
                  { starter.name }
                </div>
              </div>
            ))}
          </div>

          <h4 style={{ width: '100%', display: "flex", justifyContent: "center", marginBottom: '4px' }}>
            Counterpick
          </h4>

          <div style={{ display: "flex", alignItems: 'center', flexDirection: 'column' }}>
            <img
              className="image"
              style={{ height: '100px' }}
              src={`${process.env.PUBLIC_URL}/assets/stages/${Stages.counterpick.image}`}
              alt={Stages.counterpick.name || `Poke Floats`}
            />
            <div>
              { Stages.counterpick.name }
            </div>
          </div>

          <h3>Items</h3>
          <ul>
            <li>Item Frequency: Medium</li>
            <li>Remove all healing items, Starman, and Cloaking Device</li>
            <li>Feel free to tweak to your liking</li>
          </ul>
        </div>
      </div>
    </div>

  )
}

export default AboutModal