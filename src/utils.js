import axios from "axios";

export const baseUrl = "http://localhost:5000/";;
export const sortByPrice = async () => {
  const res = await axios.get(baseUrl);
  return res.data.data.sort((a, b) => a.price.value - b.price.value);
};

export const sortByPriceDesc = async () => {
  const res = await axios.get(baseUrl);
  return res.data.data.sort((a, b) => b.price.value - a.price.value);
};

export const fetchProducts = async () => {
  const res = await axios.get(baseUrl);
  return res.data.data;
};

export const handleChangeDepartment = async (props) => {
  const res = await axios.get(baseUrl);
  return res.data.data
    .filter((el) => el.department === props)
    .sort((a, b) => b.price.value - a.price.value);
};

export const handleChangeType = async (props) => {
  const res = await axios.get(baseUrl);
  return res.data.data
    .filter((el) => el.type === props)
    .sort((a, b) => b.price.value - a.price.value);
};
