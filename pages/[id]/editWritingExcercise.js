import { useRouter } from 'next/router'
import useSWR from 'swr'
import WritingExcerciseForm from '../../components/WritingExcerciseForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditWritingExcercise = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: writingExcercise, error } = useSWR(id ? `/api/writing_excercise/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!writingExcercise) return <p>Loading...</p>
  const writingExcerciseForm = {
    promt_text_area_contents:   writingExcercise.promt_text_area_contents,
    randomWritingExcercise: writingExcercise.randomWritingExcercise

  }

  return <WritingExcerciseForm formId="edit-character-form" writingExcerciseForm={writingExcerciseForm} forNewCharacter={false} />
}

export default EditWritingExcercise
