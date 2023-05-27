import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Skeleton,
} from '@mui/material'
import { styled, SxProps } from '@mui/system'

import BaseContainer from '../../components/BaseContainer'

import { SurveyType } from '../../interfaces/survey.interfaces'

type SurveyListProps = {
  titleList: string
  surveys: SurveyType[]
  isLoadingList?: boolean
}

type StyledListItemProps = {
  sx: SxProps
}

const StyledListItem = styled(ListItem)<StyledListItemProps>(
  ({ theme, sx }) => ({
    padding: '.5rem .85rem',
    height: '65px', // Set a fixed height for each list item
    transition: 'background-color 0.3s', // Apply a transition effect to the background color
    ...sx, // Apply custom styles passed via sx prop
    '&:hover': {
      backgroundColor: '#26a69a',
      color: 'white',
    },
  })
)

const SurveyList: React.FC<SurveyListProps> = ({
  titleList,
  surveys,
  isLoadingList,
}) => {
  return (
    <BaseContainer title={titleList}>
      {isLoadingList ? (
        <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
          {[...Array(5)].map((_, index) => (
            <StyledListItem
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
              }}
            >
              <ListItemText
                primary={<Skeleton animation="wave" height={24} width="80%" />}
                secondary={
                  <Skeleton animation="wave" height={16} width="60%" />
                }
              />
            </StyledListItem>
          ))}
        </List>
      ) : surveys && surveys?.length > 0 ? (
        <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
          {surveys.map((survey: any, index: number) => (
            <StyledListItem
              key={survey.id}
              sx={{
                backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
              }}
            >
              <ListItemText
                primary={survey.title}
                secondary={survey.description}
              />
            </StyledListItem>
          ))}
        </List>
      ) : (
        <Typography variant="subtitle1" align="center">
          No surveys available.
        </Typography>
      )}
    </BaseContainer>
  )
}

export default SurveyList
