import { useRouter } from 'next/router'
import useSWR from 'swr'
import PlayerForm from '../../components/PlayerForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditPlot = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: writingExcercise, error } = useSWR(id ? `/api/player/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!writingExcercise) return <p>Loading...</p>
  const PlayerForm = {
    plot_idea:   writingExcercise.plot_idea,
    player: writingExcercise.player

  }

  return <PlayerForm formId="edit-character-form" PlayerForm={PlayerForm} fornewPlayer={false} />
}

export default EditPlot
