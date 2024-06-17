//components
import ChatBox from '../components/ChatBox';

function AwaitPlayers({ socket, entry, room, setNotification }){
    const copyToClipboard = () => {
        // get the text field
        const copyText = document.getElementById('room-id');

        // select text field
        copyText.select();

        // for mobile devices
        copyText.setSelectionRange(0, 99999); 

        // copy text inside field
        navigator.clipboard.writeText(copyText.value);

        // set notification
        setNotification('Copied Room ID.');
    }

    function leaveRoom(){
        socket.emit('leave_room', {
            id: socket.id, 
            room: room
        });
    }

    function startGame(){
        if(room.players.length == 1){
            setNotification('You need at least two players to start a game.')
        }else{
            socket.emit('start_game', { id: room.id })
        }
    }
    
    return (
        <div className='stage-container'>
            <div className='full-width-container'>
                <h2>
                    Awaiting Critics
                </h2>
            </div>

            <div className='full-width-container'>
                {room.host.id === socket.id ? 
                    <button onClick={startGame}>
                        Start Game
                    </button>
                
                : <></>}
                <button onClick={leaveRoom}>
                    Leave Room
                </button>
            </div>

            <div className='full-width-container'>
                <h3>
                    Room ID ({room.password ? 'Private' : 'Public'})
                </h3>
                <input 
                    type='text' 
                    id='room-id' 
                    value={room.id} 
                    readOnly 
                />
                <button onClick={copyToClipboard}>
                    Copy ID
                </button>
            </div>
                
            <div className='full-width-container'>
                <h3>Critics ({room.players.length})</h3>
                <div className='critics-container'>
                    {room.players.map((player, index) => {
                        return (
                            <div key={`player-${index}`}>
                                <p>
                                    {player.name}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <ChatBox socket={socket} entry={entry} room={room} />
        </div>
    )
}

export default AwaitPlayers;