/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Input, Link, Space } from "@arco-design/web-react";
import Logo from "../images/logo.svg";
import Left from "../images/left.svg";
import { InputStyle } from "../styles/Input";
import { CenterElement } from "../styles/CenterEle";
import { Checkbox } from "@arco-design/web-react";
import Btn from "../reuseables/Btn";
import { Switch, Timeline, Typography } from "@arco-design/web-react";
import { DatePicker } from "@arco-design/web-react";
import { Select } from "@arco-design/web-react";
import { userLogin, checkEmail } from "../services/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { useNavigate } from "react-router-dom";
import { Spin, Modal } from "@arco-design/web-react";
import axios from "axios";
import { UserTestData } from "../../config/Test";
import { Axios } from "../utils/Axios";
import ReusableModal from "../reuseables/ReusableModal";
import Msg from "../reuseables/Msg";
import { BASE_URL } from "../../config/config";
import AppInput from "../reuseables/AppInput";
import lock from "../assets/images/padlock.jpeg";

// Inside your component

const baseurl = BASE_URL;

const Option = Select.Option;
const TextArea = Input.TextArea;

const TimelineItem = Timeline.Item;

function Login() {
  const navigate = useNavigate();
  const [err, seterr] = useState(null);
  const [modal, setModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isKyc, setIsKyc] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginDetails, setloginDetails] = useState({
    username: "",
    password: "",
    deviceId: "Tets",
    source: "Web",
  });

  const handleLogin = async () => {
    mutate({
      username: username,
      password: password,
      deviceId: "Tets",
      source: "Web",
    });
  };

  const handleChange = (value, i) => {
    const { name } = i.target;

    if (name === "password" && loginDetails.password.length) {
      const requestData = {
        username: loginDetails.username,
      };

      axios
        .get(`${baseurl}/checkUserExistByEmail`, requestData)
        .then((response) => {
          console.log(response.data);

          setloginDetails((prev) => {
            return { ...prev, [name]: value };
          });
        })
        .catch((error) => {
          seterr(error?.message);
          setModal(true);
          console.error(error);
        });
    }

    setloginDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      if (!data.status) {
        switch (data?.data) {
          case "1":
            seterr(data?.message);
            toast.error(data?.message);
            setModal(true);

            break;
          case "2":
            seterr(data?.message);
            toast.error(data?.message);
            setModal(true);
            break;
          case "3":
            setRedirect(true);
            seterr(data?.message);
            setModal(true);
            break;
          case "4":
            setRedirect(true);
            seterr(data?.message);
            setModal(true);
            break;
          case "5":
            // setRedirect(true)
            setIsKyc(true);
            seterr(data?.message);
            setModal(true);
            break;

          default:
            seterr(data?.message);
            toast.error(data?.message);
            setModal(true);
            break;
        }

        return;
      }
      localStorage.setItem("userDetails", JSON.stringify(data?.data));
      navigate("/dashboard");
    },
    onError: (data) => {
      setModal(true);
      // localStorage.setItem("userDetails",JSON.stringify(UserTestData))
      // console.log(data.response.data.message)
      setTimeout(() => {
        //  seterr("")
      }, 2000);
      return;
    },
  });

  return (
    <LoginCotainer>
      <div className="flex">
        <div className="side1">
          <img
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "10000px",
            }}
            src={lock}
          />
        </div>
        <div className="side2">
          <Center>
            <img src={Logo} />
            <div className="logintext">
              <h1>Log in to your account</h1>
              <p>Welcome back! Please enter your details.</p>
            </div>
            <div className="inputform">
              {modal && (
                <ReusableModal isOpen={modal} onClose={() => setModal(false)}>
                  <Msg>
                    {/* {err} */}
                    <p>{err}</p>
                    <br />
                    {isKyc && (
                      <Btn clicking={() => navigate("/kyc")} size={30}>
                        Continue with Kyc{" "}
                      </Btn>
                    )}
                  </Msg>
                </ReusableModal>
              )}
              <div className="name">
                <label>Email</label>
                <AppInput
                  placeholder="Enter your email"
                  type="email"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  width="96%"
                  name="username"
                  padding="12px"
                />
              </div>
              {/*  <div>
                <span>Password</span>
                <InputStyle>
                  <Input.Password
                    style={{ width: "100%", outline: "none" }}
                    className="input"
                    defaultValue=""
                    onChange={handleChange}
                    name="password"
                    placeholder="Enter your password"
                  />
                </InputStyle>

              </div> */}
              <div className="name">
                <label>Password</label>
                <AppInput
                  placeholder="Enter your password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  width="96%"
                  name="password"
                  padding="12px"
                />
              </div>
              <div className="flexjustify">
                <Checkbox>Remember me</Checkbox>
                <Link style={{ color: "var(--primary-color)" }}>
                  Forgot password
                </Link>
              </div>
              <div>
                <Btn
                  disabled={username === "" && password === "" ? true : false}
                  clicking={handleLogin}
                  styles={{
                    width: "100%",
                    background: "green",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "0.8em",
                  }}
                >
                  {isLoading ? (
                    <Spin dot />
                  ) : (
                    <span style={{ color: "#fff" }}>Sign In</span>
                  )}
                </Btn>
              </div>
              <CenterElement>
                <span>Don’t have an account?</span>
                <Link
                  onClick={() => navigate("/signup")}
                  style={{ color: "var(--primary-color)" }}
                >
                  Sign up
                </Link>
              </CenterElement>
            </div>
          </Center>
        </div>
      </div>
    </LoginCotainer>
  );
}

const LoginCotainer = styled.div`
  height: 100vh;
  overflow: hidden;

  .arco-spin-dot-list > div {
    background-color: #ffffff !important;
  }

  .input {
    padding: 0.7em;
    border-radius: 8px;
    outline: none;
    border: 0.1px solid var(--gray-300, #d0d5dd);
    background: #ffffff;
  }
  .inputdate {
    padding: 1.3rem;
    border-radius: 8px;
    outline: none;
    border: 1px solid var(--gray-300, #d0d5dd);
    background: #ffffff;
  }

  .flexjustify {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .flex {
    display: flex;
    overflow: hidden;
    height: 100%;

    @media screen and (max-width: 40em) {
      .side1 {
        display: none;
      }
      .side2 {
        background: #fcfcfc;
        width: 100%;
        flex: 1;
      }
    }

    .side1 {
      width: 50%;
      height: 100%;
      background: var(--Primary-Colour, #00a85a);
      display: grid;
      place-items: center;
    }
    .side2 {
      background: #fcfcfc;
      width: 50%;
      overflow-y: scroll;
    }
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 10px;
  overflow-x: hidden;
  overflow-y: hidden;

  > input {
    font-size: 16px;
  }

  .logintext {
    display: flex;

    flex-direction: column;
    h1 {
      margin-block: 0;
    }
    p {
      color: var(--small-color-font);
    }
  }

  .inputform {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 60%;

    color: #000;

    .arco-select-view {
      background: transparent;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid var(--gray-300, #d0d5dd);
    }
  }

  input[type="password"] {
    padding: 0;
    background-color: #ffffff;
  }
  .arco-input-password {
    width: 95%;
  }
  .arco-input-group {
    background-color: #ffffff;
    z-index: 1;
  }

  .signupheadtext {
    width: 60%;

    p {
      margin: 0 0;
    }
  }
  .signup {
    width: 60%;

    .signupcontent {
      display: flex;
      justify-content: space-between;

      width: 100%;

      .navigation {
        flex: 1;
      }
    }

    .signuptext {
      width: 100%;
      display: inline-flex;
      justify-content: flex-end;
      flex: 1;
      font-size: 12px;
      align-items: center;
    }

    .timeline {
      /* border: 1px solid red; */

      width: 147%;
      .arco-timeline .arco-timeline-left {
        width: 100%;
      }
      .lines {
        width: 100%;
        /* width: 500px; */
      }
    }
  }
`;

export default Login;
