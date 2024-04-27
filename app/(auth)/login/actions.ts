"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "없는 이메일이에요오 "),
  password: z.string({
    required_error: "비밀번호는 필수입니다아",
  }),
  // .min(PASSWORD_MIN_LENGTH)
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxx"
    );
    // if the user is found => check password hash
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      // log the user in
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["틀렸다네요~"],
          email: [],
        },
      };
    }

    // redirect '/profile'
  }
}
