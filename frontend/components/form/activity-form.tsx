'use client';
import { cn } from "@/lib/utils"
import { activitySchema, ActivitySchemaType } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { addTripActivity } from "@/lib/services";
import { toast } from "sonner";

export const CreateActivityForm = ({ order, tripId }: { order: number, tripId: string }) => {
  const { control, formState, handleSubmit } = useForm<ActivitySchemaType>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: '',
      description: '',
      numberOfDays: 1,
      startDate: new Date(),
      location: {
        city: '',
        description: ''
      }
    },
  });


  const onSubmit = async (activityData: ActivitySchemaType) => {
    const { startDate } = activityData;
    const dateString = startDate.toISOString();

    const { message } = await addTripActivity(tripId, { ...activityData, order, startDate: dateString.split('T')[0] });

    toast.error(message);
  };

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
          name="numberOfDays"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Number of days</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="number"
                min={1}
                max={50}
                onChange={(event) => field.onChange(event.target.valueAsNumber || 0)}
                required
              />
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
        <Controller
          name="location.city"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>City</FieldLabel>
              <Input {...field} id={field.name} placeholder="Manali" required />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="location.description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Location</FieldLabel>
              <Input {...field} id={field.name} placeholder="Manali - Kashmir" required />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" disabled={formState.isLoading}>Add Activity</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}