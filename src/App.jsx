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
import Customers from "./Routes/customers";
import Login from "./Routes/Login";
import ActionRequired from "./Routes/ActionRequired";
import IncompleteRegistration from "./Routes/IncompleteRegistration";
import SendMoney from "./Routes/SendMoney";
import Beneficiary from "./Routes/Beneficiary";
import PayoutDashboard from "./Routes/Payout/PayoutDashboard";
import ClientsPage from "./Routes/Payout/Clients";
import ClientDetailsPage from "./Routes/Payout/ClientDetails";
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route element={<InActivityTimeOut />}> */}
        <Route>
          {/* Dashboard Routes */}
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-payout" element={<PayoutDashboard />} />
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
