import React, { useState } from 'react'
import {
  Typography,
  Radio,
  Box,
  Checkbox,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  Slider,
  styled,
} from '@mui/material'
import { CSSTransition } from 'react-transition-group'

import { MinimalTextField, MinimalButton } from '../response/ResponseStart'

import { Question, QuestionType } from '../../interfaces/question.interfaces'
import { ResponseSubmitType } from '../../interfaces/response.interfaces'
import BaseLinearProgress from '../../components/BaseLinearProgress'

const MinimalSelect = styled(Select)`
  && {
    width: 300px;
    margin: 0 auto;
    background-color: #f1f1f1;

    .MuiOutlinedInput-input {
      padding: 8px 10px;
    }

    .MuiOutlinedInput-root {
      border-radius: 10px;
      border: none;
      margin-bottom: 0;
    }

    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: black;
    }

    .MuiInputLabel-root {
      display: none;
    }

    .MuiSelect-icon {
      color: #333;
    }

    .MuiSelect-root.Mui-disabled {
      color: #f1f1f1;
      background-color: #f1f1f1;
    }

    .MuiSelect-root {
      color: #f1f1f1;
      background-color: #f1f1f1;
    }
  }
`

interface QuestionSurveyTaskProps {
  questions: Question[]
  onFinishQuestion: (data: ResponseSubmitType[]) => void
}

const QuestionSurveyTask: React.FC<QuestionSurveyTaskProps> = ({
  questions,
  onFinishQuestion,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [answerTemp, setAnswerTemp] = useState<any>()
  const [showNextButton, setShowNextButton] = useState(false)
  const [surveyCompleted, setSurveyCompleted] = useState(false)

  const handleAnswerChange = (answer: any, questionType: QuestionType) => {
    setAnswerTemp((prevState: any) => {
      if (questionType === QuestionType.CHECKBOX) {
        if (prevState && prevState.includes(answer)) {
          return prevState.filter((option: any) => option !== answer)
        } else {
          return [...(prevState || []), answer]
        }
      }

      return answer
    })

    setShowNextButton(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setSurveyCompleted(true)
      setShowNextButton(false)

      const answerData = [...answers, answerTemp]
      const responseArray: ResponseSubmitType[] = []

      questions.forEach((question: Question, index: number) => {
        responseArray.push({
          respondentName: '',
          surveyId: '',
          responseValue: answerData[index],
          questionId: question.id,
        })
      })

      onFinishQuestion(responseArray)
    } else {
      setAnswerTemp(undefined)
      setAnswers((prevState) => [...prevState, answerTemp])
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'TEXT':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: '#f1f1f1' }}>
              {currentQuestionIndex + 1}. {question.text}
            </Typography>
            <MinimalTextField
              type="text"
              onChange={(e) =>
                handleAnswerChange(e.target.value, question.type)
              }
            />
          </div>
        )
      case 'RATING':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: '#f1f1f1' }}>
              {question.text}
            </Typography>
            <Slider
              value={answerTemp || 0}
              onChange={(e, value) => handleAnswerChange(value, question.type)}
              min={1}
              max={5}
              marks
              step={1}
              aria-labelledby="rating-slider"
            />
            <Typography variant="subtitle1">
              Selected Rating: {answerTemp}
            </Typography>
          </Box>
        )
      case 'DROPDOWN':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: '#f1f1f1' }}>
              {currentQuestionIndex + 1}. {question.text}
            </Typography>
            <MinimalSelect
              onChange={(e) =>
                handleAnswerChange(e.target.value, question.type)
              }
              value={answerTemp || ''}
            >
              {question.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </MinimalSelect>
          </div>
        )
      case 'RADIO':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: '#f1f1f1' }}>
              {currentQuestionIndex + 1}. {question.text}
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label={question.text}
                name={question.id}
                value={answerTemp || ''}
                onChange={(e) =>
                  handleAnswerChange(e.target.value, question.type)
                }
              >
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        )

      case 'CHECKBOX':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: '#f1f1f1' }}>
              {currentQuestionIndex + 1}. {question.text}
            </Typography>
            <FormGroup>
              {question.options.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={answerTemp?.includes(option)}
                      onChange={(e) =>
                        handleAnswerChange(option, question.type)
                      }
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
          </div>
        )

      default:
        return null
    }
  }

  const handleTransitionEnd = () => {
    if (currentQuestionIndex === questions.length) {
      setSurveyCompleted(true)
    }
  }

  return (
    <div className="question-container" style={{ width: '100%' }}>
      <CSSTransition
        in={currentQuestionIndex < questions.length}
        timeout={300}
        classNames="question-transition"
        unmountOnExit
        onEntered={handleTransitionEnd}
      >
        <div>
          {currentQuestionIndex < questions.length && !surveyCompleted
            ? renderQuestion(questions[currentQuestionIndex])
            : null}
        </div>
      </CSSTransition>
      <CSSTransition
        in={surveyCompleted}
        timeout={300}
        classNames="question-transition"
        unmountOnExit
      >
        <div>
          {surveyCompleted && (
            <div>
              <Typography variant="h5">Survey Completed!</Typography>
              <ul>
                {questions.map((question, index) => (
                  <li key={question.id}>
                    <strong>Question {index + 1}:</strong> {question.text}
                    <br />
                    <strong>Answer:</strong> {answers[index]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CSSTransition>
      <Box
        mt={6}
        sx={{
          visibility: `${showNextButton && answerTemp ? 'visible' : 'hidden'}`,
        }}
      >
        <MinimalButton
          sx={{ width: '100%' }}
          variant="contained"
          onClick={handleNext}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </MinimalButton>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          width: '60%',
          left: 0,
          right: 0,
          margin: '0 auto',
        }}
      >
        <BaseLinearProgress
          value={
            surveyCompleted
              ? 100
              : Math.round(((answers.length + 1) / questions.length) * 100)
          }
        />
      </Box>
    </div>
  )
}

export default QuestionSurveyTask
