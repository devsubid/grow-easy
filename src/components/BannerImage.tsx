import { ImageProps } from "@/types/banner";
import React, { FC } from "react";
import useImage from "use-image";
import { Image as KonvaImage } from "react-konva";

const BannerImage: FC<{ element: ImageProps }> = ({ element }) => {
  const [image] = useImage((element as ImageProps).imageProps.url);
  image && (image.crossOrigin = "Anonymous");
  return (
    <KonvaImage
      x={(element as ImageProps).container.x}
      y={(element as ImageProps).container.y}
      width={(element as ImageProps).container.width}
      height={(element as ImageProps).container.height}
      image={image}
      stroke={(element as ImageProps).imageProps.borderColor}
      strokeWidth={(element as ImageProps).imageProps.borderWidth}
      cornerRadius={(element as ImageProps).imageProps.borderRadius}
    />
  );
};

export default BannerImage;
