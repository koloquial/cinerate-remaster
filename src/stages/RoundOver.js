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
            <div className='full-width-container'>
                <h2>Round Over</h2>
                <p>{time}s</p>
            </div>

            
                <div className='full-width-container' style={{border: '1px solid red'}}> 
                    <center>
                        <h1 className='gray'>{room.critMovie.Title}</h1>
                        <h2 className='secondary'>{room.critMovie.imdbRating}</h2>
                        <p>{room.critMovie.imdbVotes} votes</p>
                    </center>
                </div>

                <div className='full-width-container'>
                    <h3>{room.winners.length > 1 ? 'Winners' : ''}</h3>
                    <h3>{room.winners.length === 1 ? 'Winner' : ''}</h3>
                    <h3>{room.winners.length === 0 ? 'Push' : ''}</h3>

                    {room.winners[0] !== null ?
                        <table style={{width: '100%'}}>
                            <tbody>
                                {room.winners.map(winner => {
                                    return (
                                        <tr>
                                            <td>
                                                <p>{winner.user.name}</p>
                                            </td>
                                            <td style={{textAlign: 'right'}}>
                                                <p>{winner.vote}</p>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table> 
                    : <p>No winner.</p>}
                </div>

                <div className='full-width-container'>
                    <h3>Guesses</h3>
                    <table style={{width: '100%'}}>
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
                </div>

            <div className='full-width-container'>
                <h3>Scoreboard</h3>
                <table style={{width: '100%'}}>
                    <tbody>
                        {room.players.map(player => {
                            return (
                                <tr>
                                    <td s>
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
            </div>
            <ChatBox socket={socket} entry={entry} room={room} />
        </div>
    )
}
export default RoundOver;