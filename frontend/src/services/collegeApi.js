import axios from "axios";

const API_URL = "http://localhost/backend/api/college";

export const getAllColleges = async () => {
  return await axios.get(`${API_URL}/getColleges.php`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
};
