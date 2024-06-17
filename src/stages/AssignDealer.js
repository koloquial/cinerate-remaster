function AssignDealer({ room }){
    return (
        <div className='stage-container'>
            <div className='full-width-container'>
                <h4>Picking New Dealer</h4>
                <p>
                    {room.dealer.name}'s time expired while choosing a movie.
                </p>
            </div>
        </div>
    )
}

export default AssignDealer;