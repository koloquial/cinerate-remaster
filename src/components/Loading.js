import { useEffect, useState } from 'react';
import Hangman from './Hangman';

const Loading = () => {
    const [disclaim, setDisclaim] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setDisclaim(true);
        }, 3000);
    }, [])


    return (
        <div style={{maxWidth: '500px', paddingTop: '5%'}}>
            <center>
            
                <h1>
                    <span className='title'>cine</span><span className='title-alt'>Rate</span>
                </h1>
                <p style={{fontSize: 'small'}}>Guess movie ratings with friends</p>
                <br />
                <div className="loader" />
                <br />
                {disclaim ? 
                    <div style={{width: '80%'}}>
                        <p style={{fontSize: 'x-small', textAlign: 'left'}}>
                            CineRate is currently hosted on a limited instance and you may experience longer initial loading times. 
                        </p>
                        <p style={{fontSize: 'x-small', textAlign: 'left'}}>
                            Thank you for your patience.
                        </p>
                        <p style={{fontSize: 'x-small', textAlign: 'left'}}>
                            Seriously it might take a full minute.
                        </p>
                        <Hangman />
                    </div>
                : <></>}
                
            </center>
        </div>
    )
}

export default Loading;