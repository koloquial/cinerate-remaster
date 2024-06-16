import { useEffect, useState } from 'react';
import noposter from '../images/no-poster.png';

function CastVote({ socket, room, setStage, setNotification }){
    const [castVote, setCastVote] = useState(0.0);
    const [time, setTime] = useState(30);
    const [poster, setPoster] = useState('');

    const handleCastVote = (event) =>{
        setCastVote(event.target.value);
    }

    const cast = () => {
        socket.emit('cast_vote', {id: socket.id, room: room.id, vote: castVote});
        setStage('await-guesses');
        setNotification('Rating submitted.');
    }

    function checkIfImageExists(url, callback) {
        const img = new Image();
        img.src = url;
    
        if (img.complete) {
          callback(true);
        } else {
          img.onload = () => {
            callback(true);
          };
          
          img.onerror = () => {
            callback(false);
          };
        }
      }
    
      useEffect(() => {
        checkIfImageExists(room.critMovie.Poster, (exists) => {
          if (exists) {
            setPoster(room.critMovie.Poster)
          } else {
            setPoster(noposter)
          }
        });
      }, [])

    useEffect(() => {
        setTimeout(() => setTime(time - 1), 1000);
        if(time === 0){
            cast();
        }
    }, [time])

    return (
        <div className='stage-container'>
            <table style={{width: '100%'}}>
                <tbody>
                    <tr>
                        <td>
                            <p>Cast Vote</p>
                        </td>
                        <td style={{textAlign: 'right'}}>
                            <p>{time}s</p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <center>
                <h3>{room.critMovie.Title}</h3>
                <p>
                    {room.critMovie.Year} ({room.critMovie.Rated}) {room.critMovie.Genre}
                </p>
            </center>

            <div className='movie-vote-container'>
                <div>
                    <img 
                        src={poster} 
                        style={{
                            maxWidth: '240px', maxHeight: '360px'
                        }} 
                    />
                </div>
                
                <div>
                    <p style={{marginTop: '0px'}} className='primary'>
                        Director
                    </p>

                    <p>
                        {room.critMovie.Director}
                    </p>

                    <p className='primary'>
                        Cast
                    </p>

                    {room.critMovie.Actors.split(',').map((line, index) => {
                        return <p>{line}</p>
                    })}
                
                    <p className='primary'>
                        Awards
                    </p>

                    {room.critMovie.Awards.split('.').map((line, index) => {
                    return <p>{line}</p>
                    })}
                
                    
                    <p className='primary'>Box Office</p>

                        {room.critMovie.BoxOffice ? <p>{room.critMovie.BoxOffice}</p> : <p>N/A</p>}
                    </div>
            </div>

            <center>
                <h3 style={{marginTop: '10px'}} className='primary'>Rating</h3>
                <h3>{castVote}</h3>
            </center>

            <input 
                type='range' 
                min='0' 
                max='10' 
                step='.1' 
                value={castVote} 
                onChange={handleCastVote} 
            />
            <button onClick={() => cast()}>Submit Rating</button>    
        </div>
    )
}
export default CastVote;