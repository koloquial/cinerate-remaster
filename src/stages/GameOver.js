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
            
            <div style={{border: '5px double red', borderRadius: '5px', padding: '10px', width: '100%'}}> 
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