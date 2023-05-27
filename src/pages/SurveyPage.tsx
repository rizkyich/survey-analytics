import { Grid, Skeleton } from '@mui/material'
import { useQuery } from 'react-query'

import SurveyTable from '../modules/survey/SurveyTable'

import { getAllSurvey } from '../services/surveyService'

import { SurveyType } from '../interfaces/survey.interfaces'

const SurveyPage = () => {
  const { data: surveys, isLoading } = useQuery<SurveyType[]>(
    ['survey-list'],
    getAllSurvey
  )

  if (isLoading) {
    return (
      <Grid container>
        <Grid item container xs={12}>
          <Skeleton variant="rectangular" height={500} width="100%" animation="wave" />
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container>
      <Grid item container xs={12}>
        <SurveyTable titleTable="All Survey" data={surveys ?? []} />
      </Grid>
    </Grid>
  )
}

export default SurveyPage
