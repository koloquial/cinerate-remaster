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
            <h3>Cast Vote</h3>
            {console.log('moibe', room.critMovie)}
            <table>
                <tbody>
                    <tr>
                        <td style={{width: '50%'}}>
                            <img 
                                src={poster} 
                                style={{
                                    maxWidth: '240px', 
                                    maxHeight: '360px',
                                    marginRight: '15px',
                                    marginBottom: '10px'
                                }} 
                            />
                        </td>
                        <td>
                            <h3>{room.critMovie.Title}</h3>
                            
                            {room.critMovie.Released ? <> <h4>Released</h4><p>{room.critMovie.Released}</p></> : <></>}

                            {room.critMovie.Rated ? <> <h4>Rated</h4><p>{room.critMovie.Rated}</p></> : <></>}
                        </td>
                    </tr>
                </tbody>
            </table>

            <h4>Rating</h4>
            <h4 className='secondary'>{castVote}</h4>
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
            
            <table>
                <tr>
                    <td style={{width: '50%'}}>
                        <h4>Director</h4>
                        {room.critMovie.Director ? 
                            <>
                                {room.critMovie.Director.split(',').map((line, index) => {
                                    return (
                                        <p key={`${line}-${index}`}>{line}</p>
                                    )
                                })}
                            </> 
                        : <p>N/A</p>}
                    </td>
                    <td>
                        <h4>Cast</h4>
                        {room.critMovie.Cast ? 
                            <>
                                {room.critMovie.Cast.split(',').map((line, index) => {
                                    return (
                                        <p key={`${line}-${index}`}>{line}</p>
                                    )
                                })}
                            </> 
                        : <p>N/A</p>}
                    </td>
                </tr>
                <tr>
                    <td style={{width: '50%'}}>
                        <h4>Awards</h4>
                        {room.critMovie.Awards ? 
                            <>
                                {room.critMovie.Awards.split(',').map((line, index) => {
                                    return (
                                        <p key={`${line}-${index}`}>{line}</p>
                                    )
                                })}
                            </> 
                        : <p>N/A</p>}
                    </td>
                    <td>
                        <h4>Box Office</h4>
                        {room.critMovie.BoxOffice ? 
                            <>
                                {room.critMovie.BoxOffice.split(',').map((line, index) => {
                                    return (
                                        <p key={`${line}-${index}`}>{line}</p>
                                    )
                                })}
                            </> 
                        : <p>N/A</p>}
                    </td>
                </tr>
                <tr>
                    <td style={{width: '50%'}}>
                        <h4>Writer</h4>
                        {room.critMovie.Writer ? 
                            <>
                                {room.critMovie.Writer.split(',').map((line, index) => {
                                    return (
                                        <p key={`${line}-${index}`}>{line}</p>
                                    )
                                })}
                            </> 
                        : <p>N/A</p>}
                    </td>
                    <td>
                        <h4>Production</h4>
                        {room.critMovie.Production ? <p>{room.critMovie.Production}</p> : <p>N/A</p>}
                    </td>
                </tr>
            </table>

            <h4>Plot</h4>
            {room.critMovie.Plot ? 
                <p>{room.critMovie.Plot}</p> 
            : <p>N/A</p>}
           
           <br /><br />
           
           <div className='time-container'>
                <p>{time}s</p>
            </div>
        </div>
    )
}
export default CastVote;