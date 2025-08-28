"use client";

import { signUpSchema } from "@/lib/schema";
import { z } from "zod";

export type SignupFormData = z.infer<typeof signUpSchema>;
export default function Signup() {
  return <></>;
}
