import React, { useState } from "react";
import DropDown from "../assets/icons/DropDown";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png.svg";
import DashboardIcon from "../assets/icons/Dashboard";
import AgentsIcon from "../assets/icons/AgentsIcon";
import SendMoneyIcon from "../assets/icons/SendMoneyIcon";
import BeneficiaryIcon from "../assets/icons/BeneficiaryIcon";
import UpdateIcon from "../assets/icons/UpdateIcon";
import TransfersIcon from "../assets/icons/TransfersIcon";
import ReportIcon from "../assets/icons/ReportIcon";
import CustomersIcon from "../assets/icons/CustomersIcon";

export default function NewNavBar() {
  const links = [
    {
      name: "Dashboard",
      path: "//",
      icon: DashboardIcon,
      miniLinks: [
        {
          name: "Dashboard",
          path: "/dashboard",
          parentName: "Dashboard",
        },
        {
          name: "MLRO Dashboard",
          path: "/ivr-campaign/media-mgmt",
          parentName: "Dashboard",
        },

        {
          name: "Payout Dashboard",
          path: "//",
          parentName: "Dashboard",
          miniLinks: [
            {
              name: "Overview",
              path: "/dashboard-payout",
              parentName: "Payout Dashboard",
            },
            {
              name: "Clients",
              path: "/clients",
              parentName: "Payout Dashboard",
            },
            {
              name: "KYC Providers",
              path: "/kyc-providers",
              parentName: "Payout Dashboard",
            },
          ],
        },
      ],
    },
    {
      name: "Agents",
      path: "/agent",
      icon: AgentsIcon,
    },
    {
      name: "Manage Customers",
      path: "//",
      icon: CustomersIcon,
      miniLinks: [
        {
          name: "Customers",
          path: "/customers",
          parentName: "Manage Customers",
        },
        {
          name: "Action Required",
          path: "/actionrequired",
          parentName: "Manage Customers",
        },
        {
          name: "Incomplete Registration",
          path: "/incompleteregistration",
          parentName: "Manage Customers",
        },
      ],
    },
    {
      name: "Send Money",
      path: "/sendmoney",
      icon: SendMoneyIcon,
    },
    {
      name: "Beneficiary",
      path: "/beneficiary",
      icon: BeneficiaryIcon,
    },
    {
      name: "Transfers",
      path: "//",
      icon: TransfersIcon,
      miniLinks: [
        {
          name: "Menu 1",
          path: "/transfers",
          parentName: "Manage Customers",
        },
        {
          name: "Menu 1",
          path: "/transfers",
          parentName: "Manage Customers",
        },
      ],
    },
    {
      name: "Updates and Rates",
      path: "/update",
      icon: UpdateIcon,
    },
    {
      name: "Reports",
      path: "//",
      icon: ReportIcon,
      miniLinks: [
        {
          name: "Menu 1",
          path: "/reports",
          parentName: "Manage Customers",
        },
        {
          name: "Menu 1",
          path: "/reports",
          parentName: "Manage Customers",
        },
      ],
    },
  ];

  const [active, setActive] = useState();
  const [active2, setActive2] = useState();

  const navigate = useNavigate();

  const updateActiveDropDown = (e, payload) => {
    e.stopPropagation();
    if (payload === active) {
      setActive("");
    } else {
      setActive(payload);
    }
  };
  const navigateTo = (e, payload) => {
    if (payload?.miniLinks?.length) {
      updateActiveDropDown(e, payload.name);
    } else {
      if (payload.parentName != active) {
        setActive("");
      }
      navigate(payload.path);
    }
  };

  const updateActiveDropDown2 = (e, payload) => {
    e.stopPropagation();
    if (payload === active2) {
      setActive2("");
    } else {
      setActive2(payload);
    }
  };
  const navigateTo2 = (e, payload) => {
    if (payload?.miniLinks?.length) {
      updateActiveDropDown2(e, payload.name);
    } else {
      if (payload.parentName != active2) {
        setActive2("");
      }
      navigate(payload.path);
    }
  };

  console.log(active);
  console.log(active2);

  return (
    <div style={{ width: "100%", padding: "10px 20px" }}>
      <img
        src={Logo}
        style={{ height: "90%", width: "60%", marginBottom: "20px" }}
      />

      <div>
        {links?.map((item) => {
          return (
            <>
              <NavTab
                onClick={(e) => {
                  navigateTo(e, item);
                }}
                $active={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "70%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <item.icon
                    color={item.path === location.pathname ? "#fff" : "#464F60"}
                    style={{
                      marginRight: "10px",
                    }}
                  />
                  <span
                    style={{
                      color:
                        item.path === location.pathname ? "#fff" : "#464F60",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                {item?.miniLinks && (
                  <DropDown
                    color={item.path === location.pathname ? "#fff" : "#464F60"}
                  />
                )}
              </NavTab>
              {
                <div
                  style={{
                    borderLeft: "1px solid gray",
                    marginLeft: "20px",
                    height: active === item.name && "auto",
                    maxHeight: active !== item.name ? 0 : "1000px",
                    overflow: active === item.name ? "auto" : "hidden",
                    transition: "all 0.4s",
                    marginBottom: active === item.name && "14px",
                  }}
                >
                  {item?.miniLinks?.map((link) => {
                    return (
                      <>
                        <NavTab
                          onClick={(e) => {
                            navigateTo2(e, link);
                          }}
                          $active={link.path}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "15px 14px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            width: "70%",
                            marginLeft: "30px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              style={{
                                color:
                                  link.path === location.pathname
                                    ? "#fff"
                                    : "#464F60",
                              }}
                            >
                              {link.name}
                            </span>
                          </div>
                          {link?.miniLinks && (
                            <DropDown
                              color={
                                item.path === location.pathname
                                  ? "#fff"
                                  : "#464F60"
                              }
                            />
                          )}
                        </NavTab>

                        {
                          <div
                            style={{
                              marginLeft: "60px",

                              height: active2 === link.name && "auto",
                              maxHeight: active2 !== link.name ? 0 : "1000px",
                              overflow:
                                active2 === link.name ? "auto" : "hidden",
                              transition: "all 0.4s",
                            }}
                          >
                            {link?.miniLinks?.map((innerLink) => {
                              return (
                                <>
                                  <NavTab
                                    onClick={(e) => {
                                      navigateTo(e, innerLink);
                                      navigateTo2(e, innerLink);
                                    }}
                                    $active={innerLink.path}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      padding: "15px 14px",
                                      borderRadius: "8px",
                                      cursor: "pointer",
                                      width: "70%",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color:
                                            innerLink.path === location.pathname
                                              ? "#fff"
                                              : "#464F60",
                                        }}
                                      >
                                        {innerLink.name}
                                      </span>
                                    </div>
                                  </NavTab>
                                </>
                              );
                            })}
                          </div>
                        }
                      </>
                    );
                  })}
                </div>
              }
            </>
          );
        })}
      </div>
    </div>
  );
}

const NavTab = styled.div`
  transition: all 0.1s;
  background: ${(props) =>
    props?.$active === location.pathname ? "#00a85a" : ""};
  margin-bottom: 10px;

  &:hover {
    background: ${(props) =>
      props?.$active === location.pathname ? "#00a85a" : "#c6c6c632"};
    transition: all 0.2s;
  }

  span {
    font-size: 15px;
    font-weight: 500;
  }
`;
