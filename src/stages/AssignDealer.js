function AssignDealer({ room }){
    return (
        <div className='stage-container'>
            
                <h4>Picking New Dealer</h4>
                <p>
                    {room.dealer.name}'s time expired while choosing a movie.
                </p>
           
        </div>
    )
}

export default AssignDealer;