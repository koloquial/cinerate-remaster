import { useState } from 'react';

const ChatBox = ({ socket, entry, room }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        //send message to server
        socket.emit('send_message', {id: room.id, name: entry.name, message: message});
        
        //remove text from input
        setMessage('');
    }

    const handleMessage = (event) => {
        setMessage(event.target.value);
    }

    return (
        <>
            <div className='chat-window'>
                {room.chat.map(line => {
                    return (
                        <p>
                            <span style={{color: 'white'}}>
                                {line.name}:&nbsp;
                            </span> 
                            <span style={{color: 'gray'}}>
                                {line.message}
                            </span>
                        </p>
                    )
                })}
            </div>
            <input 
                type='text' 
                value={message} 
                placeholder='Type message...' 
                onChange={handleMessage} 
            />
            <button onClick={sendMessage}>Send</button>
        </>
    )
}

export default ChatBox;