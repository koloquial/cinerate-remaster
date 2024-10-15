import { useState } from 'react';

//components
import ChatBox from '../components/ChatBox';

function AwaitPlayers({ socket, entry, room, setNotification }){
    const [playerName, setPlayerName] = useState('');

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

        //update player name
        const updatePlayerName = () => {
            if(playerName && playerName.length <= 10){
                socket.emit('update_name', {
                    id: socket.id, 
                    name: playerName,
                    room: room
                });
                
                setPlayerName('');
            }else{
                setNotification('Player name must be between 1 and 10 characters.');
            }
        }

            //onchange handlers
    const handler = (event) => {
        setPlayerName(event.target.value); 
    }
    
    
    return (
        <div className='stage-container'>
            <h3>
                Awaiting Critics
            </h3>           

            <div className='action-container'>


            <h4>Critics ({room.players.length})</h4>
               
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

            <h4>Name</h4>
                <input 
                    type='text' 
                    id='playerName'
                    placeholder={entry.name}
                    value={playerName} 
                    onChange={handler} 
                />
                <center>
                <button onClick={updatePlayerName}>Update</button>
                </center>
                
           
                

                <div className='button-grid'>
                    <button onClick={leaveRoom}>
                        Leave Room
                    </button>
                    <button onClick={copyToClipboard}>
                        Copy Room ID
                    </button>
                </div>

                    <center>
                {room.host.id === socket.id && 
               <button onClick={startGame}>
               Start Game
           </button>}
           </center>
                
            </div>
            
                
        </div>
    )
}

export default AwaitPlayers;