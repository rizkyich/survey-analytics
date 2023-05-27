import { Link, useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const BaseGoBack = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <IconButton
      component={Link}
      to="#"
      onClick={handleGoBack}
      sx={{ marginBottom: '1rem' }}
    >
      <ArrowBackIcon />
    </IconButton>
  )
}

export default BaseGoBack
