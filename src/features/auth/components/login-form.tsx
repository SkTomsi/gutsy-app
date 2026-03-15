/** biome-ignore-all lint/correctness/noChildrenProp: <explanation> */
"use client";

import { useForm } from "@tanstack/react-form";
import { LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import { sileo } from "sileo";
import { z } from "zod";
import AccentButton from "@/components/custom/accent-button";
import { BodyL, TitleL } from "@/components/typography/font";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginInGoogleButton } from "./google-button";

const LOGIN_FORM_SCHEMA = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LOGIN_FORM_SCHEMA,
    },
    onSubmit: async ({ value }) => {
      sileo.success({
        title: "You have submitted the form",
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
      });
    },
  });

  return (
    <div className="min-h-dvh flex flex-col w-full relative p-3">
      <div className="flex flex-col gap-6 w-full h-fit bg-white rounded-2xl px-4 py-12">
        <div className="size-24 bg-muted rounded-xl p-2 flex flex-col items-center justify-center mx-auto">
          <Image
            src={"/assets/mascot/1.png"}
            alt="mascot"
            width={200}
            height={200}
          />
        </div>

        <div className="space-y-2 text-center">
          <TitleL>Log in to Gutsy</TitleL>
          <BodyL className="text-muted-foreground text-balance">
            Your gut is trying to tell you something. Gutsy helps you finally
            listen.
          </BodyL>
        </div>
        <div>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-input" />
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="gloop@bettergut.com"
                          autoComplete="off"
                          className="pl-10 placeholder:text-muted-foreground/50"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="relative items-center">
                        <LockIcon className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-input" />
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="*******"
                          type="password"
                          autoComplete="off"
                          className="pl-10 placeholder:text-muted-foreground/50"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <AccentButton type="submit">Log in</AccentButton>
            </FieldGroup>
          </form>
        </div>

        <div className="flex gap-4 items-center my-3">
          <div className="border-b w-full" />
          <p className="text-muted-foreground text-sm">OR</p>
          <div className="border-b w-full" />
        </div>
        <div className="w-full">
          <LoginInGoogleButton />
        </div>
      </div>
    </div>
  );
}
