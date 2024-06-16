function AssignDealer({ room }){
    return (
        <div className='stage-container'>
            <h3>Picking New Dealer</h3>
            <p>
                {room.dealer.name}'s time expired while choosing a movie.
            </p>
        </div>
    )
}

export default AssignDealer;