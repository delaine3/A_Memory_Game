import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Writing_Excercise from '../../models/Writing_Excercise'

/* Allows you to view writing_excercise card info and delete writing_excercise card*/
const WritingExcPage = ({ writing_excercise }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const charachterID = router.query.id

    try {
      await fetch(`/api/writing_excercise/${charachterID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the writing_excercise.')
    }
  }

  return (
    <div key={writing_excercise._id}>
      <div>    
      <img className="view-card-img" src={writing_excercise.image_url} />    
      </div>
<br/>

        <div >
        <div className="view-card-writ">
        <div >
            <p className="label charachter_name">Prompt:<span className='player-info'>{writing_excercise.randomWritingExcercise}</span></p>
            <p className="label places_lived">Response: <span className='player-info'>{writing_excercise.promt_text_area_contents}</span></p>   
        
          </div>
      
      </div>
      <Link href="/[id]/editWritingExcercise" as={`/${writing_excercise._id}/editWritingExcercise`}>
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

  const writing_excercise = await Writing_Excercise.findById(params.id).lean()
  writing_excercise._id = writing_excercise._id.toString()

  return { props: { writing_excercise } }
}

export default WritingExcPage
