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
    const duration = 60 * 1000; // 1 minute in milliseconds
    const intervalTime = 10; // update interval in milliseconds
    
    const interval = setInterval(() => {
      width += (intervalTime / duration) * 100; // increment width percentage
      loadingBar.style.width = width + '%';
      
      if (width >= 100) {
        clearInterval(interval); // stop when it reaches 100%
      }
    }, intervalTime);
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