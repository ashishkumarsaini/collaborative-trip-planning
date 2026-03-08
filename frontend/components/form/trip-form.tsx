'use client';
import { cn } from "@/lib/utils"
import { tripSchema, TripSchemaType } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface TripForm {
  shouldUpdate?: boolean,
  initialFormValues?: {
    name: string,
    description?: string,
    startDate: string,
    tripId: string
  },
  onSubmit: (tripInputData: TripSchemaType) => void,
}

export const TripForm = ({ shouldUpdate, initialFormValues, onSubmit }: TripForm) => {
  const { control, formState, handleSubmit } = useForm<TripSchemaType>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      name: initialFormValues?.name || '',
      description: initialFormValues?.description || '',
      startDate: initialFormValues?.startDate ? new Date(initialFormValues.startDate) : new Date()
    }
  });

  return (
    <form className={cn("flex flex-col gap-6")} noValidate onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input {...field} id={field.name} placeholder="Manali To Kashmir" required />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea {...field} id={field.name} placeholder="Description of Trip" required />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="startDate"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Start date</FieldLabel>
              <Input
                id={field.name}
                type="date"
                value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(value ? new Date(value) : undefined);
                }}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" disabled={formState.isLoading}>{shouldUpdate ? 'Update Trip' : 'Create Trip'}</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}