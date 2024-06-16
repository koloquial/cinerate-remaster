import { useState, useEffect } from 'react';
import ChatBox from '../components/ChatBox';

const RoundOver = ({ socket, entry, room }) => {
    const [time, setTime] = useState(10);
    const [gameOver, setGameOver] = useState(false);

    function nextRound(){
        if(gameOver){
            socket.emit('game_over', {room: room.id});
        }else{
            socket.emit('next_round', {room: room.id});
        }
    }

    useEffect(() => {
        setTimeout(() => setTime(time - 1), 1000);
        if(time === 0){
            //call next round if host
            if(room.host.id === socket.id){
                nextRound();
            }
        }
    }, [time]);


    useEffect(() => {
        const winners = [];
        room.players.forEach(player => {
            if(player.score === 5){
                winners.push(player);
            }
        })
        if(winners.length > 0){
            setGameOver(true);
        }
    });

    return (
        <div className='stage-container'>
            <table style={{width: '100%'}}>
                <tbody>
                    <tr>
                        <td>
                            <p>Round Over</p>
                        </td>
                        <td style={{textAlign: 'right'}}>
                            <p>{time}s</p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 style={{marginBottom: '0px'}}>{room.critMovie.Title}</h3>

                <table style={{width: '100%', marginTop: '0px'}}>
                    <tbody>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{width: '33%'}}>
                                <p><span className='secondary'>Rating</span><br />{room.critMovie.imdbRating}</p>
                            </td>
                            <td style={{width: '33%'}}>
                                <p><span className='secondary'>Votes</span><br />{room.critMovie.imdbVotes}</p>
                            </td>
                            <td style={{width: '33%'}}>
                                <p><span className='secondary'>Metascore</span><br />{room.critMovie.Metascore}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>

          
                <h3 className='secondary'>{room.winners.length > 1 ? 'Winners' : ''}</h3>
                <h3 className='secondary'>{room.winners.length === 1 ? 'Winner' : ''}</h3>
                <h3 className='secondary'>{room.winners.length === 0 ? 'Push' : ''}</h3>

                {room.winners[0] !== null ?
                    <table style={{width: '100%', borderSpacing: '5px'}}>
                        <tbody>
                        {room.winners.map(winner => {
                            return (
                                <tr>
                                    <td style={{padding: '0px 10px 0px 0px'}}>
                                        <p>{winner.user.name}</p>
                                    </td>
                                    <td style={{textAlign: 'right'}}>
                                        <p>{winner.vote}</p>
                                    </td>
                                </tr>
                            )
                            })}
                        </tbody>
                    </table> : <p>No winner.</p>}
            
            <br />

                            <h3 className='secondary'>Guesses</h3>
            <table style={{width: '100%', borderSpacing: '5px'}}>
                <tbody>
                    {room.guesses.map(guess => {
                        return (
                            <tr>
                                <td>
                                    <p>{guess.user.name}</p>
                                </td>
                                <td style={{textAlign: 'right'}}>
                                    {parseFloat(guess.vote) === parseFloat(room.critMovie.imdbRating) ?
                                        <p style={{color: 'gold'}}>{guess.vote}</p> : <></>}
                                    {parseFloat(guess.vote) > parseFloat(room.critMovie.imdbRating) ?
                                        <p style={{color: 'red'}}>{guess.vote}</p> : <></>}
                                    {parseFloat(guess.vote) < parseFloat(room.critMovie.imdbRating) ?
                                        <p>{guess.vote}</p> : <></>}   
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <h3 className='secondary'>Scoreboard</h3>
            <table style={{width: '100%', borderSpacing: '5px'}}>
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
                
            <ChatBox socket={socket} entry={entry} room={room} />
            
        </div>
    )
}
export default RoundOver;