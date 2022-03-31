import PlayerForm from '../components/PlayerForm'

const newPlayerForm = () => {
  const player = {
    player:"",
    plot_idea:""
  }

  return <PlayerForm formId="add-player-form" PlayerForm={player} />
}

export default newPlayerForm
