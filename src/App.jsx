import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BodyLayout from "./reuseables/BodyLayout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";

import { styled } from "styled-components";
import Dashboard from "./Routes/Dashboard";
import Agent from "./Routes/Agent";
import Customers from "./Routes/Customers";
import Login from "./Routes/Login";
import ActionRequired from "./Routes/ActionRequired";
import IncompleteRegistration from "./Routes/IncompleteRegistration";
import SendMoney from "./Routes/SendMoney";
import Beneficiary from "./Routes/Beneficiary";
import PayoutDashboard from "./Routes/Payout/PayoutDashboard";
import ClientsPage from "./Routes/Payout/Clients";
import ClientDetailsPage from "./Routes/Payout/ClientDetails";
import KYCProvider from "./Routes/Payout/KYCProvider";
import PayoutProvidersPage from "./Routes/Payout/PayoutProviders";
import { Toaster } from "react-hot-toast";
import AppLogout from "./reuseables/Logout";
import UpdateRatesPage from "./Routes/UpdateRates";
import CustomerDetailsPage from "./Routes/CustometsDetails/CustomerDetails";
import PayoutProcessors from "./Routes/PayoutProcessors";
import PaymentProcessors from "./Routes/PaymentProcessors";
import RateMetadata from "./Routes/RateMetadata";
import PaymentChannels from "./Routes/PaymentChannels";
import PayoutChannels from "./Routes/PayoutChannels";
import PaymentProviders from "./Routes/PaymentProviders";
import PayoutProviders from "./Routes/PayoutProviders";
import PayoutProvidersList from "./Routes/PayoutProviders";
import CountriesPage from "./Routes/Countries";
import CitiesPage from "./Routes/Cities";
import TransfersListPage from "./Routes/Transfers";
import CreateNewMetadata from "./Routes/CreateNewMetadata";
import UpdateRateMetaData from "./Routes/UpdateRateMetaData";
import AgentInviteList from "./Routes/AgentInviteList";
import CreateNewDocument from "./Routes/CreateNewDocument";
import EditNewDocument from "./Routes/EditNewDocument";
import PayoutPartnersPage from "./Routes/PayoutPartners";
import NotificationsPage from "./Routes/Notifications";
import KycAlertsPage from "./Routes/KycAlerts";
import EmployeeMaster from "./Routes/Employee/EmployeeMaster";
import CreateNewEmployee from "./Routes/CreateNewEmployee";
import ProfessionMaster from "./Routes/ProfessionMaster";
import UserAccessPage from "./Routes/UserAccess";
import UserRolePage from "./Routes/UserRoles";
import PayoutTransactionsPage from "./Routes/PayoutTransactions";
import ClientFundRequestLogPage from "./Routes/ClientFundRequestLog";
function App() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              fontSize: "16px",
              marginTop: "14px",
              color: "white",
              background: "#3fb172",
              padding: "10px",
            },
          },
          error: {
            style: {
              fontSize: "16px",
              marginTop: "14px",
              color: "white",
              background: "#ff0000",
              padding: "10px",
            },
          },
        }}
      />
      <Routes>
        {/* <Route element={<InActivityTimeOut />}> */}
        <Route>
          {/* Dashboard Routes */}
          {/* <Route element={<ProtectedRoute />}> */}
          {userDetails && (
            <>
              <Route
                path="/"
                element={
                  <AppLogout>
                    <Dashboard />
                  </AppLogout>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <AppLogout>
                    <Dashboard />
                  </AppLogout>
                }
              />
              <Route
                path="/payout-dashboard"
                element={
                  <AppLogout>
                    <PayoutDashboard />
                  </AppLogout>
                }
              />
              <Route
                path="/kyc-provider"
                element={
                  <AppLogout>
                    <KYCProvider />
                  </AppLogout>
                }
              />
              <Route
                path="/payout-partner"
                element={
                  <AppLogout>
                    <PayoutPartnersPage />
                  </AppLogout>
                }
              />
              <Route
                path="/user-access-"
                element={
                  <AppLogout>
                    <UserAccessPage />
                  </AppLogout>
                }
              />
              <Route
                path="/user-role"
                element={
                  <AppLogout>
                    <UserRolePage />
                  </AppLogout>
                }
              />
              <Route
                path="/clients"
                element={
                  <AppLogout>
                    <ClientsPage />
                  </AppLogout>
                }
              />
              <Route
                path="/client-detail"
                element={
                  <AppLogout>
                    <ClientDetailsPage />
                  </AppLogout>
                }
              />
              <Route
                path="/agent"
                element={
                  <AppLogout>
                    <Agent />
                  </AppLogout>
                }
              />
              <Route
                path="/new-document"
                element={
                  <AppLogout>
                    <CreateNewDocument />
                  </AppLogout>
                }
              />
              <Route
                path="/edit-document"
                element={
                  <AppLogout>
                    <EditNewDocument />
                  </AppLogout>
                }
              />
              <Route
                path="/agent-invites"
                element={
                  <AppLogout>
                    <AgentInviteList />
                  </AppLogout>
                }
              />
              <Route
                path="/customers"
                element={
                  <AppLogout>
                    <Customers />
                  </AppLogout>
                }
              />
              <Route
                path="/create-meta"
                element={
                  <AppLogout>
                    <CreateNewMetadata />
                  </AppLogout>
                }
              />
              <Route
                path="/update-meta"
                element={
                  <AppLogout>
                    <UpdateRateMetaData />
                  </AppLogout>
                }
              />
              <Route
                path="/customers-details"
                element={
                  <AppLogout>
                    <CustomerDetailsPage />
                  </AppLogout>
                }
              />
              <Route
                path="/payout-channel-processor"
                element={
                  <AppLogout>
                    <PayoutProcessors />
                  </AppLogout>
                }
              />
              <Route
                path="/payment-channel-processor"
                element={
                  <AppLogout>
                    <PaymentProcessors />
                  </AppLogout>
                }
              />
              <Route
                path="/payment-channels"
                element={
                  <AppLogout>
                    <PaymentChannels />
                  </AppLogout>
                }
              />
              <Route
                path="/payment-provider"
                element={
                  <AppLogout>
                    <PaymentProviders />
                  </AppLogout>
                }
              />
              <Route
                path="/payout-channels"
                element={
                  <AppLogout>
                    <PayoutChannels />
                  </AppLogout>
                }
              />
              <Route
                path="/payout-provider"
                element={
                  <AppLogout>
                    <PayoutProvidersList />
                  </AppLogout>
                }
              />
              <Route
                path="/update-rate-&-fees"
                element={
                  <AppLogout>
                    <UpdateRatesPage />
                  </AppLogout>
                }
              />
              <Route
                path="/currency-rate-metadata"
                element={
                  <AppLogout>
                    <RateMetadata />
                  </AppLogout>
                }
              />
              <Route
                path="/action-required"
                element={
                  <AppLogout>
                    <ActionRequired />
                  </AppLogout>
                }
              />
              <Route
                path="/incomplete-registration"
                element={
                  <AppLogout>
                    <IncompleteRegistration />
                  </AppLogout>
                }
              />
              <Route
                path="/send-money"
                element={
                  <AppLogout>
                    <SendMoney />
                  </AppLogout>
                }
              />
              <Route
                path="/beneficiary"
                element={
                  <AppLogout>
                    <Beneficiary />
                  </AppLogout>
                }
              />
              <Route
                path="/country"
                element={
                  <AppLogout>
                    <CountriesPage />
                  </AppLogout>
                }
              />
              <Route
                path="/cities"
                element={
                  <AppLogout>
                    <CitiesPage />
                  </AppLogout>
                }
              />
              <Route
                path="/view-transfers"
                element={
                  <AppLogout>
                    <TransfersListPage />
                  </AppLogout>
                }
              />
              <Route
                path="/payout-transfers"
                element={
                  <AppLogout>
                    <PayoutTransactionsPage />
                  </AppLogout>
                }
              />
              <Route
                path="/client-log-request"
                element={
                  <AppLogout>
                    <ClientFundRequestLogPage />
                  </AppLogout>
                }
              />
              <Route
                path="/notification"
                element={
                  <AppLogout>
                    <NotificationsPage />
                  </AppLogout>
                }
              />
              <Route
                path="/alerts"
                element={
                  <AppLogout>
                    <KycAlertsPage />
                  </AppLogout>
                }
              />
              <Route
                path="/employee-master"
                element={
                  <AppLogout>
                    <EmployeeMaster />
                  </AppLogout>
                }
              />{" "}
              <Route
                path="/create-employee"
                element={
                  <AppLogout>
                    <CreateNewEmployee />
                  </AppLogout>
                }
              />
              <Route
                path="/profession"
                element={
                  <AppLogout>
                    <ProfessionMaster />
                  </AppLogout>
                }
              />
            </>
          )}
          {!userDetails && <Route path="/" element={<Login />} />}

          {/* </Route> */}
          <Route path="*" element={<h1>Error</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
