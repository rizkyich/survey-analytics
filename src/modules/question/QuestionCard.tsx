import React from 'react'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'

import BaseContainer from '../../components/BaseContainer'

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#0088aa',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
]

interface Question {
  id: string
  text: string
  type: string
  options: string[]
  surveyId: string
  analytics: any
}

interface QuestionCardProps {
  question: Question
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { text, type, analytics, options } = question

  let additionalDetails = null
  let chart = null

  switch (type) {
    case 'TEXT':
      additionalDetails = (
        <>
          <Typography variant="subtitle1">Type: {type}</Typography>
        </>
      )
      break
    case 'RADIO':
      additionalDetails = (
        <>
          <Typography variant="subtitle1">Type: {type}</Typography>
        </>
      )
      chart = (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={Object.entries(analytics?.responseCounts)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="0" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="1" fill="#8884d8" name="Response Counts" />
          </BarChart>
        </ResponsiveContainer>
      )
      break
    case 'DROPDOWN':
      additionalDetails = (
        <>
          <Typography variant="subtitle1">Type: {type}</Typography>
          {/* Render additional details specific to DROPDOWN question type */}
          <Box mt={2}>
            <Typography variant="subtitle1">Options:</Typography>
            <List>
              {options.map((option) => (
                <ListItem key={option}>
                  <ListItemText
                    primary={option}
                    secondary={`Count: ${analytics?.optionCounts[option] ?? 0}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      )
      break
    case 'RATING':
      additionalDetails = (
        <>
          <Typography variant="subtitle1">Type: {type}</Typography>
          <Box mt={2}>
            <div>
              <h3>{analytics?.averageRating ?? 0}/5</h3>
            </div>
          </Box>
        </>
      )
      break
    case 'CHECKBOX':
      additionalDetails = (
        <>
          <Typography variant="subtitle1">Type: {type}</Typography>
        </>
      )
      chart = (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="1"
              data={Object.entries(analytics?.optionCounts)}
              fill="#8884d8"
              label
            >
              {Object.entries(analytics?.optionCounts)?.map(
                ([option, count], index) => (
                  <Cell key={option} fill={COLORS[index % COLORS.length]} />
                )
              )}
            </Pie>
            <Tooltip />
            <Legend
              align="center"
              verticalAlign="bottom"
              layout="vertical"
              formatter={(value, entry) => {
                const option = Object.entries(analytics?.optionCounts)?.find(
                  // @ts-ignore
                  ([_, count]) => count === entry?.payload?.value
                )
                return option ? option[0] : ''
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )
      break
    default:
      additionalDetails = (
        <Typography variant="subtitle1">Invalid question type</Typography>
      )
      break
  }

  return (
    <BaseContainer title={text}>
      {additionalDetails}
      <Typography variant="subtitle1">
        Total Responses: {analytics?.totalResponses ?? 0}
      </Typography>
      {chart && <Box mt={4}>{chart}</Box>}
    </BaseContainer>
  )
}

export default QuestionCard
