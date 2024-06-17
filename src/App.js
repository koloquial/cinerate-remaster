import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// components
import Loading from './components/Loading';

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
  const [publicRooms, setPublicRooms] = useState([])

  // socket listen
  useEffect(() => {

      console.log('socket updated', socket);

      // on connection retrieve id
      socket.on('entry', (data) => {
        console.log('entry');
        setEntry(data);
        setLoading(false);
      });

      // notifications
      socket.on('notification', (data) => {
        setNotification(data.message)
      });

      // update stage
      socket.on('update_stage', (data) => {
        setStage(data.stage);
      });

      // update room
      socket.on('update_room', (data) => {
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
        <div className='view-container'>
          {stage === 'splash' ?
              <Splash 
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
    </div>
  )
}

export default App;