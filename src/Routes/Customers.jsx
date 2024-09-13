import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
//import SearchInput from "../reuseables/SearchInput";
import CustomersTable from "./CustomersTable";
import AppButton from "../reuseables/AppButton";
import { useEffect, useState } from "react";
import AppInput from "../reuseables/AppInput";
import AppSelect from "../reuseables/AppSelect";
import AppTextarea from "../reuseables/AppTextarea";
import AppModal from "../COMPONENTS/AppModal";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "../services/Dashboard";
import toast from "react-hot-toast";
import AppInput22 from "../reuseables/AppInput22";

function Customers() {
  const [Countries, setCountries] = useState([]);
  const [professions, setProffession] = useState([]);
  const [employmentList, setEmployment] = useState([]);

  const [City, setCity] = useState([]);

  const [type, setType] = useState({});
  const [employmentStatus, setEmploymentStatus] = useState({});
  const [profession, setProfession] = useState({});
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [modal, setModal] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    surName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    postcode: "",
    countryId: "",
    country: "",
    cityId: "",
    city: "",
    employmentStatusId: "",
    accountType: "",
    dob: "",
    profession: "",
    companyName: "",
    onboardingSource: "Web",
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data?.message);
        setModal(false);
        window.location.reload();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  console.log(user, "userrr");
  useEffect(() => {
    // Fetch states whenever the country ID changes
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://apidoc.transferrocket.co.uk/getemploymentstatus`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(
          "🚀 ~ file: Register.jsx:156 ~ useEffect ~ response:",
          data
        );
        setEmployment(
          data.data?.map((item) => {
            return {
              label: item?.name,
              value: item?.name,
              id: item?.id,
            };
          })
        );
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    // Fetch states whenever the country ID changes
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://apidoc.transferrocket.co.uk/getprofession`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(
          "🚀 ~ file: Register.jsx:156 ~ useEffect ~ response:",
          data
        );
        setProffession(
          data.data?.map((item) => {
            return {
              label: item?.name,
              value: item?.name,
              id: item?.id,
            };
          })
        );
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    // Fetch states whenever the country ID changes
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://apidoc.transferrocket.co.uk/getcountries`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(
          "🚀 ~ file: Register.jsx:157 ~ useEffect ~ response:",
          data
        );
        setCountries(
          data.data?.map((item) => {
            return {
              label: item?.name,
              value: item?.name,
              id: item?.id,
            };
          })
        );
      })
      .catch((error) => console.log("error", error));
  }, [modal]);

  useEffect(() => {
    // Fetch states whenever the country ID changes
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://apidoc.transferrocket.co.uk/getcities?countryId=${country?.id}&citiId=0`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(
          "🚀 ~ file: Register.jsx:156 ~ useEffect ~ response:",
          data
        );
        setCity(
          data?.data?.map((item) => {
            return {
              label: item?.name,
              value: item?.name,
              id: item?.id,
            };
          })
        );
      })
      .catch((error) => console.log("error", error));
  }, [country?.id]);

  return (
    <>
      <BodyLayout>
        {modal && (
          <AppModal
            closeModal={() => {
              setModal(false);
              setUser({
                firstName: "",
                surName: "",
                email: "",
                phone: "",
                dob: "",
                accountType: "",
                address: "",
              });
            }}
            heading="Add User"
            maxWidth={600}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "14px",
                paddingBottom: "40px",
              }}
            >
              <AppInput
                placeholder=" Last Name"
                width="90%"
                label=" Last Name"
                value={user.surName}
                onChange={(e) => {
                  setUser({
                    ...user,
                    surName: e.target.value,
                  });
                }}
              />
              <AppInput
                placeholder=" First Name"
                width="90%"
                value={user.firstName}
                label=" First Name"
                onChange={(e) => {
                  setUser({
                    ...user,
                    firstName: e.target.value,
                  });
                }}
              />
              <AppInput
                placeholder=" Email"
                width=" 90%"
                value={user.email}
                label=" Email"
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value,
                  });
                }}
              />
              <AppInput22
                placeholder="Password"
                width=" 90%"
                value={user.password}
                label="Password"
                type="password"
                onChange={(e) => {
                  setUser({
                    ...user,
                    password: e.target.value,
                  });
                }}
              />
              <AppInput
                placeholder="Company name"
                width=" 90%"
                value={user.companyName}
                label="Company name"
                onChange={(e) => {
                  setUser({
                    ...user,
                    companyName: e.target.value,
                  });
                }}
              />
              <AppInput
                placeholder="Phone"
                width=" 90%"
                value={user.phone}
                label=" Phone"
                type={"number"}
                onChange={(e) => {
                  setUser({
                    ...user,
                    phone: e.target.value,
                  });
                }}
              />
              <AppSelect
                label="Country"
                styles={{
                  padding: "0px !important",
                  // You can add custom styles here if needed
                }}
                options={Countries}
                // value={use} // Pass the selected option to the value prop
                onChange={(e) => {
                  console.log(e, "ddddsdsf");
                  setCountry(e);
                  setUser({
                    ...user,
                    country: {
                      id: e.id,
                    },
                  });
                }}
                value={country} // Handle option selection
                showSearch
              />
              <AppSelect
                label="City"
                styles={{
                  padding: "0px !important",
                  // You can add custom styles here if needed
                }}
                options={City}
                // value={use} // Pass the selected option to the value prop
                onChange={(e) => {
                  console.log(e, "ddddsdsf");
                  setState(e);
                  setUser({
                    ...user,
                    city: {
                      id: e.id,
                    },
                  });
                }}
                value={state} // Handle option selection
                showSearch
              />
              <AppTextarea
                placeholder="Address"
                width="90%"
                label="Address"
                value={user.address}
                onChange={(e) => {
                  setUser({
                    ...user,
                    address: e.target.value,
                  });
                }}
              />
              <AppInput
                placeholder="Postcode"
                width=" 90%"
                value={user.postcode}
                label=" Postcode"
                type={"number"}
                onChange={(e) => {
                  setUser({
                    ...user,
                    postcode: e.target.value,
                  });
                }}
              />
              <AppInput
                placeholder=" DOB"
                width=" 90%"
                type="date"
                label=" DOB"
                value={user.dob}
                onChange={(e) => {
                  setUser({
                    ...user,
                    dob: e.target.value,
                  });
                }}
              />
              <AppSelect
                label=" Account Type"
                styles={{
                  padding: "0px !important",
                  // You can add custom styles here if needed
                }}
                options={[
                  { label: "individual", value: 1 },
                  { label: "Business", value: 2 },
                ]}
                // value={use} // Pass the selected option to the value prop
                onChange={(e) => {
                  console.log(e, "ddddsdsf");
                  setType(e);
                  setUser({
                    ...user,
                    accountType: e.value,
                  });
                }}
                value={type} // Handle option selection
                placeholder="Please select a account type"
                showSearch
                isClearable={true} // Allow clearing the selected option
              />
              <AppSelect
                label="Profession"
                styles={{
                  padding: "0px !important",
                  // You can add custom styles here if needed
                }}
                options={professions}
                // value={use} // Pass the selected option to the value prop
                onChange={(e) => {
                  console.log(e, "ddddsdsf");
                  setProfession(e);
                  setUser({
                    ...user,
                    profession: {
                      id: e?.id,
                      name: e.value,
                    },
                  });
                }}
                value={profession} // Handle option selection
                placeholder="Please select a account type"
                showSearch
                isClearable={true} // Allow clearing the selected option
              />
              <AppSelect
                label="Employment Status"
                styles={{
                  padding: "0px !important",
                  // You can add custom styles here if needed
                }}
                options={employmentList}
                // value={use} // Pass the selected option to the value prop
                onChange={(e) => {
                  console.log(e, "ddddsdsf");
                  setEmploymentStatus(e);
                  setUser({
                    ...user,
                    employmentStatusId: e.value,
                  });
                }}
                value={employmentStatus} // Handle option selection
                placeholder="Please select a account type"
                showSearch
                isClearable={true} // Allow clearing the selected option
              />
            </div>
            <div>
              <AppButton
                disabled={isLoading}
                placeholder={isLoading ? "creating user..." : "Create User"}
                margin="0"
                onClick={() => {
                  if (
                    user?.firstName &&
                    user?.surName &&
                    user?.email &&
                    user?.password &&
                    user?.phone &&
                    user?.address &&
                    user?.postcode &&
                    user?.employmentStatusId &&
                    user?.accountType &&
                    user?.profession?.id &&
                    user?.country &&
                    user?.dob &&
                    user?.city
                  ) {
                    mutate({
                      firstName: user?.firstName,
                      surName: user?.surName,
                      email: user?.email,
                      password: user?.password,
                      phone: user?.phone,
                      address: user?.address,
                      postcode: user?.postcode,
                      employmentStatusId: employmentStatus?.id,
                      accountType: user?.accountType,
                      dob: user?.dob,
                      profession: {
                        id: profession?.id,
                        name: profession?.value,
                      },
                      companyName: user?.companyName,
                      onboardingSource: "backOffice",
                      agentId: 0,
                      country: {
                        id: user?.country?.id,
                      },
                      city: {
                        id: user?.city?.id,
                      },
                    });
                  } else {
                    toast.error("All Fields Required");
                  }
                }}
              />
            </div>
          </AppModal>
        )}
        <Content>
          <div className="header">
            <div className="top">
              <p>Customers</p>
              <span>This page allows you to manage customers</span>
            </div>
            <div className="btn">
              <button
                style={{
                  backgroundColor: "#00A85A",
                  color: "white",
                }}
                onClick={() => {
                  setModal(true);
                }}
              >
                {/* <AiOutlinePlus size={18} style={{ color: "white" }} /> */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.99999 2C8.4142 2 8.74999 2.33579 8.74999 2.75V7.25H13.25C13.6642 7.25 14 7.58579 14 8C14 8.41422 13.6642 8.75 13.25 8.75H8.74999V13.25C8.74999 13.6642 8.4142 14 7.99999 14C7.58578 14 7.24999 13.6642 7.24999 13.25V8.75H2.75C2.33579 8.75 2 8.41422 2 8C2 7.58579 2.33579 7.25 2.75 7.25H7.24999V2.75C7.24999 2.33579 7.58578 2 7.99999 2Z"
                    fill="white"
                  />
                </svg>
                Add Customer
              </button>
            </div>
          </div>

          <div className="main">
            <div className="tablecontent">
              <CustomersTable />
            </div>
          </div>
        </Content>
      </BodyLayout>
    </>
  );
}

export default Customers;
const Content = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .top p {
    font-size: 32px;
    font-weight: 500;
  }
  .top span {
    font-size: 15px;
    color: #848d87;
    font-weight: 400;
  }
  .btn {
    display: flex;
    gap: 10px;
  }
  .btn button {
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 12px 13px 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  }
  .head {
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }
  .head button {
    background-color: transparent;
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
  }
  .main {
    background-color: white;
    width: 100%;
    margin-top: 30px;
    border-radius: 10px;
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100%;
  }

  .table th {
    font-weight: 500;
    text-align: left;
    font-size: 13px;
    padding: 18px;
    color: #687182;
    background-color: #f9fafb;
  }

  .table td {
    padding: 22px;
    font-weight: 500;
    font-size: 14px;
    border-top: 1px solid gainsboro;
  }
  .table span {
    font-size: 14px;
    font-weight: 400;
    color: #667085;
  }

  .row {
    display: flex;
    justify-content: space-between;
    padding: 25px;
  }

  .row span {
    font-size: 15px;
    color: #687182;
  }
  .arrow {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .tabledata {
    td {
      font-size: small;
      font-weight: 400;
    }
  }
  .arrow button {
    width: 28.8px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    border-radius: 3px;
  }
  .pagins {
    display: flex;
    gap: 7px;
    align-items: center;
  }

  .pagins p {
    font-size: 14px;
    color: #687182;
  }

  .pagins select {
    width: 48px;
    height: 24px;
    background-color: transparent;
    border: 1px solid gainsboro;
    padding: 2px;
    border-radius: 3px;
  }
`;
