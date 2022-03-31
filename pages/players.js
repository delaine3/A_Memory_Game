import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Player from '../models/Player'
import { useState } from 'react'

const Index = ({ player }) => {
  const [message, setMessage] = useState('')

  const handleDelete = async (itemId) => {
console.log("Writing excercise id"+itemId)
    try {
      await fetch(`/api/player/${itemId}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the player.')
    }
  }
return(
  <div>
    <h1>
   <Link href="/newPlayer">
    <button className='newFormButton'> <a>New Game</a> </button> 
  </Link></h1>
    <div className='grid'>
    {/* Create a card for each player */}
    {player.map((player) => (
      <div id='my-card'  key={player._id}>
        <div className="view-card-writ">
          <img src={player.image_url} />
          <div >
            <p className="label blurb ">Player's name: <span className='player-info'>{player.name}</span></p>
            <p className="label blurb">Score: <span className='player-info'>{player.score}</span> </p>
            {/* Extra player Info: Likes and Dislikes */}
            <div className="btn-container">
           
              <Link href="/[id]/viewPlot" as={`/${player._id}/viewPlot`}>
                <button className="btn open">View</button>
              </Link>
            </div>
          </div>
        </div>
        </div>
    ))}
          </div>

  </div>
)}

/* Retrieves player(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()
  
  /* find all the data  our database */
  const result = await Player.find({})
  const player = result.map((doc) => {
    const player = doc.toObject()
    player._id = player._id.toString()
    return player
  })

  return { props: { player: player } }
}

export default Index
