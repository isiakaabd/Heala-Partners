import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "components/routes/PrivateRoute";
import { CircularChart } from "components/Utilities";
import {
  Chat,
  Patients,
  Subscription,
  Hcps,
  SingleHCP,
  Appointments,
  HcpEarnings,
  HcpAvailability,
  HcpPatients,
  HcpAppointments,
  HcpProfile,
  Medications,
  HospitalProfile,
  SinglePatient,
  CaseNotes,
  MedicalRecords,
  Prescriptions,
  PatientAppointment,
  Email,
  Consultations,
  PatientProfile,
  HospitalDashboard,
  HcpCaseNote,
  HcpConsultations,
  ViewMessage,
  CreateMessage,
  Messages,
  WaitingListDetails,
  WaitingList,
  ViewReferral,
  ReferralTab,
  Finance,
  Payout,
  HCPChat,
  CreateEmail,
  ViewMail,
  Financetable,
  HospitalSettings,
} from "components/pages";

const Hospital = () => {
  return (
    <Switch>
      <PrivateRoute
        path={["/", "/dashboard"]}
        exact
        component={HospitalDashboard}
      />

      <PrivateRoute exact path="/patients" component={Patients} />

      <PrivateRoute
        exact
        path="/patients/:patientId"
        component={SinglePatient}
      />

      <PrivateRoute
        exact
        path="/patients/:patientId/profile"
        component={PatientProfile}
      />

      <PrivateRoute
        exact
        path="/patients/:patientId/profile/chat"
        component={Chat}
      />

      <PrivateRoute
        path="/patients/:patientId/consultations"
        exact
        component={Consultations}
      />

      <PrivateRoute
        path="/patients/:patientId/prescriptions"
        component={Prescriptions}
      />

      <PrivateRoute
        path="/patients/:patientId/appointments"
        component={PatientAppointment}
      />

      <PrivateRoute
        path="/patients/:patientId/records"
        component={MedicalRecords}
      />

      <PrivateRoute
        path="/patients/:patientId/consultations/case-note/:rowId"
        component={CaseNotes}
      />

      <PrivateRoute
        path="/patients/:patientId/medications"
        component={Medications}
      />

      <PrivateRoute exact path="/hcps" component={Hcps} />
      <PrivateRoute exact path="/hcps/:hcpId" component={SingleHCP} />
      <PrivateRoute exact path="/hcps/:hcpId/profile" component={HcpProfile} />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/profile/chat"
        component={HCPChat}
      />

      <PrivateRoute
        path="/hcps/:hcpId/appointments"
        component={HcpAppointments}
      />

      <PrivateRoute
        path="/hcps/:hcpId/availability"
        component={HcpAvailability}
      />

      <PrivateRoute path="/hcps/:hcpId/earnings" component={HcpEarnings} />
      <PrivateRoute path="/hcps/:hcpId/earnings" component={HcpEarnings} />

      <PrivateRoute
        path="/hcps/:hcpId/doctor-patients"
        component={HcpPatients}
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/consultations"
        component={HcpConsultations}
      />

      <PrivateRoute
        path="/hcps/:hcpId/consultations/case-note/:rowId"
        component={HcpCaseNote}
      />

      <PrivateRoute exact path="/appointments" component={Appointments} />

      <PrivateRoute
        exact
        path="/appointments/waiting-list"
        component={WaitingList}
      />

      <PrivateRoute
        path="/appointments/waiting-list/:listId"
        component={WaitingListDetails}
      />

      <PrivateRoute
        exact
        path="/appointments/consultation"
        component={CircularChart}
      />

      <PrivateRoute exact path="/messages" component={Messages} />
      <PrivateRoute path="/messages/create-message" component={CreateMessage} />
      <PrivateRoute path="/messages/:messageId" component={ViewMessage} />
      <PrivateRoute path="/email/create-email" component={CreateEmail} />
      <PrivateRoute path="/email/:emailId" component={ViewMail} />
      <PrivateRoute path="/email" component={Email} />
      <PrivateRoute exact path="/finance" component={Finance} />
      <PrivateRoute exact path="/finance/earnings" component={Financetable} />
      <PrivateRoute exact path="/finance/payouts" component={Payout} />
      <PrivateRoute path="/referrals/:referralId" component={ViewReferral} />
      <PrivateRoute path="/referrals" component={ReferralTab} />
      <PrivateRoute path="/plans" component={Subscription} />

      <PrivateRoute
        exact
        path="/hospital-settings"
        component={HospitalSettings}
      />

      <PrivateRoute
        path="/hospital-settings/profile"
        component={HospitalProfile}
      />
    </Switch>
  );
  // }
};

export default Hospital;
