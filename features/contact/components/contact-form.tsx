"use client";

import { useState, type FormEvent } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAsyncTask } from "@/hooks/use-async-task";
import { submitContactRequest } from "@/services/contact-service";
import {
  sanitizeContactField,
  type ContactFieldName,
  type ContactFormValues,
  validateContactForm
} from "@/features/contact/utils";

const initialValues: ContactFormValues = {
  email: "",
  message: "",
  name: ""
};

export function ContactForm() {
  const [errors, setErrors] = useState<Record<ContactFieldName, string | undefined>>({
    email: undefined,
    message: undefined,
    name: undefined
  });
  const [values, setValues] = useState<ContactFormValues>(initialValues);

  const submitTask = useAsyncTask(submitContactRequest);

  const handleChange = (field: ContactFieldName, value: string) => {
    const sanitizedValue = sanitizeContactField(field, value);

    setValues((current) => ({
      ...current,
      [field]: sanitizedValue
    }));

    if (errors[field]) {
      const nextValues = {
        ...values,
        [field]: sanitizedValue
      };
      const nextErrors = validateContactForm(nextValues);

      setErrors((current) => ({
        ...current,
        [field]: nextErrors[field]
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    setErrors({
      email: nextErrors.email,
      message: nextErrors.message,
      name: nextErrors.name
    });

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    const result = await submitTask.execute(values);

    if (result.ok) {
      setValues(initialValues);
      setErrors({
        email: undefined,
        message: undefined,
        name: undefined
      });
    }
  };

  return (
    <Card className="space-y-6 p-6 md:p-8">
      <div className="space-y-2">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary">Contact Support</h2>
        <p className="text-sm text-on-surface-variant md:text-base">
          Share your question and we&apos;ll get back within 2 business days.
        </p>
      </div>

      {submitTask.isError && submitTask.error ? (
        <Alert description={submitTask.error} title="Could not send your request" tone="error" />
      ) : null}

      {submitTask.isSuccess && submitTask.data ? (
        <Alert
          description={`Reference ${submitTask.data.reference}. We received your request and will follow up shortly.`}
          title="Request submitted successfully"
          tone="success"
        />
      ) : null}

      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <FormField error={errors.name} htmlFor="contact-name" label="Full Name" required>
          <Input
            autoComplete="name"
            hasError={Boolean(errors.name)}
            id="contact-name"
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="Your full name"
            value={values.name}
          />
        </FormField>

        <FormField error={errors.email} htmlFor="contact-email" label="Email" required>
          <Input
            autoComplete="email"
            hasError={Boolean(errors.email)}
            id="contact-email"
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder="you@example.com"
            type="email"
            value={values.email}
          />
        </FormField>

        <FormField error={errors.message} htmlFor="contact-message" label="Message" required>
          <Textarea
            hasError={Boolean(errors.message)}
            id="contact-message"
            onChange={(event) => handleChange("message", event.target.value)}
            placeholder="Tell us what you need help with."
            rows={5}
            value={values.message}
          />
        </FormField>

        <Button disabled={submitTask.isPending} fullWidth size="lg" type="submit">
          {submitTask.isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  );
}
