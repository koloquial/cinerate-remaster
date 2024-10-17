import { useEffect, useState } from 'react';
import noposter from '../images/no-poster.png';

function CastVote({ socket, room, setStage, setNotification }){
    const [castVote, setCastVote] = useState(0.0);
    const [time, setTime] = useState(3000);
    const [poster, setPoster] = useState('');

    const handleCastVote = (event) =>{
        setCastVote(event.target.value);
    }

    const cast = () => {
        socket.emit('cast_vote', {id: socket.id, room: room.id, vote: castVote, movie: room.critMovie.Title});
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
            <h2>Cast Vote</h2>
            <div className='content-container'>
                <img 
                    src={poster} 
                    style={{
                        maxWidth: '240px', 
                        maxHeight: '360px',
                        marginRight: '15px',
                        marginBottom: '10px'
                    }} 
                />
                        
                <div>
                    <h3>{room.critMovie.Title}</h3>
                    {room.critMovie.Released ? <> <p className='label'>Released</p><p>{room.critMovie.Released}</p></> : <></>}
                    {room.critMovie.Rated ? <> <p className='label'>Rated</p><p>{room.critMovie.Rated}</p></> : <></>}
                </div>
            </div>

            <p><span className='inline-label'>Rating: </span>{castVote}</p>
            
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
           
            <p className='label'>Plot</p>
           
            {room.critMovie.Plot ? 
                <p>{room.critMovie.Plot}</p> 
            : <p>N/A</p>}
           
           <div className='details-grid'>
            <div>
                <p className='label'>Director</p>
                {room.critMovie.Director ? 
                    <>
                        {room.critMovie.Director.split(',').map((line, index) => {
                            return (
                                <p key={`${line}-${index}`}>{line}</p>
                            )
                        })}
                    </> 
                : <p>N/A</p>}

<p className='label'>Cast</p>
                {room.critMovie.Cast ? 
                    <>
                        {room.critMovie.Cast.split(',').map((line, index) => {
                            return (
                                <p key={`${line}-${index}`}>{line}</p>
                            )
                        })}
                    </> 
                : <p>N/A</p>}
                
                <p className='label'>Box Office</p>
                {room.critMovie.BoxOffice ? 
                    <p>
                        {room.critMovie.BoxOffice}
                    </p> 
                : <p>N/A</p>}

                <p className='label'>Production</p>
                {room.critMovie.Production ? <p>{room.critMovie.Production}</p> : <p>N/A</p>}
            </div>
            <div>

            <p className='label'>Writer</p>
                        {room.critMovie.Writer ? 
                            <>
                                {room.critMovie.Writer.split(',').map((line, index) => {
                                    return (
                                        <p key={`${line}-${index}`}>{line}</p>
                                    )
                                })}
                            </> 
                        : <p>N/A</p>}

               

                        <p className='label'>Awards</p>
                        {room.critMovie.Awards ? 
                            <>
                                {room.critMovie.Awards.split(',').map((line, index) => {
                                    return (
                                        <p key={`${line}-${index}`}>{line}</p>
                                    )
                                })}
                            </> 
                        : <p>N/A</p>}
                    </div>
                </div>
          
                <div className='time-container'>
                <p>{time}</p>
            </div>
        </div>
    )
}
export default CastVote;