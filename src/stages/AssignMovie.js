import { useState, useEffect } from 'react';

//components
import Loading from '../components/Loading';
import ChatBox from '../components/ChatBox';
import MovieCard from '../components/MovieCard';

//functions
import { searchMovieTitle } from '../functions/searchMovieTitle';
import { getMovieInfo } from '../functions/getMovieInfo';
import { getRandomMovie } from '../functions/getRandomMovie';

const AssignMovie = ({ socket, entry, room, setNotification }) => {
    const [movieTitleInput, setMovieTitleInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [movieID, setMovieID] = useState(null);
    const [time, setTime] = useState(45);
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState({ author: '', text: ''});

    const handleMovieTitleInput = (event) => {
        setMovieTitleInput(event.target.value);
    }

    const handleSearch = () =>{
        setLoading(true);
        searchMovieTitle(movieTitleInput)
        .then(res => setSearchResults(res.Search))
        .then(() => setLoading(false));
    }

    const handleRandom = () => {
        let random = getRandomMovie();
        console.log('random', random)
        setMovieTitleInput(random);
    }

    const handleMovieID = () => {
        getMovieInfo(movieID)
        .then(res => socket.emit('movie_selected', {room: room.id, movie: res}))
        .then(() => setLoading(false));
    }

    useEffect(() => {
        if(movieID){
            handleMovieID();
            setLoading(true);
        }
    }, [movieID])

    useEffect(() => {
        //count down clock
        setTimeout(() => setTime(time - 1), 1000);

        //dealer forfeit turn if 30 seconds pass
        if(!loading && room.dealer.id === socket.id){
            if(time === 0){
                socket.emit('assign_dealer', {room: room.id})
            }
        }
    }, [time])

    useEffect(() => {
        socket.emit('get_quote', { room: room.id })
    }, [])

    useEffect(() => {
        socket.on('update_quote', ({ quote }) => {
            setQuote(quote)
          });
    }, [socket])

    return (
        <div className='stage-container'>
            {room.dealer.id === socket.id ? 
            <>
                    <h3>Select Movie</h3>
                    <input 
                        type='text' 
                        placeholder='Movie Title' 
                        value={movieTitleInput} 
                        onChange={handleMovieTitleInput} 
                    />
                    <div className='action-container'>

                   
                    <div className='button-grid'>
                    <button onClick={handleRandom}>Random</button>
                    <button onClick={handleSearch}>Search</button>
                        </div>
                        </div>
                
                        {!loading && searchResults ? 
                            <div className='action-container search-results'>
                                {searchResults.map((movie, index) => {
                                    if(movie.imdbID){
                                        return(
                                            <MovieCard 
                                                key={index}
                                                id={movie.imdbID}
                                                title={movie.Title} 
                                                year={movie.Year} 
                                                img={movie.Poster}
                                                setMovieID={setMovieID}
                                            />
                                        )
                                    }
                                })}
                            </div> 
                        : <></>}
            </> : 
                <div className='full-width-container'>
                    <h3>{room.dealer.name} is choosing a movie</h3>
                    <br /><br /><br /><br />
                    <h4>"{quote.text}"</h4>
                    <br />
                    <p><i>— {quote.author}</i></p>
                
                </div>}

                <div className='time-container'>
                    <p>{time}</p>
                </div>
                
                <ChatBox socket={socket} entry={entry} room={room} />
        </div>
    )
}

export default AssignMovie;