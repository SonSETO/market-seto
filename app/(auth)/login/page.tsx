"use client";

import Button from "../../../components/button";
import Input from "../../../components/input";
import styles from "./LoginModule.module.css";

import { useFormState } from "react-dom";
import { login } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function LogIn() {
  const [state, dispatch] = useFormState(login, null);

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
                name="email"
                type="email"
                placeholder="Email"
                required
                errors={state?.fieldErrors.email}
              />
            </div>

            <div className="mt-[50px]">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                minLength={PASSWORD_MIN_LENGTH}
                errors={state?.fieldErrors.password}
              />
            </div>
            <Button text="Log in" />
          </form>
        </div>
      </div>
    </main>
  );
}

// request.cookies.get("");
