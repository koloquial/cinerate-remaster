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
            <div className='full-width-container'>
                <h2>Cast Vote</h2>
                <p>{time}s</p>
            </div>                

            <div>
                <img 
                    src={poster} 
                    style={{
                        maxWidth: '200px', 
                        maxHeight: '300px',
                        marginRight: '15px'
                    }} 
                />
                <br /><br />
            </div>
            
            <div style={{width: '150px'}}>
                <h3>{room.critMovie.Title}</h3>
                <p>
                    ({room.critMovie.Year})
                </p>
                <br /><br />
                <center>
                    <h3>Rating</h3>
                    <h3 className='secondary'>{castVote}</h3>
                    <input 
                        type='range' 
                        min='0' 
                        max='10' 
                        step='.1' 
                        value={castVote} 
                        onChange={handleCastVote} 
                    />
                    <button onClick={() => cast()}>
                        Submit Rating
                    </button>  
                </center>
            </div>
        
            <div className='movie-info'>
                <div>
                    <h4>Director</h4>
                    <p>
                        {room.critMovie.Director}
                    </p>
                </div>

                <div>
                    <h4>Cast</h4>
                    <p>
                        {room.critMovie.Actors}
                    </p>
                </div>

                <div>
                    <h4>Awards</h4>
                    <p>
                        {room.critMovie.Awards}
                    </p>
                </div>

                {room.critMovie.BoxOffice ? 
                    <div>
                        <h4>Box Office</h4>
                        <p>
                            {room.critMovie.BoxOffice}
                        </p>
                    </div> 
                : <></>}

                {room.critMovie.Plot ? 
                    <div>
                        <h4>Box Office</h4>
                        <p>
                            {room.critMovie.Plot}
                        </p>
                    </div> 
                : <></>}
            </div>
        </div>
    )
}
export default CastVote;