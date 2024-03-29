import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSequre";

const useAdmin = () => {
  const { user, loading } = useAuth();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      // const res = await axios("https://file-convator-backend.vercel.app/user/findAdmine");
      // const res = await useAxiosSecure.get(`/user/findAdmine/${user.email}`);
      console.log("asking or checking is admin", user);
      const res = await useAxiosSecure.get(`/users/admin/${user.email}`);

      return res.data?.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
