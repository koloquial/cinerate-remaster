import { useState, useEffect } from 'react';

function Splash({ socket, entry, setNotification, publicRooms, usersOnline }){
    //text input values
    const [createRoomPassword, setCreateRoomPassword] = useState('');
    const [joinRoomID, setJoinRoomID] = useState('');
    const [joinRoomPassword, setJoinRoomPassword] = useState('');
    const [playerName, setPlayerName] = useState('');

    // game options
    const [gameOption, setGameOption] = useState('start');

    //onchange handlers
    const handler = (event) => {
        switch(event.target.id){
            case 'createRoomPassword': 
                setCreateRoomPassword(event.target.value); 
                break;
            case 'joinRoomPassword': 
                setJoinRoomPassword(event.target.value); 
                break;
            case 'joinRoomID': 
                setJoinRoomID(event.target.value); 
                break;
            case 'playerName':
                setPlayerName(event.target.value);
                break;
            default: break;
        }
    }

    //create room
    const createRoom = () => {
        console.log('socket id', socket.id);
        
        socket.emit('create_room', {
            id: socket.id, 
            password: createRoomPassword
        });
    }

    //join room by ID/Password
    const joinRoom = () => {
        socket.emit("join_room", {
            id: socket.id, 
            room: joinRoomID, 
            password: joinRoomPassword
        });
    }

    //join public room
    const joinPublicRoom = (roomID) => {
        socket.emit("join_room", {
            id: socket.id, 
            room: roomID, 
            password: joinRoomPassword
        });
    }

    //update player name
    const updatePlayerName = () => {
        if(playerName && playerName.length <= 10){
            socket.emit('update_name', {
                id: socket.id, 
                name: playerName,
            });
            setPlayerName('');
        }else{
            setNotification('Name between 1-10 characters.');
        }
    }

    return (
        <div className='view-container fade-in'>
            <div>
                <h1>
                    <span className='title'>cine</span>
                    <span>Rate</span>
                    <span className='text-small'> (v.1.3)</span>
                </h1>

                <p className='subtitle'>
                    Guess IMDB movie ratings.
                </p>
            </div>
                
            {gameOption === 'start' &&
                <>
                    <p className='form-label'>Name:</p>
                        <div className='form-grid'>
                            <input 
                                type='text' 
                                id='playerName'
                                placeholder={entry.name}
                                value={playerName} 
                                onChange={handler} 
                            />
                            <button onClick={updatePlayerName}>Update</button>
                        </div>

                    <div className='action-container'>
                    <h2>Enter the Fray</h2>
                    <div className='button-grid'>
                        <button onClick={() => setGameOption('create game')}>Create Game</button>
                        <button onClick={() => setGameOption('join game')}>Join Game</button>
                    </div>
                    </div>
                </>}

            {gameOption === 'create game' && 
                <div className='action-container fade-in'>
                    <h2>Create Game</h2>

                    <p>To create a private game enter a password.</p>

                    <p>Leaving the password blank will create a public game.</p>

                    <div className='action-container'>
                    <p className='form-label'>Password: </p>
                    
                    <div className='form-grid'>
                    <input 
                        type='text' 
                        id='createRoomPassword'
                        placeholder='(Optional) Password'
                        value={createRoomPassword} 
                        onChange={handler} 
                    />  
                    <button onClick={createRoom}>Create</button>
                    </div>
                    </div>
                    
                    <div className='inner-navigation'>
                        <button onClick={() => setGameOption('start')}>Back</button>
                    </div>
                </div>}

                {gameOption === 'join game' && <div className='action-container fade-in'>
                    <h2>Join Game</h2>
                    <p>Enter the Room ID (and password, if applicable) for the room you wish to join.</p>
                    <input 
                        type='text'
                        id='joinRoomID' 
                        value={joinRoomID} 
                        onChange={handler} 
                        placeholder='Room ID' 
                    />
                   
                    <input 
                        type='text'
                        id='joinRoomPassword' 
                        value={joinRoomPassword} 
                        onChange={handler} 
                        placeholder='Room Password'  
                    />
                    <button onClick={joinRoom}>Join</button>
                  
                    <div className='inner-navigation'>
                        <button onClick={() => setGameOption('start')}>Back</button>
                    </div>
            </div>}

            {gameOption === 'start' && 
            <div className='action-container fade-in'>
                <h2>Public Games</h2>
                <p><span className='inline-label'>Users Online: </span> {usersOnline}</p>
                    
                    {Object.keys(publicRooms).map((id, index) => {
                        //check if public room has password
                        if(publicRooms[id].password === '' && publicRooms[id].players.length < 4 && !publicRooms[id].active){
                            //room does not have a password
                            return (
                                <div 
                                    className='public-game'
                                    key={`room-${id}-${index}`}
                                    onClick={() => joinPublicRoom(id)}
                                >
                                    <div>
                                        <p>
                                            <span className='inline-label'>Host: </span>
                                            {publicRooms[id].host.name}
                                        </p>
                                    </div>
                                
                                    <div>
                                        <p>
                                            <span className='inline-label'>Critics: </span>
                                            {publicRooms[id].players.length}
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>}
        </div>
    )
}

export default Splash;