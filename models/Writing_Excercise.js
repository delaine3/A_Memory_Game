import mongoose from 'mongoose'
// crediting: “Graphics by Mujka”


/* CharacterSchema will correspond to a collection in your MongoDB database. */
const Writing_ExcerciseSchema = new mongoose.Schema({
    promt_text_area_contents: {
    /* The promt_text_area_contents */

    type: String,
    required: [true, 'Please submit some text.'],
  },
  randomWritingExcercise: {

    type: Array,
  },



})

export default mongoose.models.Writing_Excercise || mongoose.model('Writing_Excercise', Writing_ExcerciseSchema)
