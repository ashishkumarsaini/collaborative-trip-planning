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
import { Controller, useForm } from "react-hook-form"
import { loginFormSchema, LoginFormSchemaType } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/lib/context";

export function LoginForm({
  className,
}: React.ComponentProps<"form">) {
  const { onLoginUser } = useAuth();
  const { control, formState, handleSubmit, reset } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });


  const onSubmit = async (formData: LoginFormSchemaType) => {
    const { email, password } = formData;

    await onLoginUser(email, password);
    reset();
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} noValidate onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Logged in to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to login into your account
          </p>
        </div>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="m@example.com" required />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input {...field} id={field.name} aria-invalid={fieldState.invalid} type="password" required />
              <FieldDescription>
                Must be at between 8 - 12 characters long.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field />
        <Field>
          <Button type="submit" disabled={formState.isLoading}>Login</Button>
        </Field>
        <FieldSeparator>
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
