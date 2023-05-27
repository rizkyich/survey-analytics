import React from 'react'
import { TextField } from '@mui/material'

const SurveyDescriptionForm = ({ description, setDescription }) => {
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  return (
    <TextField
      label="Description"
      value={description}
      onChange={handleDescriptionChange}
      required
      fullWidth
      margin="normal"
      multiline
      rows={4}
    />
  )
}

export default SurveyDescriptionForm
