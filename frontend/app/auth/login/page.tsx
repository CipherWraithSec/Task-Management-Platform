"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/app/hooks/useAuth";
import { toast } from "sonner";
import { z } from "zod";
import { loginSchema } from "@/app/lib/schema";
import { useAppDispatch } from "@/app/hooks/redux";
import { setAuthStatus } from "@/app/lib/redux/features/auth/authSlice";

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = useLoginMutation();

  const handleOnSubmit = (values: LoginFormData) => {
    mutate(values, {
      onSuccess: (data) => {
        toast.success("Login successful");
        dispatch(setAuthStatus(true));
        router.push("/");
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Card className="max-w-md w-full shadow-xl">
      <CardHeader className="text-center mb-5">
        <CardTitle className="text-2xl font-bold">Task Manager</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Sign in to continue
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="w-4 h-4 mr-2" /> : "Sign in"}
            </Button>
          </form>
        </Form>

        <CardFooter className="flex items-center justify-center mt-6">
          <div className="flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup">Sign up</Link>
            </p>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
