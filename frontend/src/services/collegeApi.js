import axios from "axios";
import API_BASE from "../config/api";

export const getAllColleges = async () => {
  return await axios.get(`${API_BASE}?r=site/api-colleges`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("adminToken")}`,
    },
  });
};

