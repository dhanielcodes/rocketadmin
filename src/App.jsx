import { useEffect, useState } from "react";
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
import Error from "./Routes/Error";
import TransferDetailsPage from "./Routes/TransferDetails";
import IncompleteTransfersPage from "./Routes/PaymentCheck";
import IncompletePayWithBankTransfersPage from "./Routes/IncompletePayWithBankTransfers";
import PaymentCheckPage from "./Routes/IncompleteTransfers copy";
import UpdateEmployee from "./Routes/UpdateEmployee";
function App() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const navAccess =
    userDetails?.userRoleMenuAccess
      ?.map((item) => {
        if (item?.menuAccessType?.id !== 1) {
          return {
            ...item,
          };
        }
      })
      .filter((item) => item !== undefined) || [];

  const allSubArrays = [];
  const [newArra, setNewArra] = useState([]);

  useEffect(() => {
    // Loop through the nested array
    navAccess?.forEach((innerArray) => {
      // Loop through the inner arrays
      innerArray?.userRoleSubMenuAccess?.forEach((element) => {
        // Add each element to the parent array
        allSubArrays.push(element);
        element?.userRoleSuSubbMenuAccess?.forEach((kk) => {
          // Add each element to the parent array
          allSubArrays.push(kk);
        });
      });
    });
    setNewArra([...navAccess, ...allSubArrays]);
  }, []);

  const les = [
    ...new Map(
      newArra.map((item) => [
        item?.menuName || item?.subMenuName || item?.subSubMenuName,
        item,
      ])
    ).values(),
  ];

  const actualArrayAccess =
    les?.map((item) => {
      return {
        ...item,
        name: item?.menuName || item?.subMenuName || item?.subSubMenuName,
      };
    }) || [];

  console.log(
    actualArrayAccess?.map((item) => item?.name),
    "dsdds"
  );

  function handleCheckAccess(val, metrics) {
    return metrics?.some((item) => val === item?.name);
  }

  console.log(handleCheckAccess("Dashboard", actualArrayAccess), "kklsd");

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
              {handleCheckAccess("Dashboard", actualArrayAccess) && (
                <Route
                  path="/dashboard"
                  element={
                    <AppLogout>
                      <Dashboard />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Dashboard", actualArrayAccess) && (
                <Route
                  path="/payout-dashboard"
                  element={
                    <AppLogout>
                      <PayoutDashboard />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("KYC Provider", actualArrayAccess) && (
                <Route
                  path="/kyc-provider"
                  element={
                    <AppLogout>
                      <KYCProvider />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Payout Partner", actualArrayAccess) && (
                <Route
                  path="/payout-partner"
                  element={
                    <AppLogout>
                      <PayoutPartnersPage />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("User Access ", actualArrayAccess) && (
                <Route
                  path="/user-access-"
                  element={
                    <AppLogout>
                      <UserAccessPage />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("User Role", actualArrayAccess) && (
                <Route
                  path="/user-role"
                  element={
                    <AppLogout>
                      <UserRolePage />
                    </AppLogout>
                  }
                />
              )}
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
              {handleCheckAccess("Agents", actualArrayAccess) && (
                <Route
                  path="/agents"
                  element={
                    <AppLogout>
                      <Agent />
                    </AppLogout>
                  }
                />
              )}
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
              {handleCheckAccess("Agent Invite", actualArrayAccess) && (
                <Route
                  path="/agent-invite"
                  element={
                    <AppLogout>
                      <AgentInviteList />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Customers", actualArrayAccess) && (
                <Route
                  path="/customers"
                  element={
                    <AppLogout>
                      <Customers />
                    </AppLogout>
                  }
                />
              )}
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
              {handleCheckAccess("Customers", actualArrayAccess) && (
                <Route
                  path="/customers-details"
                  element={
                    <AppLogout>
                      <CustomerDetailsPage />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess(
                "Payout Channel Processor",
                actualArrayAccess
              ) && (
                <Route
                  path="/payout-channel-processor"
                  element={
                    <AppLogout>
                      <PayoutProcessors />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess(
                "Payment Channel Processor",
                actualArrayAccess
              ) && (
                <Route
                  path="/payment-channel-processor"
                  element={
                    <AppLogout>
                      <PaymentProcessors />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Payment Channels", actualArrayAccess) && (
                <Route
                  path="/payment-channels"
                  element={
                    <AppLogout>
                      <PaymentChannels />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Payment Provider", actualArrayAccess) && (
                <Route
                  path="/payment-provider"
                  element={
                    <AppLogout>
                      <PaymentProviders />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Payout Channels", actualArrayAccess) && (
                <Route
                  path="/payout-channels"
                  element={
                    <AppLogout>
                      <PayoutChannels />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Payout Provider", actualArrayAccess) && (
                <Route
                  path="/payout-provider"
                  element={
                    <AppLogout>
                      <PayoutProvidersList />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Update Rate & Fees", actualArrayAccess) && (
                <Route
                  path="/update-rate-&-fees"
                  element={
                    <AppLogout>
                      <UpdateRatesPage />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess(
                "Currency Rate Metadata",
                actualArrayAccess
              ) && (
                <Route
                  path="/currency-rate-metadata"
                  element={
                    <AppLogout>
                      <RateMetadata />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Action Required", actualArrayAccess) && (
                <Route
                  path="/action-required"
                  element={
                    <AppLogout>
                      <ActionRequired />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess(
                "Incomplete Registration",
                actualArrayAccess
              ) && (
                <Route
                  path="/incomplete-registration"
                  element={
                    <AppLogout>
                      <IncompleteRegistration />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Send Money", actualArrayAccess) && (
                <Route
                  path="/send-money"
                  element={
                    <AppLogout>
                      <SendMoney />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Beneficiary", actualArrayAccess) && (
                <Route
                  path="/beneficiary"
                  element={
                    <AppLogout>
                      <Beneficiary />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Country", actualArrayAccess) && (
                <Route
                  path="/country"
                  element={
                    <AppLogout>
                      <CountriesPage />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Dashboard", actualArrayAccess) && (
                <Route
                  path="/cities"
                  element={
                    <AppLogout>
                      <CitiesPage />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("View Transfers", actualArrayAccess) && (
                <Route
                  path="/view-transfers"
                  element={
                    <AppLogout>
                      <TransfersListPage />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Incomplete Transfers", actualArrayAccess) && (
                <Route
                  path="/incomplete-transfers"
                  element={
                    <AppLogout>
                      <IncompleteTransfersPage />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess(
                "Incomplete Pay With Bank Transfers",
                actualArrayAccess
              ) && (
                <Route
                  path="/incomplete-pay-with-bank-transfers"
                  element={
                    <AppLogout>
                      <IncompletePayWithBankTransfersPage />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("Payment Check", actualArrayAccess) && (
                <Route
                  path="/payment-check"
                  element={
                    <AppLogout>
                      <PaymentCheckPage />
                    </AppLogout>
                  }
                />
              )}
              {/* jjj */}
              {handleCheckAccess("Payout Transfers", actualArrayAccess) && (
                <Route
                  path="/payout-transfers"
                  element={
                    <AppLogout>
                      <PayoutTransactionsPage />
                    </AppLogout>
                  }
                />
              )}
              <Route
                path="/client-log-request"
                element={
                  <AppLogout>
                    <ClientFundRequestLogPage />
                  </AppLogout>
                }
              />
              {handleCheckAccess("Notification", actualArrayAccess) && (
                <Route
                  path="/notification"
                  element={
                    <AppLogout>
                      <NotificationsPage />
                    </AppLogout>
                  }
                />
              )}
              <Route
                path="/alerts"
                element={
                  <AppLogout>
                    <KycAlertsPage />
                  </AppLogout>
                }
              />
              {handleCheckAccess("Employee Master", actualArrayAccess) && (
                <Route
                  path="/employee-master"
                  element={
                    <AppLogout>
                      <EmployeeMaster />
                    </AppLogout>
                  }
                />
              )}
              <Route
                path="/create-employee"
                element={
                  <AppLogout>
                    <CreateNewEmployee />
                  </AppLogout>
                }
              />
              <Route
                path="/update-employee"
                element={
                  <AppLogout>
                    <UpdateEmployee />
                  </AppLogout>
                }
              />
              {handleCheckAccess("Profession Master", actualArrayAccess) && (
                <Route
                  path="/profession-master"
                  element={
                    <AppLogout>
                      <ProfessionMaster />
                    </AppLogout>
                  }
                />
              )}
              {handleCheckAccess("View Transfer", actualArrayAccess) && (
                <Route
                  path="/transaction-details"
                  element={
                    <AppLogout>
                      <TransferDetailsPage />
                    </AppLogout>
                  }
                />
              )}
            </>
          )}
          <Route path="/" element={<Login />} />

          {/* </Route> */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
