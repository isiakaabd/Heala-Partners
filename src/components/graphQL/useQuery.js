import { gql } from '@apollo/client'
export const getPartner = gql`
  query getPartner($id: String!) {
    getPartner(accountId: $id) {
      _id
      name
      email
      category
      logoImageUrl
    }
  }
`
