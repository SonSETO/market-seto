"use client";

import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

import Link from "next/link";
import Input from "../../../components/input";
import Button from "../../../components/button";

import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import styles from "../login/LoginModule.module.css";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative overflow-hidden w-full max-w-96 flex justify-center align-middle shadow-lg">
        <div className={styles.formContainer}>
          <form
            action={dispatch}
            className="flex flex-col absolute z-10 bg-slate-700 p-6 inset-0.5"
            noValidate
          >
            <h2 className="font-bold text-2xl text-center text-violet-400"></h2>
            <div className={styles.inputBox}>
              <Input
                name="username"
                type="text"
                placeholder="Username"
                required
                errors={state?.fieldErrors.username}
                minLength={3}
                maxLength={20}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                required
                errors={state?.fieldErrors.email}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                errors={state?.fieldErrors.password}
                minLength={PASSWORD_MIN_LENGTH}
              />
              <Input
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                required
                errors={state?.fieldErrors.confirm_password}
                minLength={PASSWORD_MIN_LENGTH}
              />
            </div>

            <div className=""></div>
            <Button text="Create account" />
          </form>
        </div>
      </div>
    </main>
  );
}
