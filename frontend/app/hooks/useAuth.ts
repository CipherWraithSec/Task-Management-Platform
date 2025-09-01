import { fetchData, postData } from "@/app/common/fetchUtil";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SignupFormData } from "../auth/signup/page";
import { fetchDataAction, loginAction, postDataAction } from "../actions";

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

export const useUserQuery = () => {
  return useQuery({
    queryKey: ["myData"],
    queryFn: () => fetchDataAction("/users/me"),
  });
};
