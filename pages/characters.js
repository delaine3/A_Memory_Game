import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Character from '../models/Character'

const Index = ({ characters }) => (
  <div>
        <h1>

   <Link href="/newCharacter">
           <button className='newFormButton'> <a>Add Character</a></button>
          </Link>
          </h1>

          <div className="grid">
    {/* Create a card for each character */}
    {characters.map((character) => (
      <div key={character._id}>
        <div className="card">
          <img src={character.image_url} />
          <h5 className="character-charachter_name">{character.charachter_name}</h5>
          <div className="main-content">
            <p className="label charachter_name">Character name:<span className='player-info'>{character.charachter_name}</span></p>
            <p className="label age">Age:<span className='player-info'>{character.age}</span> </p>
            {/* Extra Character Info: Likes and Dislikes */}
            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${character._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${character._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    ))}
  </div>
  </div>
)

/* Retrieves character(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Character.find({})
  const characters = result.map((doc) => {
    const character = doc.toObject()
    character._id = character._id.toString()
    return character
  })

  return { props: { characters: characters } }
}

export default Index
