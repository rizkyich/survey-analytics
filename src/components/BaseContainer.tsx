import React, { ReactNode } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { styled } from '@mui/system'

interface ContainerProps {
  title: string
  action?: ReactNode
  children: ReactNode
}

const ContainerWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  width: '100%',
  minHeight: '200px', // Minimum height, adjust as needed
}))

const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
  position: 'relative',
  paddingLeft: '1rem',
}))

const TitleBorder = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '-1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  height: '100%',
  width: '4px',
  backgroundColor: '#26a69a', // Adjust the color as needed
  borderTopRightRadius: theme.shape.borderRadius, // Add border radius to the right side of the border
  borderBottomRightRadius: theme.shape.borderRadius,
}))

const ActionContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '1rem',
})

const BaseContainer: React.FC<ContainerProps> = ({
  title,
  action,
  children,
}) => {
  return (
    <ContainerWrapper>
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'items-center',
          justifyContent: 'space-between',
        }}
      >
        <TitleContainer>
          <TitleBorder />
          <Typography variant="h6">{title}</Typography>
        </TitleContainer>
        {action && <ActionContainer>{action}</ActionContainer>}
      </Grid>
      {children}
    </ContainerWrapper>
  )
}

export default BaseContainer
