import axios from 'axios'
import apiClient from './apiClient'

import { BASE_URL } from '../config'

import { SurveyType } from '../interfaces/survey.interfaces'

export const getAllSurvey = async () => {
  const { data } = await apiClient({
    url: '/surveys',
    method: 'GET',
  })

  return data
}

export const createSurvey = async ({
  title,
  description,
  status,
  isPublished,
  questions,
}: SurveyType) => {
  const { data } = await apiClient({
    url: '/surveys',
    method: 'POST',
    data: {
      title,
      slug: title.toLowerCase().split(' ').join('-'),
      description,
      status,
      isPublished,
      questions,
    },
  })

  return data
}

export const editSurvey = async ({
  surveyId,
  title,
  description,
  status,
  isPublished,
  questions,
}: SurveyType & { surveyId: string }) => {
  const { data } = await apiClient({
    url: `/surveys/${surveyId}`,
    method: 'PUT',
    data: {
      title,
      slug: title.toLowerCase().split(' ').join('-'),
      description,
      status,
      isPublished,
      questions,
    },
  })

  return data
}

export const getSurveyById = async (surveyId: string) => {
  const { data } = await apiClient({
    url: `/surveys/${surveyId}`,
    method: 'GET',
  })

  return data
}

export const getSurveyBySlugId = async (slug: string, surveyId: string) => {
  const { data } = await axios({
    url: `${BASE_URL}/surveys/${slug}/${surveyId}`,
    method: 'GET',
  })

  return data
}
