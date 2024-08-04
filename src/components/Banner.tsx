"use client";

import React, { FC, useState } from "react";
import BannerImageComp from "./BannerImageComp";
import EditBannerTemplateBs from "./EditBannerTemplateBs";
import EditIcon from "@/icons/edit";
import { BannerCanvasProps } from "@/types/banner";
const getAspectRatio = (size: string) => {
  return size === "square"
    ? "1 / 1"
    : size === "landscape"
    ? "16 / 9"
    : "9 / 16";
};
const Banner: FC<{
  banner: BannerCanvasProps;
  selectOption: string | null;
}> = ({ banner, selectOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <BannerImageComp
        {...banner}
        aspectRatio={getAspectRatio(selectOption ?? "square")}
      />
      <EditBannerTemplateBs
        isOpen={isOpen}
        {...banner}
        aspectRatio={getAspectRatio(selectOption ?? "square")}
        onClose={() => {
          setIsOpen(false);
        }}
      />
      <button
        title="Edit template"
        onClick={() => setIsOpen(true)}
        className="edit absolute right-0 top-0 bg-white shadow p-3 rounded-full m-2"
      >
        <EditIcon size="1.25rem" />
      </button>
    </div>
  );
};

export default Banner;
