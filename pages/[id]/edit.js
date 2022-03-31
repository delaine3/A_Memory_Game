import { useRouter } from 'next/router'
import useSWR from 'swr'
import CharacterForm from '../../components/CharacterForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditPet = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: character, error } = useSWR(id ? `/api/characters/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!character) return <p>Loading...</p>

  const characterForm = {
    charachter_name: character.charachter_name,
    places_lived: character.places_lived,
    birth_place: character.birth_place,
    age: character.age,
    into_astrology: character.into_astrology,
    diet: character.diet,
    image_url: character.image_url,
    likes: character.likes,
    dislikes: character.dislikes,
    socioeconomic_status: character.socioeconomic_status,
    birth_order: character.birth_order,
    insecurities: character.insecurities,
    securities: character.securities
  }

  return <CharacterForm formId="edit-character-form" characterForm={characterForm} forNewCharacter={false} />
}

export default EditPet
