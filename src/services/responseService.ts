import axios from 'axios'

import { BASE_URL } from '../config'

import { ResponseSubmitType } from '../interfaces/response.interfaces'

export const saveResponses = async (responses: ResponseSubmitType[]) => {
  const { data } = await axios({
    url: `${BASE_URL}/responses/bulk`,
    method: 'POST',
    data: {
      responses,
    },
  })

  return data
}
