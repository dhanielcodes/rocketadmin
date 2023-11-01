import { createContext, useState } from "react";

const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
  const [active, setActive] = useState();
  const [active2, setActive2] = useState();

  return (
    <DashboardContext.Provider
      value={{
        active: active,
        setActive: setActive,
        active2: active2,
        setActive2: setActive2,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
