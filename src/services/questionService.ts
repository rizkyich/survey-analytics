import apiClient from './apiClient'

export const getQuestionAnalytics = async (surveyId: string) => {
  const { data } = await apiClient({
    url: `/questions/${surveyId}`,
    method: 'GET',
  })

  return data
}
