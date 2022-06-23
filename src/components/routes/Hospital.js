import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "components/routes/PrivateRoute";
import { Loader } from "components/Utilities";
import {
  // Chat,
  // // Patients,
  // Subscription,
  // Hcps,
  // SingleHCP,
  // Appointments,
  // HcpEarnings,
  // HcpAvailability,
  // HcpPatients,
  // HcpAppointments,
  // HcpProfile,
  // Medications,
  // HospitalProfile,
  // // SinglePatient,
  // CaseNotes,
  // MedicalRecords,
  // Prescriptions,
  // PatientAppointment,
  // Email,
  // Consultations,
  // PatientProfile,
  // // HospitalDashboard,
  // HcpCaseNote,
  // HcpConsultations,
  // ViewMessage,
  // CreateMessage,
  // Messages,
  // WaitingListDetails,
  // WaitingList,
  // ViewReferral,
  // ReferralTab,
  // Finance,
  // Payout,
  // HCPChat,
  // CreateEmail,
  // ViewMail,
  // Financetable,
  // HospitalSettings,
  PageNotFound,
} from "components/pages";
const HospitalDashboard = lazy(() =>
  import("components/pages/HospitalDashboard")
);
const Patients = lazy(() => import("components/pages/Patients"));
const SinglePatient = lazy(() => import("components/pages/SinglePatient"));
const PatientProfile = lazy(() => import("components/pages/PatientProfile"));
const Chat = lazy(() => import("components/pages/Chat"));
const Consultations = lazy(() => import("components/pages/Consultations"));
const Prescriptions = lazy(() => import("components/pages/Prescriptions"));
const MedicalRecords = lazy(() => import("components/pages/MedicalRecords"));
const CaseNotes = lazy(() => import("components/pages/CaseNotes"));
const Medications = lazy(() => import("components/pages/Medications"));
const Hcps = lazy(() => import("components/pages/Hcps"));
const SingleHCP = lazy(() => import("components/pages/SingleHCP"));
const HcpProfile = lazy(() => import("components/pages/HcpProfile"));
const HCPChat = lazy(() => import("components/pages/HCPChat"));
const HcpAppointments = lazy(() => import("components/pages/HcpAppointments"));
const HcpAvailability = lazy(() => import("components/pages/HcpAvailability"));
const HcpEarnings = lazy(() => import("components/pages/HcpEarnings"));
const HcpPatients = lazy(() => import("components/pages/HcpPatients"));
const HcpCaseNote = lazy(() => import("components/pages/HcpCaseNote"));
const Appointments = lazy(() => import("components/pages/Appointments"));
const WaitingList = lazy(() => import("components/pages/WaitingList"));
const Messages = lazy(() => import("components/pages/Messages"));
const CreateMessage = lazy(() => import("components/pages/CreateMessage"));
const CreateEmail = lazy(() => import("components/pages/CreateEmail"));
const ViewMessage = lazy(() => import("components/pages/ViewMessage"));
const ViewMail = lazy(() => import("components/pages/ViewMail"));
const Email = lazy(() => import("components/pages/Email"));
const Finance = lazy(() => import("components/pages/Finance"));
const Financetable = lazy(() => import("components/pages/Financetable"));
const Payout = lazy(() => import("components/pages/Payout"));
const ViewReferral = lazy(() => import("components/pages/ViewReferral"));
const Subscription = lazy(() => import("components/pages/Subscription"));
const HospitalProfile = lazy(() => import("components/pages/HospitalProfile"));
const ReferralTab = lazy(() => import("components/pages/ReferralTab"));
const HospitalSettings = lazy(() =>
  import("components/pages/HospitalSettings")
);
const WaitingListDetails = lazy(() =>
  import("components/pages/WaitingListDetails")
);
const HcpConsultations = lazy(() =>
  import("components/pages/HcpConsultations")
);
const PatientAppointment = lazy(() =>
  import("components/pages/PatientAppointment")
);
const Hospital = () => {
  return (
    <Switch>
      <Suspense fallback={<Loader />}>
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
          exact
          path="/patients/:patientId/consultations/case-note/:id"
          component={CaseNotes}
        />

        <PrivateRoute
          path="/patients/:patientId/medications"
          component={Medications}
        />

        <PrivateRoute exact path="/hcps" component={Hcps} />
        <PrivateRoute exact path="/hcps/:hcpId" component={SingleHCP} />
        <PrivateRoute
          exact
          path="/hcps/:hcpId/profile"
          component={HcpProfile}
        />

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

        <PrivateRoute exact path="/messages" component={Messages} />
        <PrivateRoute
          path="/messages/create-message"
          component={CreateMessage}
        />
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
      </Suspense>
      <PrivateRoute path="*" component={PageNotFound} />
    </Switch>
  );
  // }
};

export default Hospital;
