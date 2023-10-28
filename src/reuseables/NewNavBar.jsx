import { Dropdown } from "@arco-design/web-react";
import React, { useState } from "react";
import styled from "styled-components";

// Import your React components or icons here

const Nav = styled.div`
  background-color: #007bff; // Use your primary color
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
`;

const NavContent = styled.div`
  width: 100%;
  padding: 14%;
`;

const LogoIcon = styled.div`
  text-align: center;
  margin: auto;
`;

const NavItem = styled.div`
  border-top: 1px solid #5a6376;
  border-bottom: 1px solid #5a6376;
  color: #007bff; // Use your primary color
  padding: 14%;

  &:hover {
    background-color: #fff;
    border-color: #007bff; // Use your primary color
  }
`;

const NavItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8% 0 0;
  cursor: pointer;
`;

const MiniNav = styled.div`
  transition: all 0.3s;
  transform: ${({ active }) => (active ? "rotate(90deg)" : "none")};
`;

const SubNavItem = styled.div`
  border-left: 5px solid #34495c;
  transition: all 100000s; // Not sure about the duration
  padding-left: 10%;

  max-height: ${({ active }) => (active ? "1000px" : "0")};
  overflow: auto;
`;

const SubNavItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 3% 0;
`;

const NewNavBar = () => {
  const [active, setActive] = useState("");
  const [links, setLinks] = useState([
    {
      name: "Overview",
      path: "/dashboard",
    },
    {
      name: "User Management",
      path: "/user-management",
    },
    {
      name: "Administration",
      path: "/admin",
      miniLinks: [
        {
          name: "System Monitor",
          path: "/administration/system-monitor",
          parentName: "Administration",
        },
        {
          name: "Manage Route",
          path: "/administration/manage-route",
          parentName: "Administration",
        },
        {
          name: "SIP Accounts",
          path: "/administration/sip-accounts",
          parentName: "Administration",
        },
        {
          name: "Approve Caller ID",
          path: "/administration/approve-caller",
          parentName: "Administration",
        },
        {
          name: "Blacklist Mgmt",
          path: "/administration/blacklist-management",
          parentName: "Administration",
        },
      ],
    },
    {
      name: "IVR Campaign",
      path: "/ivr-campaign",
      miniLinks: [
        {
          name: "Campaign",
          path: "/ivr-campaign/campaign",
          parentName: "IVR Campaign",
        },
        {
          name: "Media Mgmt",
          path: "/ivr-campaign/media-mgmt",
          parentName: "IVR Campaign",
        },
      ],
    },
    {
      name: "Support Center",
      path: "/support-center",
    },
    {
      name: "Report & Analytics",
      path: "/reports-and-analytics",
    },
  ]);

  const updateActiveDropDown = (payload) => {
    if (payload === active) {
      setActive("");
    } else {
      setActive(payload);
    }
  };

  const navigateTo = (payload) => {
    if (payload?.miniLinks?.length) {
      updateActiveDropDown(payload.name);
    } else {
      if (payload.parentName !== active) {
        setActive("");
      }
      // Implement your routing logic here
    }
  };

  return (
    <Nav>
      <NavContent>
        <LogoIcon> {/* Replace this with your logo component */}</LogoIcon>
        {links.map((item) => (
          <NavItem key={item.name}>
            <NavItemContent onClick={() => navigateTo(item)}>
              <div>
                {/*  */}
                <div
                  className={`text-${
                    active === item.path ? "primary200" : "primary100"
                  } ml-4`}
                >
                  {item.name}
                </div>
              </div>
              {item.miniLinks && (
                <MiniNav active={active === item.name}>
                  <Dropdown size="100%" />{" "}
                  {/* Replace DropdownIcon with your dropdown icon component */}
                </MiniNav>
              )}
            </NavItemContent>
            {item.miniLinks && (
              <SubNavItem active={active === item.name}>
                {item.miniLinks.map((link) => (
                  <SubNavItemContent
                    onClick={() => navigateTo(link)}
                    key={link.name}
                  >
                    <div
                      className={`text-${
                        active === link.path ? "primary200" : "primary100"
                      } ml-4`}
                    >
                      {link.name}
                    </div>
                  </SubNavItemContent>
                ))}
              </SubNavItem>
            )}
          </NavItem>
        ))}
      </NavContent>
    </Nav>
  );
};

export default NewNavBar;
