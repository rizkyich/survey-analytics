import React, { FormEvent } from 'react'
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'
import { useMutation } from 'react-query'

import { registerUser } from '../../services/authService'

import useSnackbar from '../../components/Snackbar/useSnackbar'

import useAuthFormValidation from '../../hooks/useAuthFormValidation'

export type FormValuesRegister = {
  username: string
  email: string
  password: string
}

interface RegisterFormProps {
  onFinishRegister: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onFinishRegister,
}) => {
  const snackbar = useSnackbar()

  const { formValues, errors, handleChange, validateForm } =
    useAuthFormValidation({
      username: (value) => (value ? null : 'Username is required'),
      email: (value) => (value ? null : 'Email is required'),
      password: (value) => (value ? null : 'Password is required'),
    })

  const registerUserMutation = useMutation({
    mutationFn: (data: FormValuesRegister) => registerUser(data),
    onSuccess: (responseDataToken) => {
      if (responseDataToken) {
        snackbar.show(
          'Success Register',
          'success',
          true
        )

        onFinishRegister();
      }
    },
    onError: (error) => {
      snackbar.show(
        error?.response.data.error,
        'error',
        true
      )
    }
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      registerUserMutation.mutate({
        ...formValues,
      })
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Username"
        type="text"
        name="username"
        value={formValues.username}
        onChange={(e) => handleChange('username')(e.target.value)}
        required
        fullWidth
        margin="normal"
        error={!!errors.username}
        helperText={errors.username}
      />
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={registerUserMutation.isLoading}
      >
        {registerUserMutation.isLoading ? (
          <CircularProgress size={24} />
        ) : (
          'Register'
        )}
      </Button>
    </Box>
  )
}

export default RegisterForm
