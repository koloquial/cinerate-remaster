import { useState } from 'react';

const Splash = ({ socket, entry, setNotification, publicRooms }) => {
    //text input values
    const [playerName, setPlayerName] = useState('');
    const [createRoomPassword, setCreateRoomPassword] = useState('');
    const [joinRoomID, setJoinRoomID] = useState('');
    const [joinRoomPassword, setJoinRoomPassword] = useState('');

    //update player name
    const updatePlayerName = () => {
        if(playerName && playerName.length <= 10){
            socket.emit('update_name', {
                id: socket.id, 
                name: playerName
            });
            setPlayerName('');
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
                <span className='secondary title'>Cine</span><span className='title-alt'>Rate</span>
              </h1>
                <p>
                    Guess movie ratings with friends
                </p>
            </div>

            <p>Name</p>
            <input 
                type='text' 
                id='playerName'
                placeholder={entry.name}
                value={playerName} 
                onChange={handler} 
            />
            <button onClick={updatePlayerName}>Update</button>
           
            <p>Create Game</p>
            <input 
                type='text' 
                id='createRoomPassword'
                placeholder='(Optional) Password'
                value={createRoomPassword} 
                onChange={handler} 
            />  
            <button onClick={createRoom}>Create</button>
           
            <p>Join Game</p>
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
          
            <p>Public Games</p>
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
                            <table style={{width: '100%'}}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className='primary'>Host: </span>{publicRooms[id].host.name}
                                        </td>
                                        <td style={{textAlign: 'right'}}>
                                            <span className='primary'>Players: </span>{publicRooms[id].players.length}/4
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }else{
                    return;
                }
            })}
            </div>
        </div>
    )
}

export default Splash;