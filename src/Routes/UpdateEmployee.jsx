import React, { useState, useEffect } from "react";
import BodyLayout from "../reuseables/BodyLayout";
import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import SearchInput from "../reuseables/SearchInput";
import BeneficiaryComponent from "../COMPONENTS/BeneficiaryComponent";
import SendMoneyCustomersTableList from "./SendMoney/SendMoneyCustomersTableList";
import CountryDropdown2 from "../reuseables/CountryDropdown2";
import {
  addNewDocument,
  addemployee,
  getIdTypes,
  getRoleMenu,
  getRoleMeta,
  updateEmployee,
} from "../services/Dashboard";
import { getCurrencies } from "../services/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Select from "react-select";
import SectionHeader from "../reuseables/SectionHeader";
import AppSelect from "../reuseables/AppSelect";
import AppInput from "../reuseables/AppInput";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input, Switch } from "@arco-design/web-react";
import AppSelect2 from "../reuseables/AppSelect2";
import FileUpload from "../services/FileUpload";
import FileUpload2 from "../services/FileUpload2";
import AppInput2 from "../reuseables/AppInput2";
function UpdateEmployee({}) {
  const [params] = useSearchParams();
  const userDetails = JSON.parse(localStorage.getItem("employeeSelected"));

  //   Component useState
  const [beneficiaryComponent, setBeneficiaryComponent] = useState(false);

  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState();

  const {
    data: userMenu,
    isLoading: menuLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["getRolweMenu"],
    queryFn: () => getRoleMenu(),
  });

  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: (data) => {
      console.log(data);
      if (data?.status) {
        toast.success(data?.transactionRef);
        navigate(`/employee-master`);
        //refetch();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (data) => {
      //setModal(true);
      //toast.error("Rate Request wasn't created");

      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  const [countries, setCountries] = useState();
  const [selectedCountry, setselectedCountry] = useState("");

  const [cities, setCities] = useState();
  const [selectedCity, setselectedCity] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

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
        setCountries(data.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    // Fetch states whenever the country ID changes
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://apidoc.transferrocket.co.uk/getcities?countryId=${selectedCountry?.id}&citiId=0`,
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
        setCities(data?.data);
      })
      .catch((error) => console.log("error", error));
  }, [selectedCountry]);

  const [details, setDetails] = useState({
    firstName: userDetails?.firstName,
    surName: userDetails?.surName,
    email: userDetails?.email,
    password: "",
    userId: userDetails?.userId,
    dob: "",
    gender: userDetails?.gender,
    phone: userDetails?.phone,
    address: userDetails?.address,
    postcode: userDetails?.postcode,
    country: {
      id: userDetails?.country?.id,
    },
    city: {
      id: userDetails?.city?.id,
    },
    role: {
      id: userDetails?.role?.id,
    },
    employmentStatusId: 0,
    profession: {
      id: 0,
    },
    companyName: "",
    onboardingSource: "Web",
    agentId: 0,
  });

  console.log(details, userDetails, "jjkd");

  return (
    <BodyLayout>
      {beneficiaryComponent && (
        <BeneficiaryComponent
          closeBeneficiaryComponent={setBeneficiaryComponent}
        />
      )}
      {beneficiaryComponent ? (
        ""
      ) : (
        <Content>
          <div className="top">
            <p>Update Employee {userDetails?.firstName}</p>
          </div>

          <div className="main">
            <div
              style={{
                padding: "20px",
              }}
            >
              <SectionHeader
                title="Employee Details"
                desc="fill in all fields"
              />{" "}
              <hr
                style={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  opacity: "0.4",
                }}
              ></hr>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "40px",
                }}
              >
                <div className="name" style={{}}>
                  <label>First Name</label>
                  <AppInput
                    placeholder=""
                    type="text"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        firstName: e.target.value,
                      });
                    }}
                    width="95%"
                    name="username"
                    defaultValue={userDetails?.firstName}
                  />
                </div>
                <div className="name" style={{}}>
                  <label>Last Name</label>
                  <AppInput
                    placeholder=""
                    type="text"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        surName: e.target.value,
                      });
                    }}
                    width="95%"
                    name="username"
                    defaultValue={userDetails?.surName}
                  />
                </div>
                <div className="name" style={{}}>
                  <label>Email</label>
                  <AppInput
                    placeholder=""
                    type="text"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        email: e.target.value,
                      });
                    }}
                    width="95%"
                    name="username"
                    defaultValue={userDetails?.email}
                  />
                </div>
                <div className="name" style={{}}>
                  <label>Mobile Number</label>
                  <AppInput
                    placeholder=""
                    type="number"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        phone: e.target.value,
                      });
                    }}
                    width="95%"
                    name="username"
                    defaultValue={userDetails?.phone}
                  />
                </div>
              </div>
              <hr
                style={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  opacity: "0.4",
                }}
              ></hr>{" "}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "40px",
                }}
              >
                <div className="name" style={{}}>
                  <label>Address</label>
                  <Input.TextArea
                    name="address"
                    className="textarea"
                    placeholder="Enter comments ..."
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        address: e,
                      });
                    }}
                    defaultValue={userDetails?.address}
                    style={{
                      minHeight: 104,
                      background: "transparent",
                      border: "1px solid #d8d8d8",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
              <hr
                style={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  opacity: "0.4",
                }}
              ></hr>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "40px",
                }}
              >
                <div className="name" style={{}}>
                  <label>Country</label>
                  <Select
                    options={countries?.map((d) => {
                      return {
                        ...d,
                        label: d?.name,
                        value: d?.name,
                      };
                    })}
                    value={
                      selectedCountry || {
                        ...userDetails?.country,
                        label: userDetails?.country?.name,
                        value: userDetails?.country?.name,
                      }
                    } // Pass the selected option to the value prop
                    onChange={(e) => {
                      setselectedCountry(e);
                      console.log(e);
                      setDetails({
                        ...details,
                        country: {
                          id: e?.id,
                        },
                      });
                    }} // Handle option selection
                    placeholder="Please select a Country"
                  />
                </div>
                <div className="name" style={{}}>
                  <label>City</label>
                  <Select
                    options={cities?.map((d) => {
                      return {
                        ...d,
                        label: d?.name,
                        value: d?.name,
                      };
                    })}
                    value={
                      selectedCity || {
                        ...userDetails?.city,
                        label: userDetails?.city?.name,
                        value: userDetails?.city?.name,
                      }
                    } // Pass the selected option to the value prop
                    onChange={(e) => {
                      setselectedCity(e);
                      console.log(e);

                      setDetails({
                        ...details,
                        city: {
                          id: e?.id,
                        },
                      });
                    }} // Handle option selection
                    placeholder="Please select a Country"
                  />
                </div>
                <div className="name" style={{}}>
                  <label>Post Code</label>
                  <AppInput
                    placeholder=""
                    type="number"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        postcode: e.target.value,
                      });
                    }}
                    width="95%"
                    name="username"
                    defaultValue={userDetails?.postcode}
                  />
                </div>
              </div>
              <hr
                style={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  opacity: "0.4",
                }}
              ></hr>
              <SectionHeader title="Account details" />{" "}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "20px",
                }}
              >
                <div>
                  <AppSelect
                    label={"Select Role"}
                    value={
                      selectedRole || {
                        ...userDetails?.role,
                        label: userDetails?.role?.name,
                        value: userDetails?.role?.name,
                      }
                    }
                    options={userMenu?.data?.map((item) => {
                      return {
                        label: item?.name,
                        value: item?.name,
                        ...item,
                      };
                    })}
                    onChange={(e) => {
                      setSelectedRole(e);
                      setDetails({
                        ...details,
                        role: {
                          id: e?.id,
                        },
                      });
                    }}
                  />
                </div>
                <div>
                  <AppSelect
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                    ]}
                    value={
                      selectedGender || {
                        label: userDetails?.gender,
                        value: userDetails?.gender,
                      }
                    }
                    label={"Gender"}
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        gender: e?.label,
                      });
                    }}
                  />
                </div>
                <div className="name" style={{}}>
                  <label>Password</label>
                  <AppInput2
                    placeholder="Enter your password"
                    type="password"
                    width="96%"
                    name="password"
                    padding="12px"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="name" style={{}}>
                  <label>Confirm Password</label>
                  <AppInput2
                    placeholder="Enter your password"
                    type="password"
                    width="96%"
                    name="password"
                    padding="12px"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                width: "38%",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "10px",
                marginTop: "30px",
                marginLeft: "auto",
                paddingBottom: "20px",
                paddingRight: "20px",
              }}
            >
              <button
                className="cancel"
                onClick={() => {
                  navigate(`/employee-master`);
                }}
              >
                {" "}
                <span>Go Back</span>
              </button>

              <button
                onClick={() => {
                  mutate({
                    ...details,
                  });
                }}
                className="confirm"
                disabled={mutateLoading}
              >
                {" "}
                <span>{mutateLoading ? "updating..." : "Update Employee"}</span>
              </button>
            </div>
          </div>
        </Content>
      )}
    </BodyLayout>
  );
}

export default UpdateEmployee;
const Content = styled.div`
  .css-13cymwt-control {
    border-radius: 8px;
    padding: 3px;
  }

  .top p {
    font-size: 32px;
    font-weight: 500;
  }
  .top {
    padding-bottom: 20px;
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
  .info {
    background-color: #e1ebf9;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid #bfd5f5;
  }
  .selection {
    padding: 40px 40px 0px 30px;
    display: flex;
    gap: 50px;
    cursor: pointer;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 20px;
  }
  .sender {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sender p {
    font-size: 17px;
    font-weight: 500;
    color: #a1a9b8;
    line-height: 48px;
  }
  .sender span {
    /* border: 8px solid #00a85a24; */
    border: 1px solid gainsboro;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    color: #a1a9b8;
    font-size: 17px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .note {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .note p {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: #464f60;
  }
  .main {
    background-color: white;
    width: 100%;
    margin-top: 30px;
    border-radius: 10px;
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
    cursor: pointer;
  }
  .TableGrid {
    overflow: hidden;
    overflow: scroll;
  }
  .table {
    border-collapse: collapse;
    font-size: 11.5px;
    width: 100vw;
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
    color: #5a6376;
    cursor: pointer;
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
