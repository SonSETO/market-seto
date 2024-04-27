"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./actions";
import { useFormState } from "react-hook-form";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isValidSize, setIsValidSize] = useState(true);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setIsImageUploaded(true);

    if (file.size > 4 * 1024 * 1024) {
      setIsValidSize(false);
    } else {
      setIsValidSize(true);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isImageUploaded && isValidSize) {
      const formData = new FormData(event.currentTarget);
      uploadProduct(formData);
    } else {
      alert("이미지를 업로드하거나 이미지 크기를 확인하세요.");
    }
  };

  return (
    <div>
      <form
        action={uploadProduct}
        onSubmit={onSubmit}
        className="flex flex-col gap-5 p-5"
      >
        {/* 유저가 이미지를 업로드 할 떄 form을 보기 좋게 만드는 작은 트릭 */}
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer  bg-center bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        {/* 유저가 이미지를 업로드 할 떄 form을 보기 좋게 만드는 작은 트릭 */}

        <Input name="title" required placeholder="제목" type="text" />

        <Input name="description" required placeholder="본문" type="text" />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
