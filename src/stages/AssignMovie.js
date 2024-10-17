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
                    <h2>Select Movie</h2>

                    <p className='form-label'>Movie Title</p>
                    <div className='form-grid'>
                        <input 
                            type='text' 
                            placeholder='Movie Title' 
                            value={movieTitleInput} 
                            onChange={handleMovieTitleInput} 
                        />
                        <button onClick={handleSearch}>Search</button>
                        <button onClick={handleRandom}>Random Movie Title</button>
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
                <div className='flex-container'>
                    <h2>{room.dealer.name}</h2>
                    <p>is choosing a movie.</p>
                    
                    <div className='quote-box'>
                        <p className='quote'>{quote.text}</p>
                        <p className='author'>— {quote.author}</p>
                    </div>
                </div>}

                <div className='time-container'>
                    <p>{time}</p>
                </div>
                
                <ChatBox socket={socket} entry={entry} room={room} />
        </div>
    )
}

export default AssignMovie;