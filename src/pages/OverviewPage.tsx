import { useMemo } from 'react'
import { Grid } from '@mui/material'
import { useQuery } from 'react-query'

import SurveyList from '../modules/survey/SurveyList'

import { getAllSurvey } from '../services/surveyService'

import { SurveyType, SurveyStatus } from '../interfaces/survey.interfaces'

const OverviewPage = () => {
  const { data: surveys, isLoading } = useQuery<SurveyType[]>(
    ['survey-list'],
    getAllSurvey
  )

  const runningSurveys: SurveyType[] = useMemo(() => {
    return (
      surveys?.filter(
        (survey: SurveyType) => survey.status === SurveyStatus.IN_PROGRESS
      ) ?? []
    )
  }, [surveys])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SurveyList
            titleList="Running survey"
            surveys={runningSurveys}
            isLoadingList={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </>
  )
}

export default OverviewPage
