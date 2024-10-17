import { useEffect, useState } from 'react';

function GameOver({ room, setStage }) {
    const [winner, setWinner] = useState('');
    const [confettiPieces, setConfettiPieces] = useState([]);

    useEffect(() => {
        // Find the winner
        let temp = null;
        for (let i = 0; i < room.players.length; i++) {
            if (!temp || room.players[i].score > temp.score) {
                temp = room.players[i];
            }
        }
        setWinner(temp);

        // Generate confetti pieces
        const colors = [
            'linear-gradient(45deg, #f39c12, #e74c3c)',    // Orange to Red
            'linear-gradient(45deg, #2ecc71, #3498db)',    // Green to Blue
            'linear-gradient(45deg, #9b59b6, #f1c40f)',    // Purple to Yellow
            'linear-gradient(45deg, #e67e22, #1abc9c)',    // Orange to Teal
            'linear-gradient(45deg, #2980b9, #8e44ad)',    // Blue to Purple
            'linear-gradient(45deg, #f1c40f, #e74c3c)',    // Yellow to Red
            'linear-gradient(45deg, #16a085, #f39c12)',    // Teal to Orange
            'linear-gradient(45deg, #d35400, #c0392b)',    // Dark Orange to Dark Red
            'linear-gradient(45deg, #8e44ad, #2c3e50)',    // Purple to Dark Blue
            'linear-gradient(45deg, #f39c12, #e67e22)',    // Orange to Light Orange
            'linear-gradient(45deg, #2ecc71, #27ae60)',    // Green to Dark Green
            'linear-gradient(45deg, #3498db, #2980b9)',    // Blue to Dark Blue
            'linear-gradient(45deg, #9b59b6, #8e44ad)',    // Light Purple to Dark Purple
            'linear-gradient(45deg, #f1c40f, #e67e22)',    // Yellow to Orange
            'linear-gradient(45deg, #1abc9c, #16a085)',    // Teal to Dark Teal
            'linear-gradient(45deg, #c0392b, #e74c3c)',    // Dark Red to Bright Red
            'linear-gradient(45deg, #34495e, #2c3e50)',    // Dark Blue to Darker Blue
            'linear-gradient(45deg, #f39c12, #f1c40f)',    // Orange to Light Yellow
            'linear-gradient(45deg, #16a085, #1abc9c)',    // Teal to Light Teal
            'linear-gradient(45deg, #8e44ad, #d35400)',    // Purple to Dark Orange
            'linear-gradient(45deg, #2980b9, #f39c12)',    // Blue to Orange
            'linear-gradient(45deg, #f39c12, #1abc9c)',    // Orange to Teal
            'linear-gradient(45deg, #27ae60, #f1c40f)',    // Green to Yellow
            'linear-gradient(45deg, #c0392b, #2980b9)',    // Red to Blue
            'linear-gradient(45deg, #9b59b6, #34495e)',    // Purple to Dark Blue
            'linear-gradient(45deg, #e67e22, #2ecc71)',    // Orange to Green
            'linear-gradient(45deg, #3498db, #e74c3c)',    // Blue to Red
            'linear-gradient(45deg, #f1c40f, #9b59b6)',    // Yellow to Purple
            'linear-gradient(45deg, #1abc9c, #f1c40f)',    // Teal to Yellow
            'linear-gradient(45deg, #d35400, #2980b9)',    // Dark Orange to Blue
            'linear-gradient(45deg, #2ecc71, #f39c12)',    // Green to Orange
            'linear-gradient(45deg, #34495e, #9b59b6)',    // Dark Blue to Purple
            'linear-gradient(45deg, #f39c12, #c0392b)',    // Orange to Red
            'linear-gradient(45deg, #27ae60, #e67e22)',    // Green to Orange
            'linear-gradient(45deg, #9b59b6, #2980b9)',    // Purple to Blue
            'linear-gradient(45deg, #f1c40f, #2c3e50)',    // Yellow to Dark Blue
            'linear-gradient(45deg, #e74c3c, #1abc9c)',    // Red to Teal
            'linear-gradient(45deg, #2980b9, #d35400)',    // Blue to Dark Orange
            'linear-gradient(45deg, #3498db, #9b59b6)',    // Blue to Purple
            'linear-gradient(45deg, #c0392b, #34495e)',    // Red to Dark Blue
            'linear-gradient(45deg, #8e44ad, #27ae60)',    // Purple to Green
            'linear-gradient(45deg, #f39c12, #2980b9)',    // Orange to Blue
            'linear-gradient(45deg, #f1c40f, #2ecc71)',    // Yellow to Green
            'linear-gradient(45deg, #d35400, #f1c40f)',    // Dark Orange to Yellow
            'linear-gradient(45deg, #2980b9, #2ecc71)',    // Blue to Green
            'linear-gradient(45deg, #8e44ad, #e74c3c)',    // Purple to Red
            'linear-gradient(45deg, #34495e, #f39c12)',    // Dark Blue to Orange
            'linear-gradient(45deg, #9b59b6, #e67e22)',    // Purple to Orange
            'linear-gradient(45deg, #16a085, #c0392b)',    // Teal to Red
            'linear-gradient(45deg, #f39c12, #34495e)',    // Orange to Dark Blue
            'linear-gradient(45deg, #e67e22, #3498db)',    // Orange to Blue
        ];
        

        const confettiArray = [];
        for (let i = 0; i < 25; i++) {
            const leftPosition = Math.random() * 100;  // Random position on the screen
            let xMove = (Math.random() - 0.5) * 200; // Random horizontal movement
            console.log('xmove', xMove)
            if(xMove < 50){
                xMove = xMove - (xMove * 2);
            }
            const rotateValue = Math.random() * 360; 
            const animationDelay = Math.random() * 2;  
            const animationDuration = Math.random() * 2 + 7;  

            const confettiStyle = {
                left: `${leftPosition}vw`,
                backgroundImage: colors[Math.floor(Math.random() * colors.length)],
                animationDelay: `${animationDelay}s`,
                animationDuration: `${animationDuration}s`,
                transform: `rotate(${rotateValue}deg)`,
                '--x-move': `${xMove}vw`,
            };

            confettiArray.push(confettiStyle);
        }

        setConfettiPieces(confettiArray);

    }, [room]);

    return (
        <div className="stage-container">
            <h1 style={{ color: 'gold' }}>{winner.name}</h1>
            <h2>Wins!</h2>
            <br />
            <br />
                  
            <div className='alt-block'>
                <h3>Scoreboard</h3>
                    {room.players.map(player => {
                        return (
                            <div className='round-over-grid'>
                                <div>
                                <p>{player.name}</p>
                                </div>
                                <div>
                                <p>{player.score}</p>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    <div className='inner-navigation'>
                    <button onClick={() => setStage('splash')}>Home</button>
                    </div>
                
            
            <div className="confetti-container">
                {confettiPieces.map((style, index) => (
                    <div key={index} className="confetti" style={style}></div>
                ))}
         </div>
        </div>
    );
}

export default GameOver;
