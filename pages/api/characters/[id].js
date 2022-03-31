import dbConnect from '../../../lib/dbConnect'
import Character from '../../../models/Character'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const character = await Character.findById(id)
        if (!character) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: character })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const character = await Character.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!character) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: character })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedCharacter = await Character.deleteOne({ _id: id })
        if (!deletedCharacter) {
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
