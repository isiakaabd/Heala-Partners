import { gql } from '@apollo/client'

export const Login_USER = gql`
  mutation Login($data: LoginUserInput!) {
    login(data: $data) {
      message
      account {
        _id
        dociId
        access_token
        refresh_token
        role
        userTypeId
        email
      }
      errors {
        message
      }
    }
  }
`
export const LOGOUT_USER = gql`
  mutation logout {
    logout
  }
`
