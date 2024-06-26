import { useEffect, useState } from 'react';

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
                <div className='loader' />
                <br />
                {disclaim ? 
                    <div>
                        <p style={{fontSize: 'x-small', textAlign: 'left'}}>
                            CineRate is currently hosted on a limited instance and you may experience longer initial loading times.  The server spins down after periods of inactivity.
                        </p>
                        <p style={{fontSize: 'x-small', textAlign: 'left'}}>
                            Thank you for your patience.
                        </p>
                    </div>
                : <></>}
                
            </center>
        </div>
    )
}

export default Loading;