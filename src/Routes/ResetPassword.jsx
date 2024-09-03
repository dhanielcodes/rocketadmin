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
import { userLogin, checkEmail, forgotPassword } from "../services/Auth";
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
import toast from "react-hot-toast";

function ResetPassword() {
  const navigate = useNavigate();
  const [err, seterr] = useState(null);
  const [modal, setModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isKyc, setIsKyc] = useState(false);
  const [type, setType] = useState(false);
  const [vis, setVis] = useState(false);

  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    mutate({ email: email });
  };

  const { mutate, isLoading, isError, data } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      setModal(true);
      console.log(data);
      if (data.status) {
        toast.success(data?.message);
      } else {
        return;
      }
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
              <h1>Reset Password</h1>
            </div>
            <div className="inputform">
              {modal && (
                <ReusableModal
                  width="400px"
                  isOpen={modal}
                  onClose={() => setModal(false)}
                >
                  <Msg type={data?.transactionRef === "SUCCESS"}>
                    {/* {err} */}
                    <p
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      {data?.message}
                    </p>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Btn
                        styles={{
                          width: "100%",
                          marginRight: "10px",
                          padding: "8px",
                          fontWeight: "600",
                        }}
                        clicking={() => {
                          navigate("/");
                        }}
                        size={30}
                      >
                        <span style={{ color: "#fff" }}>CONTINUE TO LOGIN</span>
                      </Btn>
                    </div>
                  </Msg>
                </ReusableModal>
              )}
              <div className="name">
                <label>Email</label>
                <AppInput
                  placeholder="Enter your email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  width="96%"
                  name="username"
                  padding="12px"
                />
              </div>

              <div>
                <Btn
                  disabled={email === "" ? true : false}
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
                    <span style={{ color: "#fff" }}>Send Mail</span>
                  )}
                </Btn>
              </div>
              <CenterElement>
                <span>Already have an account?</span>
                <Link
                  onClick={() => navigate("/")}
                  style={{ color: "var(--primary-color)" }}
                >
                  Sign in
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

  .emailinput {
    width: 100%;
    /* background: none; */
    padding: 10px;
    /* border: none; */
    /* background: #fff !important; */
    background-color: inherit;
    line-height: 1;
    border: 1px solid #d0d5dd;
    /* border-radius: 5px; */
    color: #000;
    font-weight: 300;
    border: none;
    border-bottom: 1px solid #000;
  }
  .passwordcont {
    position: relative;
  }
  .visibility {
    position: absolute;
    right: 30px;
    bottom: 5px;
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
      display: grid;
      place-items: center;
      height: 100%;
      background: var(--Primary-Colour, #00a85a);
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

  /*  */
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

export default ResetPassword;
