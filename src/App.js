import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// components
import Loading from './components/Loading';
import ChatBox from './components/ChatBox';
import Hangman from './components/Hangman';

// stages
import Splash from './stages/Splash';
import AwaitPlayers from './stages/AwaitPlayers';
import AssignMovie from './stages/AssignMovie';
import CastVote from './stages/CastVote';
import AwaitGuesses from './stages/AwaitGuesses';
import RoundOver from './stages/RoundOver';
import AssignDealer from './stages/AssignDealer';
import GameOver from './stages/GameOver';

// socket
const SOCKET_SERVER = process.env.REACT_APP_SOCKET_SERVER;
const socket = io.connect(SOCKET_SERVER);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState('splash');
  const [entry, setEntry] = useState({id: '', name: '', score: ''});
  const [notification, setNotification] = useState('');
  const [room, setRoom] = useState();
  const [publicRooms, setPublicRooms] = useState([]);
  const [usersOnline, setUsersOnline] = useState();


  // socket listen
  useEffect(() => {
      // on connection retrieve id
      socket.on('entry', (data) => {
          setEntry(data);
          setLoading(false);
      });

            // users online
            socket.on('users_online', (data) => {      
              setUsersOnline(Object.keys(data).length)
            });

      // notifications
      socket.on('notification', (data) => {
        setNotification(data.message)
      });

      // update stage
      socket.on('update_stage', (data) => {
        setStage(data.stage);
      });

      // update quote
      socket.on('update_quote', (data) => {
        console.log('update quote', data)
      });

      // update room
      socket.on('update_room', (data) => {
        setRoom(data);
      });

      // update room chat notification
      socket.on('update_room_chat_notification', (data) => {
        setRoom(data);
      });

      // update public rooms
      socket.on('update_public_rooms', (data) => {
        setPublicRooms(data);
      });
  }, [socket])


  // notification timeout
  useEffect(() => {
    if(notification){
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
  }, [notification])

  return (
    <div className='container'>
      {loading ? <Loading /> : 
        <div className='stage-container'>
          {stage === 'splash' ?
              <Splash
              usersOnline={usersOnline} 
                socket={socket}
                entry={entry}
                publicRooms={publicRooms}
                setNotification={setNotification}
              />
             : <></>}

          {stage === 'await-players' ? 
            <AwaitPlayers
              socket={socket}
              entry={entry}
              room={room}
              setNotification={setNotification}
            /> : <></>}

          {stage === 'assign-movie' ? 
            <AssignMovie
              socket={socket}
              entry={entry}
              room={room}
              setNotification={setNotification}
            /> : <></>}

          {stage === 'cast-vote' ? 
            <CastVote
              socket={socket}
              room={room}
              setStage={setStage}
              setNotification={setNotification}
            /> : <></>}

          {stage === 'await-guesses' ?
                <AwaitGuesses 
                    socket={socket}
                    entry={entry}
                    room={room} 
                /> : <></>}

          {stage === 'round-over' ?
                <RoundOver 
                    socket={socket}
                    entry={entry}
                    room={room}
                /> : <></>}

          {stage === 'assign-dealer' ?
                <AssignDealer 
                    room={room}
                /> : <></>}

          {stage === 'game-over' ?
                <GameOver 
                    room={room}
                    setStage={setStage}
                /> : <></>}
        </div>
      }

      <div className='notification-bar'>
        <p>
          {notification}
        </p>
      </div>
      
       {stage !== 'splash' && <Hangman />}
       {stage !== 'splash' && <ChatBox socket={socket} entry={entry} room={room} />}
    </div>
  )
}

export default App;