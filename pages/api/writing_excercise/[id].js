import dbConnect from '../../../lib/dbConnect'
import Writing_Excercise from '../../../models/Writing_Excercise'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const writing_excercise = await Writing_Excercise.findById(id)
        if (!writing_excercise) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: writing_excercise })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const writing_excercise = await Writing_Excercise.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!writing_excercise) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: writing_excercise })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedWriting_Excercise = await Writing_Excercise.deleteOne({ _id: id })
        if (!deletedWriting_Excercise) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
