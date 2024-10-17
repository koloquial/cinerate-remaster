import { useState, useEffect } from 'react';
import ChatBox from "../components/ChatBox"

const AwaitGuesses = ({ socket, entry, room }) => {
    const [time, setTime] = useState(45);

    useEffect(() => {
        if(time > 0){
            setTimeout(() => setTime(time - 1), 1000);
        }
    }, [time])

    return (
        <div className='stage-container'>
            <h2>Waiting for Votes</h2>
            
            <div className='time-container'>
                <p>{time}</p>
            </div>
            <ChatBox socket={socket} entry={entry} room={room} />
        </div>
    )
}

export default AwaitGuesses;