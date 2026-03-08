import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { ZodObject } from "zod";
import { $strip } from "zod/v4/core";

export const Form = ({ formSchema, defaultValues }: {
  formSchema: ZodObject<unknown, $strip>, defaultValues: unknown
}) => {
  const { control, formState, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });
}