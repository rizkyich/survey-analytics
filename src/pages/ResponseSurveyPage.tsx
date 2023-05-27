import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/system'

import QuestionSurveyTask from '../modules/question/QuestionSurveyTask'
import ResponseStart from '../modules/response/ResponseStart'

import { getSurveyBySlugId } from '../services/surveyService'
import { saveResponses } from '../services/responseService'

import { SurveyType } from '../interfaces/survey.interfaces'
import { ResponseSubmitType } from '../interfaces/response.interfaces'

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    /* Desktop layout */
    alignItems: 'flex-start',
    padding: theme.spacing(4),
  },
}))

const Content = styled('div')(({ theme }) => ({
  maxWidth: '100%',
  width: '100%',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto',

  [theme.breakpoints.up('sm')]: {
    maxWidth: '480px', // Adjust the maximum width as per your needs
    padding: theme.spacing(4),
  },
}))

const ResponseSurveyPage = () => {
  const { surveySlug } = useParams()
  const [searchParams] = useSearchParams()

  const [respondentName, setRespondentName] = useState<string>('')
  const [showQuestion, setShowQuestion] = useState<boolean>(false)
  const [saveCompleted, setSaveCompleted] = useState<boolean>(false)

  const surveyId = searchParams.get('id') || ''

  const { data: survey, isLoading } = useQuery<SurveyType>(
    ['survey', surveySlug, surveyId],
    () => getSurveyBySlugId(surveySlug as string, surveyId)
  )

  const saveResponsesMutation = useMutation({
    mutationFn: (data: ResponseSubmitType[]) => saveResponses(data),
    onSuccess: (response) => {
      if (response) {
        setSaveCompleted(true)
      }
    },
  })

  const handleFinishQuestion = (responseArray: ResponseSubmitType[]) => {
    const dataArray = responseArray.map((response: ResponseSubmitType) => ({
      ...response,
      surveyId: surveyId,
      respondentName,
    }))

    saveResponsesMutation.mutate(dataArray)
  }

  if (isLoading || saveResponsesMutation.isLoading) {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  if (!survey) {
    return (
      <Container sx={{ background: '#f44336', color: 'white' }}>
        <Content>
          <p>No Survey</p>
        </Content>
      </Container>
    )
  }

  if (saveCompleted) {
    return (
      <Container sx={{ background: '#f44336', color: 'white' }}>
        <Content>
          <p>Survey Completed!</p>
        </Content>
      </Container>
    )
  }

  return (
    <Container
      sx={{
        background: `${survey.themeColor ?? '#f44336'}`,
        color: 'white',
      }}
    >
      <Content>
        {!showQuestion ? (
          <ResponseStart
            title={survey.title}
            description={survey.description}
            respondentName={respondentName}
            setRespondentName={setRespondentName}
            onStartQuestion={() => setShowQuestion(true)}
          />
        ) : (
          <QuestionSurveyTask
            questions={survey.questions}
            onFinishQuestion={handleFinishQuestion}
          />
        )}
      </Content>
    </Container>
  )
}

export default ResponseSurveyPage
