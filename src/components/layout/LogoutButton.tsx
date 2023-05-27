import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { useAuth } from '../../modules/authentication/AuthProvider'

const ConfirmationModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const ModalContent = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
}))

const LogoutButton = () => {
  const { logout } = useAuth()

  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)

  const toggleLogoutConfirmation = () => {
    setShowLogoutConfirmation(!showLogoutConfirmation)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <IconButton color="inherit" onClick={toggleLogoutConfirmation}>
        <ExitToAppIcon />
      </IconButton>
      <ConfirmationModal
        open={showLogoutConfirmation}
        onClose={toggleLogoutConfirmation}
        aria-labelledby="logout-confirmation-modal"
        aria-describedby="logout-confirmation-description"
      >
        <ModalContent>
          <Typography
            variant="h6"
            id="logout-confirmation-modal"
            component="h2"
          >
            Confirm Logout
          </Typography>
          <Typography id="logout-confirmation-description">
            Are you sure you want to logout?
          </Typography>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            style={{ marginRight: '8px' }}
          >
            Logout
          </Button>
          <Button
            onClick={toggleLogoutConfirmation}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
        </ModalContent>
      </ConfirmationModal>
    </>
  )
}

export default LogoutButton
