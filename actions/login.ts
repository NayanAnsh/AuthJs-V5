"use server";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import * as z from "zod";
import { sign } from "crypto";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { error } from "console";
import { AuthError } from "next-auth";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials " };
        default:
          return { error: "Somthing went error" };
      }
    }
    console.log("Error in sign in--");
    console.log(e);
    throw e;
  }
};
