import { Axios } from "../utils/Axios";
import { BASE_URL } from "../../config/config";

const baseurl = BASE_URL;

// user login
export const userLogin = async (body) => {
  const { data } = await Axios.post(`${baseurl}/auth`, body);
  console.log(body);
  return data;
};

export const forgotPassword = async (body) => {
  const { data } = await Axios.post(`${baseurl}/InitiateForgotPassword`, body);
  console.log(body);
  return data;
};
// create bank account
export const createUser = async (body) => {
  const { data } = await Axios.post(`${baseurl}/signup`, body);
  return data;
};

export const getCurrencies = async () => {
  const { data } = await Axios.get(`${baseurl}/getcurrency`);
  return data;
};

export const getCountries = async () => {
  const { data } = await Axios.get(`${baseurl}/getcountries `);
  return data;
};

export const getClientChargeTypes = async () => {
  const { data } = await Axios.get(`${baseurl}/getpayoutchargetypes`);
  return data;
};
export const checkEmail = async (body) => {
  const { data } = await Axios.get(`${baseurl}/checkUserExistByEmail`, body);
  console.log("🚀 ~ file: Auth.jsx:37 ~ checkEmail ~ data:", data);
  return data;
};

export const uploadFile = async (body) => {
  const { data } = await Axios.post(
    `${baseurl}/FileUploadAPI/${body.id}`,
    body.file
  );
  return data;
};
export const profession = async () => {
  const { data } = await Axios.get(`${baseurl}/getprofession`);
  return data;
};

export const employment = async () => {
  const { data } = await Axios.get(`${baseurl}/getemploymentstatus`);
  return data;
};

export const GetToken = async (id) => {
  console.log("🚀 ~ file: Auth.jsx:56 ~ GetToken ~ id:", id);
  const { data } = await Axios.get(
    `${baseurl}/getsumsubaccesstoken?userId=${id?.queryKey[0]}`
  );
  return data;
};

export const states = async (cid, sid) => {
  const { data } = await Axios.get(
    `${baseurl}/getstates?countryId=${cid || 0}&stateId=${sid || 0}`
  );
  return data;
};

export const getCities = async (cid) => {
  const { data } = await Axios.get(
    `${baseurl}/getcities?countryId=${cid || 0}`
  );
  return data;
};

// register user
export const registerUser = async (body) => {
  const { data } = await Axios.post(`${baseurl}account/signup/`, body);
  return data;
};
