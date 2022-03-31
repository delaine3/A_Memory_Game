import dbConnect from '../../../lib/dbConnect'
import Writing_Excercise from '../../../models/Writing_Excercise'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const writing_excercise = await Writing_Excercise.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: writing_excercise })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const writing_excercise = await Writing_Excercise.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: writing_excercise })
      } catch (error) {
        res.status(400).json({ success: error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
