/* eslint-disable @next/next/no-img-element */
import {
  BannerCanvasProps,
  ButtonProps,
  ImageProps,
  TextArrProps,
} from "@/types/banner";
import React, { useEffect, useRef, useState } from "react";
import BannerImageComp from "./BannerImageComp";
import CloseIcon from "@/icons/close";
import UploadIcon from "@/icons/upload";
import axios from "axios";

type EditBannerTemplateBsProps = BannerCanvasProps & {
  aspectRatio: string;
  isOpen: boolean;
  onClose: () => void;
};

type ImageType = {
  [key: string]: string;
};

const getTitleFromBannerElements = ({
  elements,
}: Pick<BannerCanvasProps, "elements">) => {
  return (
    elements.find((el) => el.type === "textArr") as TextArrProps
  )?.texts.find(({ variableName }) => variableName === "CREATIVE_TITLE_TEXT")
    ?.value;
};

const getDescFromBannerElements = ({
  elements,
}: Pick<BannerCanvasProps, "elements">) => {
  return (
    elements.find((el) => el.type === "textArr") as TextArrProps
  )?.texts.find(({ variableName }) => variableName === "CALL_OUT_TEXT")?.value;
};

const getButtonFromBannerElements = ({
  elements,
}: Pick<BannerCanvasProps, "elements">) => {
  return (elements.find((el) => el.type === "button") as ButtonProps)?.textProps
    .value;
};

const EditBannerTemplateBs: React.FC<EditBannerTemplateBsProps> = ({
  isOpen,
  aspectRatio,
  onClose,
  ...bannerProps
}) => {
  const [banner, setBanner] = useState(bannerProps);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageType[]>([]);
  const onGenerate = async () => {
    const res = await axios.get<{ images: ImageType[] }>("/db.json");
    setImages(res.data.images);
  };

  useEffect(() => {
    onGenerate();
  }, []);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
      onClose();
    }
  }, [isOpen, onClose]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBanner({
      ...banner,
      elements: banner.elements.map((el) => {
        if (el.type === "textArr") {
          return {
            ...el,
            texts: (el as TextArrProps).texts.map((text) => {
              if (text.variableName === "CREATIVE_TITLE_TEXT") {
                return {
                  ...text,
                  value,
                };
              }
              return text;
            }),
          };
        }
        return el;
      }),
    });
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBanner({
      ...banner,
      elements: banner.elements.map((el) => {
        if (el.type === "textArr") {
          return {
            ...el,
            texts: (el as TextArrProps).texts.map((text) => {
              if (text.variableName === "CALL_OUT_TEXT") {
                return {
                  ...text,
                  value,
                };
              }
              return text;
            }),
          };
        }
        return el;
      }),
    });
  };

  const handleCTAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBanner({
      ...banner,
      elements: banner.elements.map((el) => {
        if (el.type === "button") {
          return {
            ...el,
            textProps: {
              ...(el as ButtonProps).textProps,
              value,
            },
          };
        }
        return el;
      }),
    });
  };

  const handleImageChange = ({
    event,
    url,
  }: {
    event?: React.ChangeEvent<HTMLInputElement>;
    url?: string;
  }) => {
    event?.preventDefault();
    const file = event?.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBanner({
          ...banner,
          elements: banner.elements.map((el) => {
            if (
              el.type === "image" &&
              (el as ImageProps).imageProps.variableName === "CREATIVE_IMAGE"
            ) {
              return {
                ...el,
                imageProps: {
                  ...(el as ImageProps).imageProps,
                  url: reader.result as string,
                },
              };
            }
            return el;
          }),
        });
      };
      reader.readAsDataURL(file);
    } else {
      setBanner({
        ...banner,
        elements: banner.elements.map((el) => {
          if (
            el.type === "image" &&
            (el as ImageProps).imageProps.variableName === "CREATIVE_IMAGE"
          ) {
            return {
              ...el,
              imageProps: {
                ...(el as ImageProps).imageProps,
                url: url!,
              },
            };
          }
          return el;
        }),
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const dialog = dialogRef.current;
    if (!dialog) return;
    const canvas = dialog.querySelector("canvas");
    if (!canvas) return;
    const uri = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isCTA = !!banner.elements.find((el) => el.type === "button");

  const isDesc = !!banner.elements.find(
    (el) =>
      el.type === "textArr" &&
      (el as TextArrProps).texts.find(
        ({ variableName }) => variableName === "CALL_OUT_TEXT"
      )
  );

  const isTitle =
    !!banner.elements &&
    !!banner.elements.find(
      (el) =>
        el.type === "textArr" &&
        (el as TextArrProps).texts.find(
          ({ variableName }) => variableName === "CREATIVE_TITLE_TEXT"
        )
    );
  return (
    <dialog
      className="bg-white space-y-4 rounded"
      style={{
        width: "min(40rem, 90%)",
      }}
      ref={dialogRef}
    >
      <header className="flex justify-between px-4 py-3">
        <h2>Edit Banner</h2>
        <button
          onClick={() => {
            dialogRef.current?.close();
            onClose();
          }}
        >
          <CloseIcon size="1.5rem" />
        </button>
      </header>
      <div className="w-[70%] mx-auto">
        <BannerImageComp
          {...banner}
          aspectRatio={aspectRatio}
          // ref={canvasRef}
        />
      </div>
      <div className="select-images px-4 space-y-2">
        <label>Images</label>
        <div className="images-container flex gap-2 overflow-auto">
          <div
            onClick={() => inputRef.current?.click()}
            className="upload-image w-fit aspect-square bg-[#f6f5f8] flex justify-center items-center cursor-pointer rounded-full p-4"
          >
            <UploadIcon size="2rem" />
            <input
              onChange={(event) => handleImageChange({ event })}
              ref={inputRef}
              type="file"
              className="hidden"
            />
          </div>
          {images?.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={image.id}
              onClick={() => handleImageChange({ url: image.url })}
              className="w-16 aspect-square rounded-full object-cover cursor-pointer"
            />
          ))}
        </div>
      </div>
      <form className="px-4 space-y-4">
        {isTitle && (
          <div className="title flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input
              className="border px-3 py-2 rounded"
              value={getTitleFromBannerElements({ elements: banner.elements })}
              name="title"
              id="title"
              onChange={handleTitleChange}
              type="text"
              placeholder="Enter a title"
            />
          </div>
        )}
        {isDesc && (
          <div className="description flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <input
              className="border px-3 py-2 rounded"
              value={getDescFromBannerElements({ elements: banner.elements })}
              name="description"
              id="description"
              onChange={handleDescChange}
              type="text"
              placeholder="Enter a description"
            />
          </div>
        )}
        {isCTA && (
          <div className="cta flex flex-col gap-2">
            <label htmlFor="cta">CTA</label>
            <input
              className="border px-3 py-2 rounded"
              value={getButtonFromBannerElements({ elements: banner.elements })}
              name="cta"
              id="cta"
              onChange={handleCTAChange}
              type="text"
              placeholder="Enter a CTA"
            />
          </div>
        )}
        <button
          className="bg-[#294744] py-3 rounded text-white w-full !mb-4"
          onClick={(event) => {
            handleSubmit(event);
            onClose();
          }}
        >
          Save
        </button>
      </form>
    </dialog>
  );
};

export default EditBannerTemplateBs;
