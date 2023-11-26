/* eslint-disable no-unused-vars */

import { Axios } from "../utils/Axios";
import { BASE_URL } from "../../config/config";

const baseurl = BASE_URL;

export const getPayoutDashboard = async (userId = 0) => {
  const { data } = await Axios.get(`${baseurl}/getuserdashboard/${userId}`);
  return data;
};

export const getPayoutClientDashboard = async (userId = 0) => {
  const { data } = await Axios.get(
    `${baseurl}/getpayoutclientdashboard/${userId}`
  );
  return data;
};

export const getRatesList = async (userId = 0) => {
  const { data } = await Axios.get(`${baseurl}/getallrates`);
  return data;
};

export const getOurRates = async (userId = 0) => {
  const { data } = await Axios.get(`${baseurl}/getratelogs`);
  return data;
};

export const getAgentRates = async (userId = 0) => {
  const { data } = await Axios.get(
    `${baseurl}/agentgetrate?agentId=0&rateId=0`
  );
  return data;
};

export const updateRate = async (body) => {
  const { data } = await Axios.post(`${baseurl}/updaterate`, body);
  return data;
};

export const createRate = async (body) => {
  const { data } = await Axios.post(`${baseurl}/addnewrate`, body);
  return data;
};

export const createRateMetadata = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/addnewcurrencyratemetadata`,
    body
  );
  return data;
};

export const getKYCProviders = async (userId = 0) => {
  const { data } = await Axios.get(`${baseurl}/getkycprovider`);
  return data;
};

export const getPaymentProviders = async (userId = 0) => {
  const { data } = await Axios.get(`${baseurl}/getpaymentprovider`);
  return data;
};

export const getPayoutProviders = async (userId = 0) => {
  const { data } = await Axios.get(`${baseurl}/getpayoutprovider`);
  return data;
};

export const updatePayoutClientStatus = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/togglepayoutclientaccount`,
    body
  );
  return data;
};

export const updateClientWallet = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/togglepayoutclientwalletprovider`,
    body
  );
  return data;
};

export const updateFile = async (body) => {
  const { data } = await Axios.post(`${baseurl}/updatepayoutclientfile`, body);
  return data;
};

export const processWalletLog = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/processwalletfundingrequest`,
    body
  );
  return data;
};

export const createFundingRequest = async (body) => {
  const { data } = await Axios.post(`${baseurl}/walletfundingrequest`, body);
  return data;
};

export const addClientCharges = async (body) => {
  const { data } = await Axios.post(`${baseurl}/addpayoutclientcharges`, body);
  return data;
};

export const updateClientCharges = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/updatepayoutclientcharges`,
    body
  );
  return data;
};

export const updatePayoutClientWalletProvider = async (body) => {
  const { data } = await Axios.post(`${baseurl}/activatekycprovider/${body}`);
  return data;
};
/* export const updatePayoutClientWalletProvider = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/togglepayoutclientwalletprovider`,
    body
  );
  return data;
}; */
export const beneficiaries = async (userId, bid) => {
  const { data } = await Axios.get(
    `${baseurl}/getuserbeneficiaries?userId=${
      userId || 68059751
    }&beneficiaryId=${bid || 0}`
  );
  return data;
};

export const getBanks = async (userId, bid) => {
  const { data } = await Axios.get(`${baseurl}/getbanks`);
  return data;
};
export const nameEnquiry = async (query) => {
  console.log(
    "🚀 ~ file: Dashboard.jsx:24 ~ nameEnquiry ~ query:",
    query?.queryKey
  );
  const { data } = await Axios.get(
    `${baseurl}/BankDetailsLookUp?bankCode=${query?.queryKey[0]}&accountNumber=${query?.queryKey[1]}`
  );
  return data;
};

export const Tranx = async (userId) => {
  console.log(
    "🚀 ~ file: Dashboard.jsx:31 ~ Tranx ~ userId:",
    userId?.queryKey[0]
  );
  const { data } = await Axios.get(
    `${baseurl}/getuserlog/${userId?.queryKey[0]}`
  );
  return data;
};
export const TransferPurpose = async () => {
  const { data } = await Axios.get(`${baseurl}/gettransferpurpose`);
  return data;
};

export const Paymentchannel = async () => {
  const { data } = await Axios.get(`${baseurl}/getpaymentchannel`);
  return data;
};

export const Payoutchannel = async () => {
  const { data } = await Axios.get(`${baseurl}/getpayoutchannel`);
  return data;
};

export const GetDetails = async (id) => {
  console.log(
    "🚀 ~ file: Dashboard.jsx:57 ~ GetDetails ~ id:",
    id?.queryKey[0]
  );
  const { data } = await Axios.get(
    `${baseurl}/getuserdashboard/${id?.queryKey[0]}`
  );
  return data;
};

export const Rates = async (query) => {
  const q = query?.queryKey;
  const { data } = await Axios.get(
    `${baseurl}/getrate?fromCurrencyId=${q[0] || 0}&toCurrencyId=${
      q[1] || 0
    }&fromAmount=${q[2] || 0}&toAmount=${q[3] || 0}`
  );
  return data;
};
export const TodayRates = async (query) => {
  const q = query?.queryKey;
  const { data } = await Axios.get(
    `${baseurl}/gettodaysrate?fromCurrencyId=${q[0] || 0}&toCurrencyId=${
      q[1] || 0
    }`
  );
  return data;
};

export const createBeneficiary = async (body) => {
  console.log("🚀 ~ file: Dashboard.jsx:32 ~ createBeneficiary ~ body:", body);
  const { data } = await Axios.post(`${baseurl}/adduserbeneficiary`, body);
  return data;
};

export const createWallet = async (body) => {
  const { data } = await Axios.post(`${baseurl}/adduserwallet`, body);
  return data;
};
export const sendMoney = async (body) => {
  const { data } = await Axios.post(`${baseurl}/sm`, body);
  return data;
};
export const sendAgentInvite = async (body) => {
  const { data } = await Axios.post(`${baseurl}/sendagentinvite`, body);
  return data;
};
