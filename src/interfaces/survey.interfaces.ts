import { Question } from './question.interfaces'

export enum SurveyStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export type SurveyType = {
  createdDate?: string | Date
  description: string
  slug?: string
  status: SurveyStatus
  themeColor?: null | string
  isPublished: boolean
  title: string
  userId?: string
  id?: string
  questions?: Question[]
}
