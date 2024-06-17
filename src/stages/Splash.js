import { useState } from 'react';

function Splash({ socket, entry, setNotification, publicRooms }){
    //text input values
    const [playerName, setPlayerName] = useState('');
    const [createRoomPassword, setCreateRoomPassword] = useState('');
    const [joinRoomID, setJoinRoomID] = useState('');
    const [joinRoomPassword, setJoinRoomPassword] = useState('');

    // //localStorage name check
    // useEffect(() => {
    //     if(playerName === ''){
    //        try{
    //         if(localhost.getItem('cinerate')){
    //             socket.emit('update_name', {
    //                 id: socket.id, 
    //                 name: localStorage.getItem('cinerate').name
    //             });
    //             setPlayerName(localStorage.getItem('cinerate').name)
    //         }
    //        } catch(e){}
    //     }
    // }, [playerName])

    //update player name
    const updatePlayerName = () => {
        if(playerName && playerName.length <= 10){
            socket.emit('update_name', {
                id: socket.id, 
                name: playerName
            });
            // localStorage.setItem('cinerate', { name: playerName})
            // setPlayerName('');
        }else{
            setNotification('Player name must be between 1 and 10 characters.');
        }
    }

    //onchange handlers
    const handler = (event) => {
        switch(event.target.id){
            case 'playerName': 
                setPlayerName(event.target.value); 
                break;
            case 'createRoomPassword': 
                setCreateRoomPassword(event.target.value); 
                break;
            case 'joinRoomPassword': 
                setJoinRoomPassword(event.target.value); 
                break;
            case 'joinRoomID': 
                setJoinRoomID(event.target.value); 
                break;
            default: break;
        }
    }

    //create room
    const createRoom = () => {
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

    return (
        <div className='stage-container'>
            <div className='title-container'>
                <h1>
                    <span className='title'>cine</span>
                    <span className='title-alt'>Rate</span>
                </h1>
                <p>
                    Guess movie ratings with friends
                </p>
            </div>

            <div className='half-width-container'>
                <h3>Name</h3>
                <input 
                    type='text' 
                    id='playerName'
                    placeholder={entry.name}
                    value={playerName} 
                    onChange={handler} 
                />
                <button onClick={updatePlayerName}>Update</button>
            
                <h3>Create Game</h3>
                <input 
                    type='text' 
                    id='createRoomPassword'
                    placeholder='(Optional) Password'
                    value={createRoomPassword} 
                    onChange={handler} 
                />  
                <button onClick={createRoom}>Create</button>
            
                <h3>Join Game</h3>
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
            </div>

            <div className='half-width-container'>
                <h3>Public Games</h3>
                <div className='public-game-container'>
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
                                    <p>
                                        Host: {publicRooms[id].host.name} &nbsp;&nbsp;
                                        Players: {publicRooms[id].players.length}/# &nbsp;&nbsp;
                                        Points: 5
                                    </p>

                                    
                                </div>
                            )
                        }else{
                            return;
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Splash;