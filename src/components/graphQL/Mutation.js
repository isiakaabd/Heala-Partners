import { gql } from '@apollo/client'
export const updateDrugOrder = gql`
  mutation updateDrugOrder($id: String) {
    updateDrugOrder(data: { id: $id, status: "processing" }) {
      drugOrder {
        _id
      }
      errors {
        field
        message
      }
    }
  }
`
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
export const cancelDiagnosticTest = gql`
  mutation cancelDiagnosticTest($id: String!, $reason: String!) {
    cancelDiagnosticTest(data: { id: $id, reason: $reason }) {
      diagnosticTest {
        _id
        partner
        patient
        doctor
        affiliation
        reason
        referralId
        note
        time
        sampleCollection
        testResults
        cancellationReason
        userLocation {
          address
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
export const completeDiagnosticTest = gql`
  mutation completeDiagnosticTest($id: String!, $testResults: [JSONObject]) {
    completeDiagnosticTest(data: { id: $id, testResults: $testResults }) {
      diagnosticTest {
        _id
        partner
        patient
        doctor
        affiliation

        reason
        referralId
        note
        time
        sampleCollection
        testResults
        cancellationReason
        userLocation {
          address
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
export const scheduleDiagnosticTest = gql`
  mutation scheduleDiagnosticTest($id: String!, $time: String) {
    scheduleDiagnosticTest(data: { id: $id, time: $time }) {
      diagnosticTest {
        _id
        partner
        patient
        doctor
        affiliation

        reason
        referralId
        note
        time
        sampleCollection
        testResults
        cancellationReason
        userLocation {
          address
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
