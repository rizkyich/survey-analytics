export enum QuestionType {
  TEXT = 'TEXT',
  RADIO = 'RADIO',
  RATING = 'RATING',
  CHECKBOX = 'CHECKBOX',
  DROPDOWN = 'DROPDOWN',
}

export type Question = {
  id: string
  text: string
  type: QuestionType
  options: string[]
}
