import { postData } from "@/app/lib/fetchUtil";
import { useMutation } from "@tanstack/react-query";
import { SignupFormData } from "../auth/signup/page";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (data: SignupFormData) => postData("/users", data),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      postData("/auth/users", data),
  });
};
