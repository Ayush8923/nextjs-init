import axios from "@/lib/axios";
import { getQueryString } from "@/lib/common";
import { RequestParams } from "@/lib/types";

const getCigars = async (params: RequestParams = {}) => {
  const url = `/api/cigars?${getQueryString(params)}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    if (error.response?.status !== 422) {
      throw error;
    }
  }
};

const getMembers = async (params: RequestParams = {}) => {
  const url = `/api/members?${getQueryString(params)}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    if (error.response?.status !== 422) {
      throw error;
    }
  }
};

const updateCigarStatus = async (cigarId: number, payload = {}) => {
  const response = await axios.post(`/api/cigars/${cigarId}/status`, payload);
  return response?.data;
};

export default {
  getCigars,
  getMembers,
  updateCigarStatus,
};
