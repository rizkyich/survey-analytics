import React, { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'

import useAuthFormValidation from '../../hooks/useAuthFormValidation'
import useLocalStorage from '../../hooks/useLocalStorage'
import { loginUser } from '../../services/authService'

export type FormValuesLogin = {
  email: string
  password: string
}

const LoginForm = () => {
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage('user', null)

  const { formValues, errors, handleChange, validateForm } =
    useAuthFormValidation({
      email: (value) => (value ? null : 'Email is required'),
      password: (value) => (value ? null : 'Password is required'),
    })

  const loginUserMutation = useMutation({
    mutationFn: (data: FormValuesLogin) => loginUser(data),
    onSuccess: (responseDataToken) => {
      if (responseDataToken) {
        setUser(responseDataToken)
        navigate('/')
      }
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      loginUserMutation.mutate({
        ...formValues,
      })
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        name="email"
        value={formValues.email}
        onChange={(e) => handleChange('email')(e.target.value)}
        required
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={formValues.password}
        onChange={(e) => handleChange('password')(e.target.value)}
        required
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {loginUserMutation.isLoading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </Box>
  )
}

export default LoginForm
