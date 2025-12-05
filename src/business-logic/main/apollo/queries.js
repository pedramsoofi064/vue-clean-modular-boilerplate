import { gql } from "@apollo/client/core";

// Main page images
export const GET_MAIN_PAGE_IMAGES = gql`
  query GetMainPageImages {
    mainPageImages(orderBy: { id: asc }) {
      id
      alt
      image {
        url
        width
        height
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $firstName: String!
    $lastName: String!
    $email: String!
    $message: String!
  ) {
    createComments(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        message: $message
      }
    ) {
      id
      firstName
      lastName
      email
      message
      createdAt
    }
  }
`;
