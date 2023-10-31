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
                path="/dashboard-payout"
                element={
                  <AppLogout>
                    <PayoutDashboard />
                  </AppLogout>
                }
              />
              <Route
                path="/kyc-providers"
                element={
                  <AppLogout>
                    <KYCProvider />
                  </AppLogout>
                }
              />
              <Route
                path="/payout-providers"
                element={
                  <AppLogout>
                    <PayoutProvidersPage />
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
                path="/customers"
                element={
                  <AppLogout>
                    <Customers />
                  </AppLogout>
                }
              />
              <Route
                path="/actionrequired"
                element={
                  <AppLogout>
                    <ActionRequired />
                  </AppLogout>
                }
              />
              <Route
                path="/incompleteregistration"
                element={
                  <AppLogout>
                    <IncompleteRegistration />
                  </AppLogout>
                }
              />
              <Route
                path="/sendmoney"
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
