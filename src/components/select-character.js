import Characters from '../characters.json';
import { useEffect, useState } from 'react';
import './default.css'

const SelectCharacter = ({ characters, setChars, nextState, name }) => {
    const [rows, setRows] = useState([]);

    const removeCharacter = char => {
        let newChars = characters;
        newChars.splice(newChars.indexOf(char), 1);
        setChars([...newChars]);
    }

    const selectCharacter = char => {
        if (characters && characters.length !== 5) {
            setChars([...characters, char])
        }
    }

    useEffect(() => {
        if (Characters && Characters.character_rows) {
            const newRows = Characters && Characters.character_rows && Characters.character_rows.map(row => {
                return row.characters.filter(char => {
                    return !characters.map(c => c.id).includes(char.id)
                })
            })
    
            setRows(newRows)
        }
    }, [characters])

    return (
        <div className="character-select">
            <div className="title">{ name } select {5 - characters.length} character{characters.length !== 4 && 's'}</div>
            { rows && rows.length &&
                <div>
                    { rows && rows.length && rows.map(row => <div className="row">
                        {row.map(char => {
                            return <div onClick={() => selectCharacter(char)}>
                                <img className="image" src={`${process.env.PUBLIC_URL}/assets/${char.image}`} />
                            </div>
                        })}
                    </div> )}
                </div>
            }
            <div className="select-chars">
                <div className="title">Selected Character{characters && characters.length !== 1 && 's'}</div>
                <div className='row'>
                    {characters && characters.length ? characters.map(char => {
                        return <div onClick={() => removeCharacter(char)}>
                            <img className='image' src={`${process.env.PUBLIC_URL}/assets/${char.image}`} />
                        </div>
                    }) : null}
                </div>
            </div>

            {characters && characters.length === 5 ?
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => nextState()} className='confirm-btn'>Confirm Selected Characters</button>
                </div>
            : null}
        </div>
    );
}

export default SelectCharacter;