import { postData } from "@/app/lib/fetchUtil";
import { useMutation } from "@tanstack/react-query";
import { SignupFormData } from "../auth/signup/page";
import { loginAction, postDataAction } from "../actions";

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
