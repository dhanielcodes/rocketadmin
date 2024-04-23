/* eslint-disable no-unused-vars */

import { Axios } from "../utils/Axios";
import { BASE_URL } from "../../config/config";

const baseurl = BASE_URL;

export const getAdminDashboard = async (userId = 0) => {
  const { data } = await Axios.get(`${baseurl}/getuserdashboard/${userId}`);
  return data;
};

export const beneficiaries = async (userId, bid) => {
  const { data } = await Axios.get(
    `${baseurl}/getuserbeneficiaries?userId=${userId || 0}&beneficiaryId=${
      bid || 0
    }`
  );
  return data;
};
export const getCurrencies = async () => {
  const { data } = await Axios.get(`${baseurl}/getcurrency`);
  return data;
};

export const getUserCurrencies = async (userId) => {
  const { data } = await Axios.get(
    `${baseurl}/getusercurrency/${userId?.queryKey[0]}`
  );
  return data;
};
export const getpayoutclienttransactiontype = async () => {
  const { data } = await Axios.get(`${baseurl}/getpayoutclienttransactiontype`);
  return data;
};

export const getBanks = async (userId, bid) => {
  const { data } = await Axios.get(`${baseurl}/getbanks`);
  return data;
};

export const getCompanyBanks = async (userId, bid) => {
  const { data } = await Axios.get(`${baseurl}/getsystemofflinepaymentbanks`);
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

export const transactionNotifications = async () => {
  const { data } = await Axios.get(
    `${baseurl}/gettransactiondepositnotifications`
  );
  return data;
};

export const markNotifAsRead = async (id) => {
  const { data } = await Axios.post(
    `${baseurl}/markdepositnotificationasread/${id}`
  );
  return data;
};

export const getKycNotifications = async () => {
  const { data } = await Axios.get(
    `${baseurl}/getuserkycverificationnotifications`
  );
  return data;
};

export const markKycNotifAsRead = async (id) => {
  const { data } = await Axios.post(
    `${baseurl}/markuserverficationnotificationasread/${id}`
  );
  return data;
};

export const agentCustomerGetRate = async (query) => {
  const q = query?.queryKey;
  const { data } = await Axios.get(
    `${baseurl}//agentcustomersgetrate?fromCurrencyId=${
      q[0] || 0
    }&toCurrencyId=${q[1] || 0}&fromAmount=${q[2] || 0}&toAmount=${
      q[3] || 0
    }&roleId=${q[4]}&agentId=${q[5]}&userId=${q[6]}`
  );
  return data;
};

export const customerRates = async (query) => {
  const q = query?.queryKey;
  const { data } = await Axios.get(
    `${baseurl}/getrate?fromCurrencyId=${q[0] || 0}&toCurrencyId=${
      q[1] || 0
    }&fromAmount=${q[2] || 0}&toAmount=${q[3] || 0}&roleId=${q[4]}&userId=${
      q[6]
    }`
  );
  return data;
};
export const Tranx = async (userId, category) => {
  const { data } = await Axios.get(
    `${baseurl}/getusertransactionlog/${userId || 0}${
      category ? `?categoryId=${category}` : ""
    }`
  );
  return data;
};

export const getpayoutfundrequestbydate = async (start, end) => {
  const { data } = await Axios.get(
    `${baseurl}/getpayoutfundrequestbydate${
      start && end ? `?startDate=${start}&endDate=${end}` : ""
    }`
  );
  return data;
};

export const getpayoutfundrequestbyref = async (payload) => {
  const { data } = await Axios.get(
    `${baseurl}/getpayoutfundrequestbyref${payload ? `?trxRef=${payload}` : ""}`
  );
  return data;
};

export const getpayouttransactionbydate = async (start, end) => {
  const { data } = await Axios.get(
    `${baseurl}/getpayouttransactionbydate${
      start && end ? `?startDate=${start}&endDate=${end}` : ""
    }`
  );
  return data;
};

export const getpayouttransactionbyref = async (payload) => {
  const { data } = await Axios.get(
    `${baseurl}/getpayouttransactionbyref${payload ? `?trxRef=${payload}` : ""}`
  );
  return data;
};

export const gettransactionlogbydate = async (start, end) => {
  const { data } = await Axios.get(
    `${baseurl}/gettransactionlogbydate${
      start && end ? `?startDate=${start}&endDate=${end}` : ""
    }`
  );
  return data;
};

export const gettransactionlogbyref = async (payload) => {
  const { data } = await Axios.get(
    `${baseurl}/gettransactionlogbyref${
      payload ? `?paymentRef=${payload}` : ""
    }`
  );
  return data;
};

/*  */

export const cancelTransaction = async (body) => {
  const { data } = await Axios.post(`${baseurl}/canceltransaction/${body}`);
  return data;
};

export const confirmTransaction = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/confirmtransactionpayment/${body}`
  );
  return data;
};

export const marktransactionsuspicious = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/marktransactionsuspicious/${body}`
  );
  return data;
};

export const markaspay = async (body) => {
  const { data } = await Axios.post(`${baseurl}/markaspaid/${body}`);
  return data;
};

export const paytransaction = async (body) => {
  const { data } = await Axios.post(`${baseurl}/paytransaction/${body}`);
  return data;
};
export const holdtransaction = async (body) => {
  const { data } = await Axios.post(`${baseurl}/holdtransaction/${body}`);
  return data;
};
export const revertholdtransaction = async (body) => {
  const { data } = await Axios.post(`${baseurl}/revertholdtransaction/${body}`);
  return data;
};

export const addcommenttotransaction = async (body) => {
  const { data } = await Axios.post(`${baseurl}/addcommenttotransaction`, body);
  return data;
};
export const viewCommentsTransaction = async (userId) => {
  console.log("🚀 ~ file: Dashboard.jsx:31 ~ Tranx ~ userId:md", userId);
  const { data } = await Axios.get(
    `${baseurl}/viewtransactioncomment/${userId}`
  );
  return data;
};

export const TodayLogss = async (userId) => {
  console.log(
    "🚀 ~ file: Dashboard.jsx:31 ~ Tranx ~ userId:",
    userId?.queryKey[0]
  );
  const { data } = await Axios.get(`${baseurl}/gettodaylog/0`);
  return data;
};

export const updateUserWatchList = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/uppdateaccountwatchliststatus`,
    body
  );
  return data;
};

export const suspendAccount = async (body) => {
  const { data } = await Axios.post(`${baseurl}/suspendaccount`, body);
  return data;
};
export const activateAccount = async (body) => {
  const { data } = await Axios.post(`${baseurl}/reactivateaccount`, body);
  return data;
};
export const deactivateAccount = async (body) => {
  const { data } = await Axios.post(`${baseurl}/deactivateaccount`, body);
  return data;
};

export const allowusermulticurrency = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/allowusermulticurrency/${body}`
  );
  return data;
};

export const disallowusermulticurrency = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/disallowusermulticurrency/${body}`
  );
  return data;
};
export const getUsers = async (id = 5) => {
  const { data } = await Axios.get(`${baseurl}/getuserbyrole/6`);
  return data;
};
export const getIncompleteCustomers = async (id = 5) => {
  const { data } = await Axios.get(`${baseurl}/getincompleteusersbyrole/6`);
  return data;
};
export const getAccountRequiredCustomer = async (id = 5) => {
  const { data } = await Axios.get(`${baseurl}/getactionrequiredusersbyrole/6`);
  return data;
};
export const getAgents = async (id = 5) => {
  const { data } = await Axios.get(`${baseurl}/getuserbyrole/${id}`);
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

export const updatePaymentChannel = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/updatepaymentprovidersupportcurrencies`,
    body
  );
  return data;
};
export const updatePaymentProvider = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/updatepaymentprovidersupportcurrencies`,
    body
  );
  return data;
};
export const updatePayoutChannel = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/updatepaymentprovidersupportcurrencies`,
    body
  );
  return data;
};
export const updatePayoutProvider = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/updatepayoutprovidersupportcurrencies`,
    body
  );
  return data;
};

export const getRoleMeta = async () => {
  const { data } = await Axios.get(
    `${baseurl}/getuseraccountcategory?role=0&rateMetaDataId=0`
  );
  return data;
};
export const getRoles = async () => {
  const { data } = await Axios.get(`${baseurl}/getroles`);
  return data;
};

export const getRoleMenu = async (id) => {
  const { data } = await Axios.get(
    `${baseurl}/getroleswithuseraccess/${id || 0}`
  );
  return data;
};
export const getAgentInviteList = async () => {
  const { data } = await Axios.get(`${baseurl}/getagentinvite`);
  return data;
};

export const getIdTypes = async () => {
  const { data } = await Axios.get(`${baseurl}/getidtypes`);
  return data;
};

export const getUserDocTypes = async () => {
  const { data } = await Axios.get(`${baseurl}/getuserdocumentstypes`);
  return data;
};

export const getPayoutPartner = async () => {
  const { data } = await Axios.get(`${baseurl}/getpayoutpartner`);
  return data;
};

export const getPayoutPartnerGateways = async (id) => {
  const { data } = await Axios.get(`${baseurl}/getpayoutpartnergateways/${id}`);
  return data;
};

export const getPayoutPartnerLog = async (id) => {
  const { data } = await Axios.get(
    `${baseurl}/getpayoutlogbypayoutpartner${id}`
  );
  return data;
};

export const addNewDocument = async (body) => {
  const { data } = await Axios.post(`${baseurl}/adduserkycdocument`, body);
  return data;
};
export const addemployee = async (body) => {
  const { data } = await Axios.post(`${baseurl}/addemployee`, body);
  return data;
};
export const updateEmployee = async (body) => {
  const { data } = await Axios.post(`${baseurl}/updateemployeeprofile`, body);
  return data;
};
export const updateDocument = async (body) => {
  const { data } = await Axios.post(`${baseurl}/updateuserkycdocument`, body);
  return data;
};

export const getPaymentProcessors = async () => {
  const { data } = await Axios.get(`${baseurl}/getpaymentchannelprocessor`);
  return data;
};
export const getPayoutProcessors = async () => {
  const { data } = await Axios.get(`${baseurl}/getpayoutchannelprocessor`);
  return data;
};

export const addPayoutProcessor = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/addpayoutchannelprocessor`,
    body
  );
  return data;
};

export const addPaymentProcessor = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/addpaymentchannelprocessor`,
    body
  );
  return data;
};

export const updatePayoutProcessor = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/updatepayoutchannelprocessor`,
    body
  );
  return data;
};

export const updatePaymentProcessor = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/updatepaymentchannelprocessor`,
    body
  );
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
export const GetUserDetails = async (id) => {
  console.log(
    "🚀 ~ file: Dashboard.jsx:57 ~ GetDetails ~ id:",
    id?.queryKey?.[0]
  );
  const { data } = await Axios.get(`${baseurl}/getuserdashboard/${id}`);
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
  const { data } = await Axios.post(`${baseurl}/sendmoneyviabackoffice`, body);
  return data;
};
export const sendAgentInvite = async (body) => {
  const { data } = await Axios.post(`${baseurl}/sendagentinvite`, body);
  return data;
};

export const addCompanyBank = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/addsystemofflinepaymentbank`,
    body
  );
  return data;
};

export const editCompanyBank = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/updatesystemofflinepaymentbank`,
    body
  );
  return data;
};

export const GetEmployees = async () => {
  const { data } = await Axios.get(`${baseurl}/getemployees`);
  return data;
};
export const AddEmployees = async () => {
  const { data } = await Axios.get(`${baseurl}/getemployees`);
  return data;
};

export const getProfessions = async () => {
  const { data } = await Axios.get(`${baseurl}/getprofession`);
  return data;
};

export const addProfession = async (body) => {
  const { data } = await Axios.post(`${baseurl}/addprofession`, body);
  return data;
};
export const updateProfession = async (body) => {
  const { data } = await Axios.post(`${baseurl}/updateprofession`, body);
  return data;
};

export const getRisks = async () => {
  const { data } = await Axios.get(`${baseurl}/getriskfactors`);
  return data;
};
export const getAgentCustomers = async (id) => {
  const { data } = await Axios.get(`${baseurl}/getagentcustomers/${id}`);
  return data;
};

export const updateUserMenu = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/updateuserrolemenuaccess`,
    body
  );
  return data;
};

export const updateUserSubMenu = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/updateuserrolesubmenuaccess`,
    body
  );
  return data;
};

export const addcommenttouserkycdocument = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/addcommenttouserkycdocument`,
    body
  );
  return data;
};

export const viewuserkycdocumentcomment = async (userId) => {
  console.log("🚀 ~ file: Dashboard.jsx:31 ~ Tranx ~ userId:md", userId);
  const { data } = await Axios.get(
    `${baseurl}/viewuserkycdocumentcomment/${userId}`
  );
  return data;
};
