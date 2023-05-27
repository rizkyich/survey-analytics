import React, { ReactNode } from 'react'
import { Card, CardContent, Typography } from '@mui/material'

interface BaseCardProps {
  content: string | ReactNode
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  onClick?: () => void
}

const BaseCard: React.FC<BaseCardProps> = ({
  content,
  backgroundColor = '#ffffff',
  textColor = '#000000',
  borderColor = '#000000',
  onClick,
}) => {
  const cardStyle = {
    backgroundColor,
    color: textColor,
    border: `1px solid ${borderColor}`,
    padding: '16px',
    borderRadius: '8px',
    cursor: onClick ? 'pointer' : 'default',
  }

  return (
    <Card style={cardStyle} onClick={onClick}>
      <CardContent>
        {typeof content === 'string' ? (
          <Typography>{content}</Typography>
        ) : (
          content
        )}
      </CardContent>
    </Card>
  )
}

export default BaseCard
