import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const useCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const response = await api.get("/category");
      return response.data;
    },

    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    categories: query.data?.categories || [],
  };
};

export default useCategories;