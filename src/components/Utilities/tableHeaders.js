// Patients Route TableHeader
export const patientsHeadCells = [
  {
    id: 0,
    label: 'Date',
  },
  {
    id: 8,
    label: 'Order ID',
  },
  {
    id: 12,
    label: "Doctor's Name",
  },
  {
    id: 2,
    label: "Patient's Name",
  },
  {
    id: 3,
    label: 'Affliation',
  },
  {
    id: 4,
    label: '',
  },
]

export const messagesHeadCell = [
  { id: 0, label: 'Date' },
  { id: 9, label: 'Referral ID' },
  { id: 2, label: 'Cancellation Reasons' },
  { id: 3, label: "Patient's Name" },
]
export const emailHeader = [
  {
    id: 0,
    label: 'Recipients',
  },
  {
    id: 6,
    label: 'Subject',
  },
  {
    id: 4,
    label: 'Entry Date',
  },
  {
    id: 2,
    label: 'Plan',
  },

  {
    id: 8,
    label: 'Email',
  },
  {
    id: 9,
    label: '',
  },
]
export const PermissionHeader = [
  {
    id: 0,
    label: 'Permission',
  },
  {
    id: 6,
    label: 'CRUD',
  },
  {
    id: 3,
    label: '',
  },
]
export const adminHeader = [
  {
    id: 0,
    label: 'Admin Name',
  },
  {
    id: 1,
    label: 'Role',
  },
  {
    id: 2,
    label: '',
  },
]
export const roleHeader = [
  {
    id: 0,
    label: 'Role',
  },
  {
    id: 5,
    label: 'Permission',
  },
  {
    id: 2,
    label: '',
  },
]

export const HCPHeader = [
  {
    id: 0,
    label: 'Entry Date',
  },
  {
    id: 8,
    label: 'Type',
  },
  {
    id: 1,
    label: 'Name',
  },
  {
    id: 2,
    label: 'Medical ID',
  },

  {
    id: 4,
    label: '',
  },
]
export const financeHeader = [
  {
    id: 0,
    label: 'Entry Date',
  },
  {
    id: 1,
    label: 'Time',
  },
  {
    id: 2,
    label: 'Name',
  },

  {
    id: 3,
    label: 'Subscription Plan',
  },
  {
    id: 4,
    label: 'Amount',
  },
]
export const referralHeader = [
  {
    id: 0,
    label: 'Date',
  },
  {
    id: 1,
    label: 'Time',
  },
  {
    id: 2,
    label: ' Name',
  },

  {
    id: 3,
    label: 'Category',
  },
  {
    id: 4,
    label: "Patient's name",
  },
  {
    id: 5,
    label: 'Status',
  },
  {
    id: 6,
    label: '',
  },
]
export const subscriptionHeader = [
  {
    id: 0,
    label: 'Name of plan',
  },
  {
    id: 1,
    label: 'Amount',
  },
  {
    id: 2,
    label: ' Description',
  },

  {
    id: 3,
    label: '',
  },
]
export const payoutHeader = [
  {
    id: 0,
    label: 'Date',
  },
  {
    id: 1,
    label: 'Time',
  },
  {
    id: 2,
    label: ' Name',
  },

  {
    id: 3,
    label: 'Medical ID',
  },
  {
    id: 4,
    label: 'Amount Paid out',
  },
  {
    id: 5,
    label: 'Payout status',
  },
]
export const pendingHeader = [
  {
    id: 0,
    label: 'Date',
  },
  {
    id: 1,
    label: 'Heala  ID',
  },
  {
    id: 2,
    label: ' Name',
  },

  {
    id: 3,
    label: 'Amount paid',
  },
  {
    id: 4,
    label: 'Account Details',
  },
  {
    id: 5,
    label: 'Bank',
  },
]
export const viewRefferalHeader = [
  {
    id: 0,
    label: 'Name',
  },
  {
    id: 1,
    label: 'Category',
  },
  {
    id: 2,
    label: ' Available Time',
  },

  {
    id: 4,
    label: '',
  },
  {
    id: 5,
    label: '',
  },
]

// Patient > Consultation Route Table
export const consultationsHeadCells = [
  { id: 100, label: 'Name' },
  { id: 101, label: 'Date' },
  { id: 102, label: 'Description' },
  { id: 103, label: '' },
  { id: 104, label: '' },
]

// Patients > Prescription Route Table
export const prescriptionsHeadCells = [
  { id: 200, label: 'Date' },
  { id: 201, label: 'Details' },
  { id: 202, label: 'Dosage' },
]
export const consultationsHeadCells2 = [
  { id: 100, label: 'Doctor' },
  { id: 101, label: 'Date' },
  { id: 102, label: 'Time' },
  { id: 103, label: '' },
  { id: 139, label: '' },
]
export const consultationsHeadCells4 = [
  { id: 100, label: 'Date' },
  { id: 101, label: 'Doctor' },
  { id: 102, label: 'Symptoms' },
  { id: 105, label: 'Contact' },
  { id: 133, label: 'Type' },
  { id: 1232, label: 'Status' },
  { id: 103, label: '' },
]
export const editManagement = [
  {
    id: 110,
    label: '',
  },
  {
    id: 0,
    label: 'Endpoints',
  },
  {
    id: 1,
    label: 'Operations',
  },
]

// Patients > Medications Route Table
export const medicationsHeadCells = [
  { id: 300, label: 'Date Prescribed' },
  { id: 301, label: 'Medication Name' },
  { id: 302, label: 'Prescription Types' },
  { id: 303, label: 'Caregiver' },
]

// ------------------------------------

// Dashboard Route TableHeader
export const waitingHeadCells = [
  { id: 0, label: 'User ID' },
  { id: 1, label: 'Name' },
  { id: 2, label: 'Waiting Time' },
  { id: 3, label: '' },
]

export const availabilityHeadCells = [
  { id: 0, label: 'HCP ID' },
  { id: 1, label: 'Name' },
  { id: 2, label: 'Category' },
  { id: 3, label: 'Available Time' },
  { id: 4, label: '' },
]

// HCPs HEADCELLS
export const hcpsHeadCells = [
  { id: 0, label: 'Date' },
  { id: 1, label: 'Time' },
  { id: 2, label: 'Order Num' },
  { id: 3, label: "Patient's Name" },
  { id: 6, label: '' },
]

// Partner's HEADCELLS
export const partnersHeadCells = [
  { id: 0, label: 'Date' },
  { id: 1, label: 'Time' },
  { id: 2, label: 'Order Num' },
  { id: 3, label: "Patient's Name" },
  { id: 6, label: '' },
]

// Messages's HEADCELLS
export const messagesHeadCells = [
  { id: 24, label: 'Date' },
  { id: 9, label: 'Time' },
  { id: 2, label: 'Order Num' },
  { id: 22, label: "Cancellation's Reason" },
  { id: 3, label: "Patient's Name" },
  { id: 4, label: 'status' },
]
// HCP Patients HEADCELLS
export const hcpPatientsHeadCells = [
  { id: 0, label: 'User ID' },
  { id: 1, label: 'Patient Name' },
  { id: 2, label: '' },
]
