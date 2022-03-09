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
export const getDiagnosticDashboard = gql`
  query getDiagnosticDashboard {
    getDiagnosticDashboard(partner: "") {
      testRequestsCount
      scheduledTestsCount
      completedTestsCount
      cancelledTestsCount
      testRequestsStats
      scheduledTestsStats
      completedTestsStats
      cancelledTestsStats
    }
  }
`
export const getDrugOrders = gql`
  query getDrugOrders($status: String, $patient: String) {
    getDrugOrders(status: $status, patient: $patient) {
      data {
        _id
        partner
        patient
        doctor
        createdAt
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
    }
  }
`
export const getDrugOrder = gql`
  query getDrugOrder($id: String!) {
    getDrugOrder(id: $id) {
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
  }
`

export const cancelDrugOrder = gql`
  mutation cancelDrugOrder($id: String, $reason: String) {
    cancelDrugOrder(data: { id: $id, reason: $reason }) {
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
export const getDiagnosticTests = gql`
  query getDiagnosticTests($status: String!) {
    getDiagnosticTests(status: $status) {
      data {
        _id
        partner
        patient
        doctor
        reason
        testId
        patientData
        doctorData
        referralId
        note
        sampleCollection
        testResults
        cancellationReason
        partnerData
        createdAt
        userLocation {
          address
          phoneNumber
          city
          lat
          lng
        }
      }
    }
  }
`
export const cancelDiagnosticReferral = gql`
  query cancelDiagnosticReferral($id: String) {
    cancelDiagnosticReferral(id: $id) {
      _id
      partner
      patient
      patientData
      doctorData
      doctor

      testId
      referralId
      note
      reason
      sampleCollection
      createdAt
      userLocation {
        address
        city
        lat
        lng
      }
    }
  }
`
export const getDiagnosticTest = gql`
  query getDiagnosticTest($id: String) {
    getDiagnosticTest(id: $id) {
      _id
      partner
      patient
      doctor
      reason
      referralId
      note
      testId
      status
      patientData
      doctorData
      sampleCollection
      testResults
      cancellationReason
      partnerData
      createdAt
      tests {
        name
        price
        tat
        paid
      }
      userLocation {
        address
        phoneNumber
        city
        lat
        lng
      }
    }
  }
`
