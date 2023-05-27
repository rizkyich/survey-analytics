import { Grid } from '@mui/material'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import SurveyForm from '../modules/survey/SurveyForm'
import BaseGoBack from '../components/BaseGoBack'

import { createSurvey } from '../services/surveyService'
import useSnackbar from '../components/Snackbar/useSnackbar'

import { SurveyType, SurveyStatus } from '../interfaces/survey.interfaces'

const SurveyAddPage = () => {
  const navigate = useNavigate()
  const snackbar = useSnackbar()

  const surveyMutation = useMutation({
    mutationFn: (data: SurveyType) => createSurvey(data),
    onSuccess: (survey: SurveyType) => {
      if (survey) {
        snackbar.show(
          "Survey succesfully created",
          "success",
          true
        );
        navigate('/survey/' + survey.id)
      }
    },
  })

  const handleSubmitSurvey = (data: SurveyType) => {
    surveyMutation.mutate({
      ...data,
      status: SurveyStatus.IN_PROGRESS,
    })
  }

  return (
    <>
      <BaseGoBack />
      <Grid container>
        <Grid item xs={12}>
          <SurveyForm
            isLoadingSubmit={surveyMutation.isLoading}
            onSubmitSurvey={handleSubmitSurvey}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SurveyAddPage
