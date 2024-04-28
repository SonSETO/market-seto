import ListProduct from "@/components/list-product";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

interface UsernameProps {
  username: string;
}

function Username({ username }: UsernameProps) {
  return <h1>Welcome {username}</h1>;
}

async function getAllProducts(id: number) {
  const products = await db.product.findMany({
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      photo: true,
      created_at: true,
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
  return products.filter((product) => product.user?.id === id);
}

export default async function Profile() {
  const session = await getSession();
  const myprofile = await getAllProducts(session.id!);
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      email: true,
      username: true,
      avatar: true,
    },
  });

  async function logOut() {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-center items-center font-semibold text-[50px]">
        <Suspense fallback={"Welcome"}>
          <Username username={user?.username ?? ""} />
        </Suspense>
      </div>
      <form
        action={logOut}
        className="flex flex-col justify-center items-center "
      >
        <button className="my-[30px] text-white transition-colors duration-300 hover:text-red-500 hover:scale-105">
          Log out
        </button>
      </form>
      <div className="w-full h-[60%] overflow-y-scroll pb-10 mb-[10px]">
        {myprofile.map((product) => (
          <ListProduct isLikedByUser={false} key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
