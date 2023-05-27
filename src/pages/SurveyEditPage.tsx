import { Grid } from '@mui/material'
import { useQuery, useMutation } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'

import BaseGoBack from '../components/BaseGoBack'
import SurveyForm from '../modules/survey/SurveyForm'

import { getSurveyById, editSurvey } from '../services/surveyService'
import useSnackbar from '../components/Snackbar/useSnackbar'

import { SurveyType } from '../interfaces/survey.interfaces'

const SurveyEditPage = () => {
  const { surveyId } = useParams()
  const navigate = useNavigate()
  const snackbar = useSnackbar()

  const { data: survey, isLoading } = useQuery<SurveyType>(
    ['surveyById', surveyId],
    () => getSurveyById(surveyId || '')
  )

  const editSurveyMutation = useMutation({
    mutationFn: (data: SurveyType & { surveyId: string }) => editSurvey(data),
    onSuccess: (survey: SurveyType) => {
      if (survey) {
        snackbar.show(
          'Survey successfully changed',
          'success',
          true
        )

        navigate('/')
      }
    },
    onError: (error: any) => {
      snackbar.show(
        error?.response?.data?.error ?? 'Something went wrong',
        'error',
        true
      )
    }
  })

  const handleEditSurvey = (data: SurveyType) => {
    const surveyIdTemp = surveyId as string

    editSurveyMutation.mutate({
      surveyId: surveyIdTemp,
      ...data,
    })
  }

  return (
    <>
      <BaseGoBack />
      <Grid container>
        <Grid item xs={12}>
          <SurveyForm
            survey={survey}
            isLoadingSurvey={isLoading}
            onSubmitSurvey={handleEditSurvey}
            isLoadingSubmit={editSurveyMutation.isLoading}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SurveyEditPage
