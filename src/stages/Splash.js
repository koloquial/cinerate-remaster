import { useState } from 'react';

function Splash({ socket, entry, setNotification, publicRooms }){
    //text input values
    const [createRoomPassword, setCreateRoomPassword] = useState('');
    const [joinRoomID, setJoinRoomID] = useState('');
    const [joinRoomPassword, setJoinRoomPassword] = useState('');

    // game options
    const [gameOption, setGameOption] = useState('start');

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
        <div className='stage-container fade-in'>
                <h1>
                    <span className='title'>cine</span>
                    <span className='title-alt'>Rate</span>
                    <span className='text-small'>(v.1.1)</span>
                </h1>
                <p>
                    Guess IMDB movie ratings.
                </p>
           
                {gameOption === 'start' && <>
                <div className='action-container fade-in'>
                    <div className='button-grid'>
                        <button onClick={() => setGameOption('create game')}>Create Game</button>
                        <button onClick={() => setGameOption('join game')}>Join Game</button>
                    </div>
                </div>
                </>}
            
            {gameOption === 'create game' && 
            <div className='action-container fade-in'>
                <h4>Create Game</h4>

                <p>To create a private game, enter a password below before clicking <i>Create</i>. Leaving this field blank will create a public game.</p>

                <input 
                    type='text' 
                    id='createRoomPassword'
                    placeholder='(Optional) Password'
                    value={createRoomPassword} 
                    onChange={handler} 
                />  

                <div className='button-grid'>
                <button onClick={() => setGameOption('start')}>Back</button>
                <button onClick={createRoom}>Create</button>
                </div>
                </div>}

               
            
            {gameOption === 'join game' && <div className='action-container fade-in'>
                <h4>Join Game</h4>
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
                <div className='button-grid'>
                
                <button onClick={() => setGameOption('start')}>Back</button>
                <button onClick={joinRoom}>Join Game</button>
               </div>

                <div className='action-container fade-in' style={{marginTop: '20px'}}>
                <h4>Public Games</h4>
                <p>Click a public game to join.</p>
                <table>
                    <tbody>
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
                                            <b>Host: </b>
                                            {publicRooms[id].host.name}
                                        </p>
                                        </div>
                                       
                                        <div>
                                        <p>
                                            <b>Players: </b>
                                            {publicRooms[id].players.length}
                                        </p>
                                        </div>
                                       
                                            
                                    </div>
                                )
                            }else{
                                return;
                            }
                        })}
                </tbody>
            </table>
            
                    </div>
                </div>}
            
                
        </div>
    )
}

export default Splash;