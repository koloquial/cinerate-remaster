import { useState, useEffect } from 'react';

//components
import Loading from '../components/Loading';
import ChatBox from '../components/ChatBox';
import MovieCard from '../components/MovieCard';

//functions
import { searchMovieTitle } from '../functions/searchMovieTitle';
import { getMovieInfo } from '../functions/getMovieInfo';

const AssignMovie = ({ socket, entry, room, setNotification }) => {
    const [movieTitleInput, setMovieTitleInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [movieID, setMovieID] = useState(null);
    const [time, setTime] = useState(30);
    const [loading, setLoading] = useState(false);

    const handleMovieTitleInput = (event) => {
        setMovieTitleInput(event.target.value);
    }

    const handleSearch = () =>{
        setLoading(true);
        searchMovieTitle(movieTitleInput)
        .then(res => setSearchResults(res.Search))
        .then(() => setLoading(false));
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

    return (
        <div className='stage-container'>
            {room.dealer.id === socket.id ? 
            <>
                <div className='full-width-container'>
                    <h2>Select Movie</h2>
                    <p>{time}s</p>
                </div>

                <div className='full-width-container'>
                    <input 
                        type='text' 
                        placeholder='Movie Title' 
                        value={movieTitleInput} 
                        onChange={handleMovieTitleInput} 
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                
                    <div className='full-width-container'>
                        {!loading && searchResults ? 
                            <div className='search-results'>
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
                    </div>
            </> : 
                <div className='full-width-container'>
                    <h2>{room.dealer.name} is choosing a movie</h2>
                    <p>{time}s</p>
                </div>}
                
                <ChatBox socket={socket} entry={entry} room={room} />
        </div>
    )
}

export default AssignMovie;