import { useState } from 'react';

//components
import ChatBox from '../components/ChatBox';

function AwaitPlayers({ socket, entry, room, setNotification }){
  
    const copyToClipboard = () => {
        // // get the text field
        // const copyText = document.getElementById('room-id');

        // // select text field
        // copyText.select();

        // // for mobile devices
        // copyText.setSelectionRange(0, 99999); 

        // copy text inside field
        navigator.clipboard.writeText(room.id);

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
            <h2>Awaiting Critics</h2>           

            <div className='action-container'>
                <p><span className='inline-label'>Critics: </span>{room.players.length}</p>
               
                <div className='block'>
                    {room.players.map((player, index) => {
                        return (
                                <p style={{display: 'inline', marginRight: '5px'}} key={`player-${index}`}>
                                    {player.name}
                                </p>
                        )
                    })}
                </div>
            </div>

            <div className='action-container fade-in'>
                <button onClick={leaveRoom}>
                    Leave Room
                </button>
                <button onClick={copyToClipboard}>
                    Copy Room ID
                </button>
                {room.host.id === socket.id && 
                    <button onClick={startGame}>
                        Start Game
                    </button>}
            </div>
        </div>
    )
}

export default AwaitPlayers;