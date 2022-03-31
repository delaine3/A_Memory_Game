import mongoose from 'mongoose'


/* CharacterSchema will correspond to a collection in your MongoDB database. */
const PlayerSchema = new mongoose.Schema({

  name: {

    type: String,
  },
  score: {

    type: Number,
  },



})

export default mongoose.models.Player || mongoose.model('Player', PlayerSchema)
