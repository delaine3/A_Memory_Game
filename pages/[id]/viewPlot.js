import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Player from '../../models/Player'

/* Allows you to view player card info and delete player card*/
const PlotsPage = ({ player }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const charachterID = router.query.id

    try {
      await fetch(`/api/player/${charachterID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the player.')
    }
  }

  return (
    <div key={player._id}>
      <div>    
      <img className="view-card-img" src={player.image_url} />    
      </div>
<br/>

        <div >
        <div className="view-card-writ">
        <div >
            <p className="label charachter_name">Name:<span className='player-info'>{player.name}</span></p>
            <p className="label places_lived">Score: <span className='player-info'>{player.score}</span></p>   
        
          </div>
      
      </div>
      <Link href="/[id]/editPlot" as={`/${player._id}/editPlot`}>
        <button className="btn edit">Edit</button>
       </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
        
          </div>

        
   
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const player = await Player.findById(params.id).lean()
  player._id = player._id.toString()

  return { props: { player } }
}

export default PlotsPage
