import { gql } from '@apollo/client/core'

export const CREATE_APPLICATION = gql`
  mutation CreateApplication(
    $fullName: String!
    $birthDate: CalendarDay
    $gender: String!
    $marriageStatus: String
    $email: String!
    $resume: Upload
  ) {
    createApplication(
      data: {
        fullName: $fullName
        birthDate: $birthDate
        gender: $gender
        marriageStatus: $marriageStatus
        email: $email
        resume: { upload: $resume }
      }
    ) {
      id
      fullName
      email
      gender
      marriageStatus
      createdAt
    }
  }
`