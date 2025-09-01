"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpSchema } from "@/app/lib/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSignUpMutation } from "@/app/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/app/lib/utils";

export type SignupFormData = z.infer<typeof signUpSchema>;

export default function Signup() {
  const router = useRouter();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useSignUpMutation();

  const handleOnSubmit = (values: SignupFormData) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Account created successfully", {
          description: "You can now log in with your credentials.",
        });

        form.reset();
        router.push("/auth/login");
      },
      onError: (error: any) => {
        console.log("Error message for toast:", error.message);
        toast.error(error.message);
      },
    });
  };

  return (
    <Card className="max-w-md w-full shadow-xl">
      <CardHeader className="text-center mb-5">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Create an account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing up..." : "Sign up"}
            </Button>
          </form>
        </Form>

        <CardFooter className="flex items-center justify-center mt-6">
          <div className="flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account? <Link href="/auth/login">Login</Link>
            </p>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
