import { useState, useEffect } from 'react';

const ChatBox = ({ socket, entry, room }) => {
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    function sendMessage(){
        //send message to server
        socket.emit('send_message', {id: room.id, name: entry.name, message: message});
        
        //remove text from input
        setMessage('');
    }

    function handleMessage(event){
        setMessage(event.target.value);
    }

    useEffect(() => {
        console.log('called');
        let div = document.getElementById('chat');
        
        if (div) {
            // Add the flashing class
            div.classList.add('flashing');
    
            // Remove the flashing class after 1 second (animation duration)
            const timeoutId = setTimeout(() => {
                div.classList.remove('flashing');
            }, 1000); // This matches the duration of the flash animation (1s)
    
            // Clean up the timeout on unmount
            return () => clearTimeout(timeoutId);
        }
    }, [room]); // Trigger effect when room changes

    return (
        <>
        <div id='chat' className={`chat ${isOpen ? 'open' : ''}`}  onClick={() => setIsOpen(true)}>
            <p>Chat</p>
            {isOpen ? 
                <>
                    <div id='chat-window' className='chat-window'>
                        
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
                    <div className='button-grid'>
                        <button onClick={(e) => {  e.stopPropagation(); setIsOpen(false)}}> Close</button>
                        <button onClick={sendMessage}>Send</button>
                    </div>
                    
                </> : <></>}
        </div>
        </>
    )
}

export default ChatBox;