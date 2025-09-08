import { fetchData, postData } from "@/app/lib/fetchUtil";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SignupFormData } from "../auth/signup/page";
import {
  fetchDataAction,
  loginAction,
  logout,
  postDataAction,
} from "../actions";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (data: SignupFormData) => postDataAction("/users", data),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      loginAction("/auth/login", data),
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // invalidate
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["taskHistory"],
      });
    },
  });
};

export const useUserQuery = () => {
  return useQuery({
    queryKey: ["myData"],
    queryFn: () => fetchDataAction("/users/me"),
  });
};
