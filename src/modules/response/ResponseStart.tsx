import React from 'react'
import { Typography, Box, TextField, Button, styled } from '@mui/material'

export const MinimalTextField = styled(TextField)`
  && {
    width: 300px;
    margin: 0 auto;

    .MuiOutlinedInput-input {
      padding: 8px 10px; /* Adjust the padding */
    }

    .MuiOutlinedInput-root {
      border-radius: 10px;
      border: none;
      background-color: #f1f1f1;
      margin-bottom: 0;
    }

    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
    }

    .MuiInputLabel-root {
      display: none;
    }
  }
`

export const MinimalButton = styled(Button)`
  && {
    border-radius: 10px;
    background-color: #333;
    color: #f1f1f1;
    text-transform: uppercase;
    font-weight: bold;
    padding: 10px 20px;
  }
`

interface ResponseStartProps {
  title: string
  description: string
  respondentName: string
  onStartQuestion: () => void
  setRespondentName: (value: string) => void
}

const ResponseStart: React.FC<ResponseStartProps> = ({
  title,
  description,
  respondentName,
  onStartQuestion,
  setRespondentName,
}) => {
  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body2" mt={2}>
        {description}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        mt={5}
      >
        <MinimalTextField
          variant="outlined"
          placeholder="Name..."
          value={respondentName}
          onChange={(e) => setRespondentName(e.target.value)}
        />
        {respondentName && (
          <MinimalButton variant="contained" onClick={onStartQuestion}>
            Start
          </MinimalButton>
        )}
      </Box>
    </>
  )
}

export default ResponseStart
