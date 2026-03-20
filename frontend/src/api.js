import axios from "axios";

// 🔗 Replace with your Render backend URL
const API = "https://rosywood-bakery.onrender.com/api";

export const getProducts = async () => {
  const res = await axios.get(`${API}/products`);
  return res.data;
};