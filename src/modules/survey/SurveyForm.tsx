import React, { useState, useEffect, useMemo } from 'react'
import { Typography, Box, Button, Skeleton, Modal } from '@mui/material'
import BaseContainer from '../../components/BaseContainer'
import SurveyTitleForm from './form/SurveyTitleForm'
import SurveyDescriptionForm from './form/SurveyDescriptionForm'
import PublishSurveyForm from './form/PublishSurveyForm'
import QuestionForm from './form/QuestionForm'

import { SurveyType } from '../../interfaces/survey.interfaces'
import { Question } from '../../interfaces/question.interfaces'

interface SurveyFormProps {
  survey?: SurveyType
  onSubmitSurvey: (data: SurveyType) => void
  isLoadingSurvey?: boolean
  isLoadingSubmit: boolean
}

const SurveyForm: React.FC<SurveyFormProps> = ({
  survey,
  onSubmitSurvey,
  isLoadingSurvey = false,
  isLoadingSubmit,
}) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isPublished, setIsPublished] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  useEffect(() => {
    // Set initial state based on the provided survey data
    if (survey) {
      setTitle(survey.title.trim())
      setDescription(survey.description)
      setIsPublished(survey.isPublished)
      setQuestions(survey.questions ?? [])
    }
  }, [survey])

  const handlePublishChange = (value: boolean) => {
    setIsPublished(value)
  }

  const handleSubmit = () => {
    // @ts-nocheck
    const surveyData = survey
      ? { ...survey, title, description, isPublished, questions }
      : { title, description, isPublished, questions }

    // Send API request to create or update the survey
    onSubmitSurvey(surveyData as SurveyType)
  }

  const isFormFilled = useMemo(
    () =>
      title.trim() !== '' && description.trim() !== '' && questions?.length > 0,
    [title, description, questions]
  )

  const handleConfirmationOpen = () => {
    setIsConfirmationOpen(true)
  }

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false)
  }

  if (isLoadingSurvey) {
    // Display loading skeleton while surveys are being fetched
    return (
      <div>
        <Box mb={4}>
          <Skeleton variant="rectangular" height={50} animation="wave" />
        </Box>
        <Box mb={4}>
          <Skeleton variant="rectangular" height={200} animation="wave" />
        </Box>
        <Box mb={4}>
          <Skeleton variant="rectangular" height={400} animation="wave" />
        </Box>
        <Button variant="contained" disabled fullWidth>
          Loading...
        </Button>
      </div>
    )
  }

  return (
    <div>
      <form>
        <Box mb={4}>
          <BaseContainer title={survey ? 'Edit Survey' : 'Create New Survey'}>
            <SurveyTitleForm title={title} setTitle={setTitle} />
            <SurveyDescriptionForm
              description={description}
              setDescription={setDescription}
            />
            <Box mt={2}>
              <PublishSurveyForm
                isPublished={isPublished}
                handlePublishChange={handlePublishChange}
              />
            </Box>
          </BaseContainer>
        </Box>

        <Box mb={4}>
          <BaseContainer title="Questions">
            <Box mt={4}>
              <QuestionForm questions={questions} setQuestions={setQuestions} />
            </Box>
          </BaseContainer>
        </Box>

        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleConfirmationOpen}
          disabled={!isFormFilled}
          fullWidth
        >
          {survey ? 'Update Survey' : 'Create Survey'}
        </Button>

        <Modal open={isConfirmationOpen} onClose={handleConfirmationClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Confirmation
            </Typography>
            <Typography variant="body1" gutterBottom>
              Are you sure you want to {survey ? 'update' : 'create'} the
              survey?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleConfirmationClose}
                disabled={isLoadingSubmit}
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              {isLoadingSubmit ? (
                <Button variant="contained" disabled>
                  Loading...
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!isFormFilled}
                >
                  Confirm
                </Button>
              )}
            </Box>
          </Box>
        </Modal>
      </form>
    </div>
  )
}

export default SurveyForm
