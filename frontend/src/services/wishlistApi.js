import axios from "axios";

const BASE_URL = "http://localhost/backend/api/wishlist";

export const getWishlist = () => axios.get(`${BASE_URL}/getWishlist.php`);

export const removeWishlist = (collegeId) =>
  axios.get(`${BASE_URL}/removeWishlist.php?college_id=${collegeId}`);

export const clearWishlist = () => axios.get(`${BASE_URL}/clearWishlist.php`);
