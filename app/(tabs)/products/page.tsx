import ListProduct from "@/components/list-product";
import ProductList from "@/components/product-list";

import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      created_at: true,
      photo: true,
      user: {
        select: {
          username: true,
          id: true,
        },
      },
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Products() {
  const initialProducts = await getInitialProducts();

  return (
    <div>
      <h1 className="flex flex-col justify-center items-center font-semibold text-[50px]">
        모두 모두 모여라
      </h1>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
