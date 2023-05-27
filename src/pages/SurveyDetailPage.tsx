import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Masonry from 'react-masonry-css'
import { Typography, Skeleton, Button } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'

import BaseGoBack from '../components/BaseGoBack'
import QuestionCard from '../modules/question/QuestionCard'
import BaseContainer from '../components/BaseContainer'

import { getSurveyById } from '../services/surveyService'
import { getQuestionAnalytics } from '../services/questionService'

import { SurveyType } from '../interfaces/survey.interfaces'

const breakpointColumnsObj = {
  default: 2,
  768: 1, // 1 column on screens equal to or larger than 768px
}

const SurveyDetailPage = () => {
  const { surveyId } = useParams()

  const { data: survey, isLoading: isSurveyLoading } = useQuery<SurveyType>(
    ['surveyById', surveyId],
    () => getSurveyById(surveyId || '')
  )

  const { data: questions, isLoading: isQuestionsLoading } = useQuery(
    ['questionAnalytics', surveyId],
    () => getQuestionAnalytics(surveyId || '')
  )

  const handleSeeSurvey = () => {
    window.open(`${window.location.origin}/task-survey/${survey?.slug ?? ''}?id=${surveyId}`, '_blank');
  }

  if (isSurveyLoading || isQuestionsLoading) {
    return (
      <div>
        <BaseGoBack />
        <BaseContainer title="Loading survey...">
          <Skeleton variant="text" height={40} animation="wave" />
          <Skeleton variant="text" height={20} animation="wave" />
          <Skeleton variant="text" height={20} animation="wave" />
        </BaseContainer>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div style={{ marginBottom: '1rem' }} key={index}>
              <Skeleton variant="rectangular" height={200} animation="wave" />
            </div>
          ))}
        </Masonry>
      </div>
    )
  }

  return (
    <div>
      <BaseGoBack />

      {survey ? (
        <div>
          <BaseContainer
            title="Survey Detail"
            action={
              <Button
                onClick={handleSeeSurvey}
                variant="contained"
                color="primary"
                startIcon={<VisibilityIcon />}
                disabled={!survey.isPublished}
              >
                See Survey
              </Button>
            }
          >
            <Typography mb={2} variant="h6">
              Title: {survey.title}
            </Typography>
            <Typography mb={2} variant="body1">
              Description: {survey.description}
            </Typography>
            <Typography mb={2} variant="body1">
              Published: {survey.isPublished ? 'Yes' : 'No'}
            </Typography>
          </BaseContainer>
          <Typography variant="h6" mt={8}>
            Questions:
          </Typography>

          <Masonry
            breakpointCols={breakpointColumnsObj} // Define the number of columns based on the viewport width
            className="masonry-grid"
            columnClassName="masonry-grid-column"
          >
            {questions.map((question: any) => (
              <div style={{ marginBottom: '1rem' }} key={question.id}>
                <QuestionCard question={question} />
              </div>
            ))}
          </Masonry>
        </div>
      ) : (
        <Typography variant="h6">Survey not found.</Typography>
      )}
    </div>
  )
}

export default SurveyDetailPage
