"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-violet-400 text-gray-700 active:bg-violet-300 border-none px-3 py-3 w-full  rounded-full font-bold cursor-pointer mt-[100px]"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}
