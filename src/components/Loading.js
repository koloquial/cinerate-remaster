import { useEffect, useState } from 'react';

const Loading = () => {
    const [disclaim, setDisclaim] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setDisclaim(true);
        }, 3000);
    }, [])

useEffect(() => {
    const loadingBar = document.getElementById("loadingBar");
    let width = 0;
    const duration = 60 * 1000;

    setTimeout(() => {
        width += (10 / duration) * 100;
        loadingBar.style.width = width + '%';
    }, 1000)
}, [])

    return (
        <div style={{maxWidth: '500px', paddingTop: '5%'}}>
            <center>
            
                <h1>
                    <span className='title'>cine</span><span className='title-alt'>Rate</span>
                </h1>
                <p style={{fontSize: 'small'}}>Guess movie ratings with friends</p>
                <br />
                <div className="loading-bar-container">
  <div className="loading-bar" id="loadingBar"></div>
</div>
                <br />
                {disclaim ? 
                    <div>
                        <p style={{fontSize: 'x-small', textAlign: 'left'}}>
                            CineRate is currently hosted on a <i>free</i> limited instance and you may experience longer initial loading times. 
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