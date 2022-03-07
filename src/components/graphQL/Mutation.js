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
export const updatePartner = gql`
  mutation updatePartnerProfile(
    $id: String
    $name: String
    $category: String
    $email: String
    $logoImageUrl: String
  ) {
    updatePartnerProfile(
      data: {
        id: $id
        name: $name
        category: $category
        email: $email
        logoImageUrl: $logoImageUrl
      }
    ) {
      partner {
        _id
        name
        email
        category
        logoImageUrl
        accountId
        dociId
      }
      errors {
        field
        message
      }
    }
  }
`
export const fulfillDrugOrder = gql`
  mutation fulfillDrugOrder($id: String) {
    fulfillDrugOrder(data: { id: $id }) {
      drugOrder {
        _id
        partner
        patient
        doctor
        orderId
        status
        reason
        consultationId
        note
        cancellationReason
        partnerData
        doctorData
        patientData
        prescriptions {
          priceListId
          drugName
          drugPrice
          unitPrice
          dosageQuantity
          notes
        }
        userLocation {
          address
          phoneNumber
          city
          lat
          lng
        }
      }
      errors {
        field
        message
      }
    }
  }
`
