import React, { useEffect, useState } from "react";
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
import { FiLogOut } from "react-icons/fi";

export default function NewNavBar() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const navAccess = userDetails?.userRoleMenuAccess
    ?.map((item) => {
      if (item?.menuAccessType?.id !== 1) {
        if (item?.userRoleSubMenuAccess?.length) {
          return {
            ...item,
            name: item?.menuName,
            path: "//",
            miniLinks: item?.userRoleSubMenuAccess?.map((item) => {
              if (item?.userRoleSuSubbMenuAccess?.length) {
                return {
                  ...item,
                  name: item?.subMenuName,
                  path: "//",
                  miniLinks: item?.userRoleSuSubbMenuAccess?.map((item) => {
                    if (item?.userRoleSuSubbMenuAccess?.length) {
                      return {
                        ...item,
                        name: item?.subSubMenuName,
                        path: "//",
                      };
                    } else {
                      return {
                        ...item,
                        name: item?.subSubMenuName,
                        path: `/${item?.subSubMenuName
                          ?.toLowerCase()
                          ?.replace(/\s+/g, "-")}`,
                      };
                    }
                  }),
                };
              } else {
                return {
                  ...item,
                  name: item?.subMenuName,
                  path: `/${item?.subMenuName
                    ?.toLowerCase()
                    ?.replace(/\s+/g, "-")}`,
                };
              }
            }),
          };
        } else {
          return {
            ...item,
            name: item?.menuName,
            path: `/${item?.menuName?.toLowerCase()?.replace(/\s+/g, "-")}`,
            miniLinks: item?.userRoleSubMenuAccess?.map((item) => {
              if (item?.userRoleSuSubbMenuAccess?.length) {
                return {
                  ...item,
                  name: item?.subMenuName,
                  path: "//",
                };
              } else {
                return {
                  ...item,
                  name: item?.subMenuName,
                  path: `/${item?.subMenuName
                    ?.toLowerCase()
                    ?.replace(/\s+/g, "-")}`,
                };
              }
            }),
          };
        }
      }
    })
    .filter((item) => item !== undefined);

  const links = navAccess || [
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
          name: "Payout Partners",
          path: "/payout-partner",
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
      path: "//",
      icon: AgentsIcon,
      miniLinks: [
        {
          name: "Agent List",
          path: "/agent",
          parentName: "Manage Customers",
        },
        {
          name: "Agent Invite List",
          path: "/agent-invites",
          parentName: "Manage Customers",
        },
      ],
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
      path: "/send-money",
      init: "/send-money?step=1",
      icon: SendMoneyIcon,
    },
    {
      name: "Beneficiary",
      path: "/beneficiary",
      icon: BeneficiaryIcon,
    },
    {
      name: "Transfers Processors",
      path: "//",
      icon: TransfersIcon,
      miniLinks: [
        {
          name: "Payment Channel Processors",
          path: "/payment-processors",
          parentName: "Transfers Processors",
        },
        {
          name: "Payout Channel Processors",
          path: "/payout-processors",
          parentName: "Transfers Processors",
        },
      ],
    },
    {
      name: "Transfer List",
      path: "/transfers",
      icon: TransfersIcon,
    },
    {
      name: "Currency Rate Metadata",
      path: "/rate-metadata",
      icon: UpdateIcon,
    },
    {
      name: "Updates and Rates",
      path: "/update-rates",
      icon: UpdateIcon,
    },

    {
      name: "Masters",
      path: "//",
      icon: CustomersIcon,
      miniLinks: [
        {
          name: "Location",
          path: "//",
          parentName: "Masters",
          miniLinks: [
            {
              name: "Countries",
              path: "/countries",
              parentName: "Location",
            },
          ],
        },
        {
          name: "Employee ",
          path: "//",
          parentName: "Masters",
          miniLinks: [
            {
              name: "Employee Master",
              path: "/employee-master",
              parentName: "Employee",
            },
            {
              name: "User Access",
              path: "/user-access",
              parentName: "Employee",
            },
            {
              name: "User Roles",
              path: "/user-role",
              parentName: "Employee",
            },
          ],
        },
        {
          name: "Profession Master",
          path: "/profession",
          parentName: "Masters",
        },
        {
          name: "Payment Channels",
          path: "/payment-channels",
          parentName: "Masters",
        },
        {
          name: "Payment Providers",
          path: "/payment-providers",
          parentName: "Masters",
        },
        {
          name: "Payout Channels",
          path: "/payout-channels",
          parentName: "Masters",
        },
        {
          name: "Payout Providers",
          path: "/payout-providers",
          parentName: "Masters",
        },
      ],
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
      localStorage.setItem("link1", "");
      navigate(window.location.pathname);
    } else {
      setActive(payload);
      localStorage.setItem("link1", payload);
      navigate(window.location.pathname);
    }
  };
  const navigateTo = (e, payload) => {
    if (payload?.miniLinks?.length) {
      updateActiveDropDown(e, payload.name);
    } else {
      if (payload.parentName != active) {
        setActive("");
      }
      navigate(payload.init || payload.path);
    }
  };

  const updateActiveDropDown2 = (e, payload) => {
    e.stopPropagation();
    if (payload === active2) {
      setActive2("");
      localStorage.setItem("link2", "");
      navigate(window.location.pathname);
    } else {
      setActive2(payload);
      localStorage.setItem("link2", payload);
      navigate(window.location.pathname);
    }
  };
  const navigateTo2 = (e, payload) => {
    if (payload?.miniLinks?.length) {
      updateActiveDropDown2(e, payload.name);
    } else {
      if (payload.parentName != active2) {
        setActive2("");
      }
      navigate(payload.init || payload.path);
    }
  };

  useEffect(() => {
    setActive(localStorage.getItem("link1"));
    setActive2(localStorage.getItem("link2"));
    console.log(active, active2);
    //eslint-disable-next-line
  }, [active, active2, window.location.pathname]);

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
                $active={item?.path}
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
                  {/*  <item.icon
                    color={item?.path === location.pathname ? "#fff" : "#464F60"}
                    style={{
                      marginRight: "10px",
                    }}
                  /> */}
                  <span
                    style={{
                      color:
                        item?.path === location.pathname ? "#fff" : "#464F60",
                      fontSize: "14px",
                    }}
                  >
                    {item?.name}
                  </span>
                </div>
                {item?.miniLinks && (
                  <DropDown
                    color={
                      item?.path === location.pathname ? "#fff" : "#464F60"
                    }
                  />
                )}
              </NavTab>
              {
                <div
                  style={{
                    borderLeft: "1px solid gray",
                    marginLeft: "20px",
                    height: active === item?.name && "auto",
                    maxHeight: active !== item?.name ? 0 : "1000px",
                    overflow: active === item?.name ? "auto" : "hidden",
                    transition: "all 0.4s",
                    marginBottom: active === item?.name && "14px",
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
                                fontSize: "14px",
                              }}
                            >
                              {link.name}
                            </span>
                          </div>
                          {link?.miniLinks && (
                            <DropDown
                              color={
                                item?.path === location.pathname
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

      <NavLink
        onClick={() => {
          localStorage.clear();
          window.location = "/";
        }}
      >
        <svg
          width="26"
          height="27"
          viewBox="0 0 26 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13 0.287598C5.82969 0.287598 0 6.11729 0 13.2876C0 20.4579 5.82969 26.2876 13 26.2876C20.1703 26.2876 26 20.4579 26 13.2876C26 6.11729 20.1703 0.287598 13 0.287598Z"
            fill="#F34235"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.5859 14.2271C18.5859 17.3095 16.0773 19.813 13 19.813C9.91758 19.813 7.41406 17.3044 7.41406 14.2271C7.41406 12.3278 8.36367 10.5759 9.9582 9.54502C10.334 9.30127 10.8367 9.40791 11.0805 9.78369C11.3242 10.1595 11.2176 10.6622 10.8418 10.906C9.70938 11.6372 9.03906 12.8813 9.03906 14.2271C9.03906 16.4106 10.8164 18.188 13 18.188C15.1836 18.188 16.9609 16.4106 16.9609 14.2271C16.9609 12.8813 16.2855 11.6372 15.1582 10.906C14.7824 10.6622 14.6758 10.1595 14.9195 9.78369C15.1633 9.40791 15.666 9.30127 16.0418 9.54502C17.6363 10.5759 18.5859 12.3278 18.5859 14.2271ZM12.1875 11.3274V7.57471C12.1875 7.12783 12.5531 6.76221 13 6.76221C13.4469 6.76221 13.8125 7.12783 13.8125 7.57471V11.3274C13.8125 11.7743 13.4469 12.1399 13 12.1399C12.5531 12.1399 12.1875 11.7743 12.1875 11.3274Z"
            fill="white"
          />
        </svg>

        <p>Logout</p>
      </NavLink>
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
const NavLink = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  margin-top: 60px;
  border-radius: 10px;
  cursor: pointer;

  p {
    font-size: 16px;
    margin-left: 10px;
    color: #000000;
  }
`;
