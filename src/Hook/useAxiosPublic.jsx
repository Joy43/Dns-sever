import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://dns-sever.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
