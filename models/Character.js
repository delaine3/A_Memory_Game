import mongoose from 'mongoose'
// crediting: “Graphics by Mujka”


/* CharacterSchema will correspond to a collection in your MongoDB database. */
const CharacterSchema = new mongoose.Schema({
  charachter_name: {
    /* The charachter_name of this character */

    type: String,
    required: [true, 'Please provide a charachter_name for this character.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  places_lived: {
    /* The places_lived of this character */

    type: String,
    required: [true, "Please provide the character places_lived's charachter_name"],
    maxlength: [20, "Places lived's Name cannot be more than 60 characters"],
  },
  birth_place: {
    /* The birth_place of your character */

    type: String,
    required: [true, 'Please specify the birth_place of your character.'],
  },
  age: {
    /* Character's age, if applicable */

    type: Number,
  },
  birth_order:{
    type: String,
  },
  socioeconomic_status:{
    type: String,

  },
  into_astrology: {
    /* Boolean into_astrology value, if applicable */

    type: Boolean,
  },
  diet: {
    /* List of dietary needs, if applicable */

    type: Array,
  },
  insecurities:{
    type:Array
  },
  securities:{
    type:Array,
  },
  image_url: {
    /* Url to character image */

    required: [true, 'Please provide an image url for this character.'],
    type: String,
  },
  likes: {
    /* List of things your character likes to do */

    type: Array,
  },
  dislikes: {
    /* List of things your character does not like to do */

    type: Array,
  },
})

export default mongoose.models.Character || mongoose.model('Character', CharacterSchema)
