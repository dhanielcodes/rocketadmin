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
function App() {
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-payout" element={<PayoutDashboard />} />
          <Route path="/kyc-providers" element={<KYCProvider />} />
          <Route path="/payout-providers" element={<PayoutProvidersPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/client-detail" element={<ClientDetailsPage />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/actionrequired" element={<ActionRequired />} />
          <Route
            path="/incompleteregistration"
            element={<IncompleteRegistration />}
          />
          <Route path="/sendmoney" element={<SendMoney />} />
          <Route path="/beneficiary" element={<Beneficiary />} />
          <Route path="/" element={<Login />} />

          {/* </Route> */}
          <Route path="*" element={<h1>Error</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
