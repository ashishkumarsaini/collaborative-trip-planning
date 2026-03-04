'use client';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "../typography"
import { Controller, useForm } from "react-hook-form"
import { loginFormSchema, LoginFormSchemaType } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { control, formState, handleSubmit, reset } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: 'shaktimaan@gmail.com',
      password: 'Shaktimaan@123',
    },
  });


  const onSubmit = async (formData: LoginFormSchemaType) => {
    const { email, password } = formData;

    // const toastPromise = loginUser({
    //   body: { username, password }
    // });

    // toast.promise(
    //   toastPromise,
    //   {
    //     loading: "Loading...",
    //     error: (data) => data.message || 'Unable to register',
    //   }
    // );

    // toastPromise.then(({ data }) => {
    //   const { accessToken, refreshToken, user } = data;
    //   dispatch(saveAuthState({ accessToken, refreshToken, user }));
    //   reset();
    // });
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <Heading level={HeadingLevel.h1} size={HeadingSize.lg}>
            Login to your account
          </Heading>
          <Text size={TextSize.xs} className="mt-2">
            Enter your email below to login to your account
          </Text>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-muted dark:*:data-[slot=field-separator-content]:bg-card">
          Or continue with
        </FieldSeparator>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
