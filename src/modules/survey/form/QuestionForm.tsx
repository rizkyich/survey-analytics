import React, { useState, ChangeEvent } from 'react'
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Paper,
  Divider,
  IconButton,
  SelectChangeEvent,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import { QuestionType, Question } from '../../../interfaces/question.interfaces'

interface QuestionFormProps {
  questions: Question[]
  setQuestions: (data: Question[]) => void
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  questions,
  setQuestions,
}) => {
  const [question, setQuestion] = useState<string>('')
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.TEXT
  )
  const [option, setOption] = useState<string>('')
  const [options, setOptions] = useState<string[]>([])

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
  }

  const handleQuestionTypeChange = (e: SelectChangeEvent<QuestionType>) => {
    setQuestionType(e.target.value as QuestionType)
    setOptions([])
  }

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value)
  }

  const handleOptionAdd = () => {
    if (option.trim() !== '') {
      setOptions([...options, option])
      setOption('')
    }
  }

  const handleQuestionAdd = () => {
    if (question.trim() !== '') {
      const newQuestion: Question = {
        id: '',
        text: question,
        type: questionType,
        options: [
          QuestionType.RADIO,
          QuestionType.CHECKBOX,
          QuestionType.DROPDOWN,
        ].includes(questionType)
          ? options
          : [],
      }
      setQuestions([...questions, newQuestion])
      setQuestion('')
      setQuestionType(QuestionType.TEXT)
      setOptions([])
      setOption('')
    }
  }

  const handleQuestionDelete = (index: number) => {
    const updatedQuestions = [...questions]
    updatedQuestions.splice(index, 1)
    setQuestions(updatedQuestions)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle1" sx={{ marginBottom: '.75rem' }}>
          New Question
        </Typography>
        <Box>
          <TextField
            label="Question"
            value={question}
            onChange={handleQuestionChange}
            fullWidth
          />
        </Box>
        <Select
          value={questionType}
          onChange={handleQuestionTypeChange}
          fullWidth
          sx={{
            marginTop: '1rem',
          }}
        >
          <MenuItem value={QuestionType.TEXT}>Text</MenuItem>
          <MenuItem value={QuestionType.RADIO}>Radio Input</MenuItem>
          <MenuItem value={QuestionType.RATING}>Rating</MenuItem>
          <MenuItem value={QuestionType.CHECKBOX}>Checkbox</MenuItem>
          <MenuItem value={QuestionType.DROPDOWN}>Dropdown</MenuItem>
        </Select>
      </Grid>

      {(questionType === QuestionType.RADIO ||
        questionType === QuestionType.DROPDOWN ||
        questionType === QuestionType.CHECKBOX) && (
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ marginBottom: '.75rem' }}>
            Options
          </Typography>
          <Box display="flex" alignItems="center">
            <TextField
              label="Option"
              value={option}
              onChange={handleOptionChange}
              fullWidth
            />
            <IconButton
              color="primary"
              onClick={handleOptionAdd}
              disabled={!option.trim()}
            >
              <AddIcon />
            </IconButton>
          </Box>
          {options?.length > 0 && (
            <List dense>
              {options.map((option, optionIndex) => (
                <ListItem key={optionIndex}>
                  <ListItemText primary={`${optionIndex + 1}. ${option}`} />
                  <IconButton
                    color="error"
                    onClick={() => {
                      const updatedOptions = [...options]
                      updatedOptions.splice(optionIndex, 1)
                      setOptions(updatedOptions)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      )}

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleQuestionAdd}
          disabled={
            !question.trim() ||
            ([
              QuestionType.RADIO,
              QuestionType.CHECKBOX,
              QuestionType.DROPDOWN,
            ].includes(questionType) &&
              options?.length === 0)
          }
          sx={{ marginTop: '1rem' }}
        >
          Add Question
        </Button>
      </Grid>

      {questions?.length > 0 && (
        <Grid item xs={12}>
          <Divider sx={{ marginTop: '2rem', marginBottom: '1rem' }} />
          <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>
            Added Questions
          </Typography>
          {questions.map((q, index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{ marginBottom: '1rem', padding: '1rem' }}
            >
              <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
                {q.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  marginBottom: '0.5rem',
                  color: 'text.secondary',
                }}
              >
                Type: {q.type}
              </Typography>
              {q.options && (
                <List dense disablePadding sx={{ marginTop: '0.5rem' }}>
                  {q.options.map((option, optionIndex) => (
                    <ListItem key={optionIndex}>
                      <ListItemText primary={`${optionIndex + 1}. ${option}`} />
                    </ListItem>
                  ))}
                </List>
              )}
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleQuestionDelete(index)}
                sx={{ marginTop: '1rem' }}
              >
                Delete Question
              </Button>
            </Paper>
          ))}
        </Grid>
      )}
    </Grid>
  )
}

export default QuestionForm
