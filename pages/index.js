import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Character from '../models/Writing_Excercise'

const Index = ({ characters }) => (
  <>
     <div className="nav">
          <div className="center nav-writing-exc">
      
        <ul className="writing-excercises-grid">
       
          <li >
          <Link className="nav-link" href="/characters">
            <a>
              {" "}
              <img
                src="https://i.ibb.co/hC0GtCt/charachter.jpg"
                alt="charachter"
                width="100px"
                className="writing-excercises-icons"
              />
              <br/>
              <label className="writing-excercises-icon-descriptor">Characters</label>
              </a>
              </Link>
          </li>
          <li >
          <Link className="nav-link" href="/players">
            <a>
              {" "}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtD-UFzDMMtNcvYN6Qr9S6DyjjvUr7VRXAgQ&usqp=CAU"
                alt="player"
                width="100px"
                className="writing-excercises-icons"
              />
              <br/>
              <label className="writing-excercises-icon-descriptor">Player</label>
              </a>
              </Link>
          </li>
          <li >
              {" "}
              <Link className="nav-link" href="/writing_excercises"><a>
              <img
                src="https://i.ibb.co/0Zn2VC3/kissclipart-writing-clipart-writing-clip-art-a65c8cdd6316233b.png"
                alt="kissclipart-writing-clipart-writing-clip-art-a65c8cdd6316233b"
                border="0"
                className="writing-excercises-icons"
                width="100px"
                height="100px"
              />{" "}
              <br/>
              <label className="writing-excercises-icon-descriptor">
                Random writing excercises
              </label>
              </a>
              </Link>
          </li>
        </ul>
      </div>
        </div>
  </>
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
