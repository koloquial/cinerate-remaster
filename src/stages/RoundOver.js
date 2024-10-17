import { useState, useEffect } from 'react';
import ChatBox from '../components/ChatBox';

const RoundOver = ({ socket, entry, room }) => {
    const [time, setTime] = useState(8);
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
            <h2>Round Over</h2>

            <p>{room.critMovie.Title}</p>

                    <h1 style={{color: 'gold', marginTop: '20px'}}>
                        {room.critMovie.imdbRating}
                    </h1>
                    <p>
                        {room.critMovie.imdbVotes} votes
                    </p>
                   

                    <div className='alt-block'>
                    <h3>
                        {room.winners.length > 1 ? 
                        'Winners' : <></>}

                        {room.winners.length === 1 ? 
                        'Winner' : <></>}

                        {room.winners.length === 0 ? 
                        'No Winner' : <></>}
                    </h3>
           

            {room.winners[0] !== null &&
            <>
                        {room.winners.map(winner => {
                            return (
                                <div className='round-over-grid'>
                                    <div>
                                        <p>
                                            {winner.user.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            {winner.vote}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                        </>}
                        </div>
                        
            
                        <div className='alt-block'>
            <h3>Guesses</h3>

                    {room.guesses.map(guess => {
                        return (
                            <div className='round-over-grid'>
                                <div>
                                <p>
                                        {guess.user.name}
                                    </p>
                                </div>
                                <div>
                                <p>
                                        {guess.vote}
                                    </p>
                                </div>
                                </div>
                               
                        )
                    })}
            </div>
         
            
            <div className='alt-block'>
            <h3>Scoreboard</h3>
                    {room.players.map(player => {
                        return (
                            <div className='round-over-grid'>
                                <div>
                                <p>{player.name}</p>
                                </div>
                                <div>
                                <p>{player.score}</p>
                                </div>
                            </div>
                        )
                    })}
                    </div>

            <div className='time-container'>
                <p>{time}</p>
            </div>

            <ChatBox socket={socket} entry={entry} room={room} />
        </div>
    )
}
export default RoundOver;