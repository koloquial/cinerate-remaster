import { useState, useEffect } from 'react';
import noposter from '../images/no-poster.png';

const MovieCard = ({ title, year, img, setMovieID }) => {
    const [poster, setPoster] = useState('');

    const checkIfImageExists = (url, callback) => {
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
        checkIfImageExists(img, (exists) => {
            if (exists) {
              // Success code
              setPoster(img)
            } else {
              // Fail code
              setPoster(noposter)
            }
          });
      })

    return (
        <div className='movie-card' onClick={() => setMovieID(title)}>
            <img src={poster} alt={title} />
            <p>
              <span className='gray'>
                {title}
              </span>
              <br />
              <span className='white'>
                {year}
              </span>
            </p>
        </div>
    )
}

export default MovieCard;