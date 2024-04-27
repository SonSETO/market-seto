import Link from "next/link";
import "@/lib/db";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl">🥲</span>
        <h1 className="text-4xl ">과제</h1>
        <h2 className="text-2xl">과제에 어서오세요!</h2>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex gap-2">
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
        </div>
        <Link href="/create-account" className="primary-btn py-2.5 text-lg">
          회원가입
        </Link>
      </div>
    </div>
  );
}
