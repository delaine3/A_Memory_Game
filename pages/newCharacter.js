import CharacterForm from '../components/CharacterForm'

const NewCharacter = () => {
  const characterForm = {
    charachter_name: '',
    places_lived: '',
    birth_place: '',
    age: 0,
    into_astrology: false,
    diet: [],
    image_url: '',
    likes: [],
    dislikes: [],
    birth_order:"",
    socioeconomic_stat:"",
    insecurities:[],
    securities:[],

  }

  return <CharacterForm formId="add-character-form" characterForm={characterForm} />
}

export default NewCharacter
