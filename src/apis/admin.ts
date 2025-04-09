import axios from "@/lib/axios";

const getCigars = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    if (error.response?.status !== 422) {
      throw error;
    }
  }
};

const getMembers = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    if (error.response?.status !== 422) {
      throw error;
    }
  }
};

export default {
  getCigars,
  getMembers,
};
