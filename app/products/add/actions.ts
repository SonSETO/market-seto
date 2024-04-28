"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
  photo: z.string({
    required_error: "사진은 필수입니다.",
  }),
  title: z.string({
    required_error: "제목은 필수입니다.",
  }),
  description: z.string({
    required_error: "설명은 필수입니다.",
  }),
});

export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    description: formData.get("description"),
  };
  // if (data.photo instanceof File) {
  //   // 일단 테스트를 위해 작성 이건 실제로 안 쓰일거임
  //   const photoData = await data.photo.arrayBuffer();
  //   await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
  //   data.photo = `/${data.photo.name}`;
  // }
  const results = productSchema.safeParse(data);
  if (!results.success) {
    return results.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          title: results.data.title,
          description: results.data.description,
          photo: results.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      // redirect(`/products/${product.id}`);
      redirect("/products");
    }
  }
  //   console.log(data);
}
