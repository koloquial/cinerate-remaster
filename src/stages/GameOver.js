import { useEffect, useState } from 'react';

//functions
import { confetti } from '../functions/confetti';

function GameOver({ room, setStage }){
    const [winner, setWinner] = useState('');

    useEffect(() => {
        //find winner

        let temp = null;
        for(let i = 0; i < room.players.length; i++){
            if(!temp){
                temp = room.players[i];
            }

            if(room.players[i].score > temp.score){
                temp = room.players[i];
            }
        }

        setWinner(temp)
    }, [])
    const container = document.querySelector('.confetti-container');

    const colors = [
        'linear-gradient(45deg, #f39c12, #e74c3c)',    // Orange to Red
        'linear-gradient(45deg, #2ecc71, #3498db)',    // Green to Blue
        'linear-gradient(45deg, #9b59b6, #f1c40f)',    // Purple to Yellow
        'linear-gradient(45deg, #e67e22, #1abc9c)',    // Orange to Teal
        'linear-gradient(45deg, #2980b9, #8e44ad)',    // Blue to Purple
        'linear-gradient(45deg, #f1c40f, #e74c3c)',    // Yellow to Red
        'linear-gradient(45deg, #16a085, #f39c12)',    // Teal to Orange
        'linear-gradient(45deg, #d35400, #c0392b)',    // Dark Orange to Dark Red
        'linear-gradient(45deg, #8e44ad, #2c3e50)',    // Purple to Dark Blue
        'linear-gradient(45deg, #f39c12, #e67e22)',    // Orange to Light Orange
        'linear-gradient(45deg, #2ecc71, #27ae60)',    // Green to Dark Green
        'linear-gradient(45deg, #3498db, #2980b9)',    // Blue to Dark Blue
        'linear-gradient(45deg, #9b59b6, #8e44ad)',    // Light Purple to Dark Purple
        'linear-gradient(45deg, #f1c40f, #e67e22)',    // Yellow to Orange
        'linear-gradient(45deg, #1abc9c, #16a085)',    // Teal to Dark Teal
        'linear-gradient(45deg, #c0392b, #e74c3c)',    // Dark Red to Bright Red
        'linear-gradient(45deg, #34495e, #2c3e50)',    // Dark Blue to Darker Blue
        'linear-gradient(45deg, #f39c12, #f1c40f)',    // Orange to Light Yellow
        'linear-gradient(45deg, #16a085, #1abc9c)',    // Teal to Light Teal
        'linear-gradient(45deg, #8e44ad, #d35400)',    // Purple to Dark Orange
        'linear-gradient(45deg, #e67e22, #f1c40f)',    // Orange to Light Yellow
        'linear-gradient(45deg, #2980b9, #3498db)',    // Dark Blue to Blue
        'linear-gradient(45deg, #27ae60, #2ecc71)',    // Dark Green to Light Green
        'linear-gradient(45deg, #d35400, #f39c12)',    // Dark Orange to Orange
        'linear-gradient(45deg, #f1c40f, #2ecc71)',    // Light Yellow to Light Green
        'linear-gradient(45deg, #8e44ad, #f39c12)',    // Purple to Orange
        'linear-gradient(45deg, #2c3e50, #34495e)',    // Dark Blue to Dark Blue
        'linear-gradient(45deg, #f39c12, #2980b9)',    // Orange to Dark Blue
        'linear-gradient(45deg, #e74c3c, #c0392b)',    // Red to Dark Red
        'linear-gradient(45deg, #34495e, #2ecc71)',    // Dark Blue to Green
        'linear-gradient(45deg, #d35400, #16a085)',    // Dark Orange to Teal
        'linear-gradient(45deg, #2ecc71, #f1c40f)',    // Green to Yellow
    ];

    for (let i = 0; i < 25; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
    
        // Randomly set the position
        const leftPosition = Math.random() * 100;
        confetti.style.left = `${leftPosition}vw`;
        
        // Set random horizontal movement range
        const xMove = (Math.random() - 0.5) * 100; // Randomly moves left or right
        confetti.style.setProperty('--x-move', `${xMove}vw`);
    
        // Set random rotation value between 0 and 360 degrees
        const rotateValue = Math.random() * 360; 
        confetti.style.setProperty('--rotate', `${rotateValue}deg`);
        
        confetti.style.backgroundImage = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's'; // 2s to 4s duration
    
        container.appendChild(confetti);
    }

    return (
        <div className='view-container'>
            <div className='confetti-container'>
                <div className='confetti'></div>
                <div className='confetti'></div>
                <div className='confetti'></div>
                <div className='confetti'></div>
                <div className='confetti'></div>
                <div className='confetti'></div>
                <div className='confetti'></div>
                <div className='confetti'></div>
                <div className='confetti'></div>
                <div className='confetti'></div>
            </div>
            <br /><br />
            
            <div style={{width: '100%'}}> 
                <center>
                <h3>Winner</h3>
                <h1 style={{color: 'gold'}}>{winner.name}</h1>
                <br /><br />
                </center>
            

            <h4>Scoreboard</h4>
            <table>
                <tbody>
                {room.players.map(player => {
                    return (
                        <tr>
                            <td>
                                <p>{player.name}</p>
                            </td>
                            <td>
                                <p>{player.score}</p>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            <br /><br />
            <button onClick={() => {
                    setStage('splash')
                }}>Home</button>
                </div>
        </div>
    )
}

export default GameOver;