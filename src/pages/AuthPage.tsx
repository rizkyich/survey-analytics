import React, { useState } from 'react'
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  ThemeProvider,
} from '@mui/material'
import { createTheme } from '@mui/material/styles'

import LoginForm from '../modules/authentication/LoginForm'
import RegisterForm from '../modules/authentication/RegisterForm'

const theme = createTheme()

const LoginPage: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true)

  const handleToggleForm = () => {
    console.log('masuk')
    setIsLoginForm((prevState) => !prevState)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'grid',
          placeItems: 'center',
        }}
        maxWidth="xs"
      >
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {isLoginForm ? <LoginForm /> : <RegisterForm onFinishRegister={handleToggleForm}/>}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="center">
                - OR -
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleToggleForm}
              >
                {isLoginForm ? 'Register' : 'Login'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default LoginPage
