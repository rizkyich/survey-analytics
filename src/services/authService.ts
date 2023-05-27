import axios from 'axios'

import { BASE_URL } from '../config'

import { FormValuesRegister } from '../modules/authentication/RegisterForm'
import { FormValuesLogin } from '../modules/authentication/LoginForm'

export const registerUser = async ({
  username,
  email,
  password,
}: FormValuesRegister) => {
  const { data } = await axios({
    url: `${BASE_URL}/auth/register`,
    method: 'POST',
    data: {
      email,
      username,
      password,
    },
  })

  return data
}

export const loginUser = async ({ email, password }: FormValuesLogin) => {
  const { data } = await axios({
    url: `${BASE_URL}/auth/login`,
    method: 'POST',
    data: {
      email,
      password,
    },
  })

  return data
}
