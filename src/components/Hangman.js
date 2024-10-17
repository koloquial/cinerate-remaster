import { useState, useEffect } from 'react';
import { getRandomMovie } from '../functions/getRandomMovie';

const Hangman = () => {
    const [target, setTarget] = useState([]);
    const [secret, setSecret] = useState([]);
    const [misses, setMisses] = useState([]);
    const [active, setActive] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const keyboardLayout = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ];

    const initializeGame = () => {
        const movie = getRandomMovie().toUpperCase().split('');
        const numbers = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
        
        const sec = movie.map(letter => {
            // Check if the letter is an uppercase letter (A-Z)
            if (/^[A-Z]$/.test(letter)) {
                return '_'; // Replace letters with underscores
            }
            return letter; // Keep special characters and spaces as they are
        });

        setSecret(sec);
        setTarget(movie);
        setMisses([]);
        setActive(true);
        
        // Enable all buttons since we're starting a new game
        keyboardLayout.flat().forEach(letter => {
            const button = document.getElementById(letter);
            if (button) button.disabled = false;
        });
    };

    useEffect(() => {
        initializeGame();
    }, []); 

    const handleLetter = (letter) => {
        if (!active) return;

        document.getElementById(letter).disabled = true;

        if (target.includes(letter)) {
            const updatedSecret = secret.map((char, i) => (target[i] === letter ? letter : char));
            setSecret(updatedSecret);
            if (!updatedSecret.includes('_')) setActive(false); // Win condition
        } else {
            setMisses(prev => [...prev, letter]);
            if (misses.length >= 7) setActive(false); // Lose condition
        }
    };

    const restartHangman = () => {
        setTarget([]);
        setSecret([]);
        setMisses([]);
        initializeGame();
    };

    return (
        <div className={`hangman ${isOpen ? 'open' : ''}`}  onClick={() => setIsOpen(true)}> 
            <p>{isOpen ? 'Guess the Movie' : 'Guess'}</p>

            {isOpen && <>
                <div>
                {misses.map((miss, index) => (
                    <span key={index} style={{
                        height: '10px',
                        width: '10px',
                        color: 'var(--primary)',
                        backgroundColor: 'transparent',
                        border: '1px solid var(--primary)',
                        fontSize: 'xx-small',
                        padding: '2px',
                        display: 'inline-block',
                        marginRight: '5px'
                    }}>X</span>
                ))}
            </div>

            <br />

            <div>
                {active && secret.map((letter, index) => (
                    <span key={index} style={{ marginRight: '10px', marginBottom: '10px', color: 'var(--gray)' }}>{letter}</span>
                ))}
            </div>

            {!active && (
                <div style={{ color: misses.length >= 7 ? 'var(--primary)' : 'gold' }}>
                    {target.join('')}
                </div>
            )}

            {active && (
                <div className="keyboard" style={{marginTop: '20px'}}>
                    {keyboardLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className="keyboard-row" >
                            {row.map(letter => (
                                <button
                                    key={letter}
                                    id={letter}
                                    className="keyboard-button"
                                    onClick={() => handleLetter(letter)}
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            )}

                {!active && <div className='action-container'><button onClick={restartHangman}>Again?</button></div>}

                <div className='inner-navigation'><button onClick={(e) => {  e.stopPropagation(); setIsOpen(false)}}>Close</button></div>
            </>}
           </div>
    );
};

export default Hangman;
