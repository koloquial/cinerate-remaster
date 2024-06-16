import ChatBox from "../components/ChatBox"

const AwaitGuesses = ({ socket, entry, room }) => {
    return (
        <div className='stage-container'>
            <p>Awaiting Guesses</p>

            <ChatBox socket={socket} entry={entry} room={room} />
        </div>
    )
}

export default AwaitGuesses;