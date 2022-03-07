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
