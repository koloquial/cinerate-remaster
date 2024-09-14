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
            <h3>Round Over</h3>
            
            <div style={{border: '1px solid red', borderRadius: '5px', padding: '10px', width: '100%'}}> 
                <center>
                    <h2 className='gray' style={{margin: '5px'}}>
                        {room.critMovie.Title}
                    </h2>
                    <h1 style={{color: 'gold', margin: '5px'}}>
                        {room.critMovie.imdbRating}
                    </h1>
                    <p style={{margin: '5px'}}>
                        {room.critMovie.imdbVotes} votes
                    </p>
                </center>
            </div>
            
            <h4>
                {room.winners.length > 1 ? 
                'Winners' : <></>}

                {room.winners.length === 1 ? 
                'Winner' : <></>}

                {room.winners.length === 0 ? 
                'No Winner' : <></>}
            </h4>

            {room.winners[0] !== null ?
                <table>
                    <tbody>
                        {room.winners.map(winner => {
                            return (
                                <tr>
                                    <td>
                                        <p>
                                            {winner.user.name}
                                        </p>
                                    </td>
                                    <td>
                                        <p>
                                            {winner.vote}
                                        </p>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> 
            : <></>}
            
            <h4>Guesses</h4>
            <table>
                <tbody>
                    {room.guesses.map(guess => {
                        return (
                            <tr>
                                <td>
                                    <p>
                                        {guess.user.name}
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        {guess.vote}
                                    </p>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
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

            <div className='time-container'>
                <p>{time}</p>
            </div>

            <ChatBox socket={socket} entry={entry} room={room} />
        </div>
    )
}
export default RoundOver;