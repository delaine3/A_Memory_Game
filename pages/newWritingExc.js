import WritingExcerciseForm from '../components/WritingExcerciseForm'

const NewWritingExcercise = () => {
  const writing_Excercise = {
    randomWritingExcercise:"",
    promt_text_area_contents:""


  }

  return <WritingExcerciseForm formId="add-character-form" writingExcerciseForm={writing_Excercise} />
}

export default NewWritingExcercise
