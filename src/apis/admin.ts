import axios from "@/lib/axios";

const getCigars = async () => {
  try {
    const res = await axios.get("/api/cigar");
    return res.data;
  } catch (error: any) {
    if (error.response?.status !== 422) {
      throw error;
    }
  }
};

export default {
  getCigars,
};
