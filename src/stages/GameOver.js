import { useEffect, useState } from 'react';

function GameOver({ room, setStage }){
    const [winner, setWinner] = useState('');
    console.log('room', room)

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
            <center>
                 
           <br /><br /> 
           <br /><br />
            <h3>Winner</h3>
            <h1 className='secondary'>{winner.name}</h1>
            <br /><br />
            <button onClick={() => {
                    setStage('splash')
                }}>Home</button>
           <br /><br /><br /><br />
                <h3 className='secondary'>Scoreboard</h3>
            <table style={{width: '100%'}}>
                <tbody>
                {room.players.map(player => {
                    return (
                        <tr>
                            <td style={{padding: '0px 10px 0px 0px'}}>
                                <p>{player.name}</p>
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <p>{player.score}</p>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            </center>
        </div>
    )
}

export default GameOver;