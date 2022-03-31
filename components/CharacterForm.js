import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import {name_list} from '../lib/nameIdeaList'
const CharacterForm = ({ formId, characterForm, forNewCharacter = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    charachter_name: characterForm.charachter_name,
    places_lived: characterForm.places_lived,
    birth_place: characterForm.birth_place,
    age: characterForm.age,
    into_astrology: characterForm.into_astrology,
    diet: characterForm.diet,
    image_url: characterForm.image_url,
    likes: characterForm.likes,
    dislikes: characterForm.dislikes,
    socioeconomic_status: characterForm.socioeconomic_status,
    birth_order: characterForm.birth_order,
    insecurities: characterForm.insecurities,
    securities: characterForm.securities,
    nameIdea: characterForm.nameIdea
  })


  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/characters/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/characters/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update character')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/characters', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add character')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value =
      target.name === 'into_astrology' ? target.checked : target.value
    const name = target.name

    if(name == "nameIdea"){
      value = name_list[Math.floor(Math.random() * name_list.length)];

    }

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewCharacter ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  /* Makes sure character info is filled for character charachter_name, places_lived charachter_name, birth_place, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.charachter_name) err.charachter_name = 'Name is required'
    if (!form.places_lived) err.places_lived = 'Places lived is required'
    if (!form.birth_place) err.birth_place = 'Species is required'
    if (!form.image_url) err.image_url = 'Image URL is required'
    return err
  }

  return (
    <>
      <form className='newForm' id={formId} onSubmit={handleSubmit}>
            <p id="nameIdea">
              {form.nameIdea != ""
                ? form.nameIdea
                : "Create your charachter. If you need a name idea click the button below!"}
            </p>
            <button name='nameIdea'  className="open btn" onClick={handleChange}>
              Name Idea
            </button>
        <label htmlFor="charachter_name">Character Name</label>
        <input
          type="text"
          maxLength="20"
          name="charachter_name"
          value={form.charachter_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="places_lived">Places Lived</label>
        <input
          type="text"
          maxLength="20"
          name="places_lived"
          value={form.places_lived}
          onChange={handleChange}
          required
        />

        <label htmlFor="birth_place">Birth Place</label>
        <input
          type="text"
          maxLength="30"
          name="birth_place"
          value={form.birth_place}
          onChange={handleChange}
          required
        />

        <label htmlFor="socioeconomic_status">Socioeconomic Status</label>
        <input
          type="text"
          maxLength="30"
          name="socioeconomic_status"
          value={form.socioeconomic_status}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="birth_order">Birth Order (first born, last..etc)</label>
        <input
          type="text"
          maxLength="30"
          name="birth_order"
          value={form.birth_order}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />

        <label htmlFor="into_astrology">Into Astrology?</label>
        <input
          type="checkbox"
          name="into_astrology"
          checked={form.into_astrology}
          onChange={handleChange}
        />

        <label htmlFor="diet">Diet</label>
        <textarea
          name="diet"
          maxLength="60"
          value={form.diet}
          onChange={handleChange}
        />

        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
        />

        <label htmlFor="likes">Likes</label>
        <textarea
          name="likes"
          maxLength="60"
          value={form.likes}
          onChange={handleChange}
        />

        <label htmlFor="dislikes">Dislikes</label>
        <textarea
          name="dislikes"
          maxLength="60"
          value={form.dislikes}
          onChange={handleChange}
        />

<label htmlFor="insecurities">Insecurities</label>
        <textarea
          name="insecurities"
          maxLength="60"
          value={form.insecurities}
          onChange={handleChange}
        />
        <label htmlFor="securities">Securities</label>
        <textarea
          name="securities"
          maxLength="60"
          value={form.securities}
          onChange={handleChange}
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default CharacterForm
