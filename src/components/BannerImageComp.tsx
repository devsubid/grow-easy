"use client";

import {
  BannerCanvasProps,
  ButtonProps,
  ImageProps,
  LinearGradientProps,
  TextArrProps,
} from "@/types/banner";
import React, { FC } from "react";
import { Stage, Layer } from "react-konva";
import BannerImage from "./BannerImage";
import BannerLinearGradient from "./BannerLinearGradient";
import BannerText from "./BannerText";
import BannerButton from "./BannerButton";

const BannerImageComp: FC<
  BannerCanvasProps & {
    aspectRatio: string;
  }
> = ({ elements, width, height, aspectRatio }) => {
  return (
    <Stage
      width={width}
      height={height}
      style={{
        aspectRatio,
      }}
    >
      <Layer>
        {elements.map((element, index) => {
          if (element.type === "linearGradient") {
            return (
              <BannerLinearGradient
                key={index}
                element={element as LinearGradientProps}
              />
            );
          }

          if (element.type === "textArr") {
            return <BannerText key={index} element={element as TextArrProps} />;
          }

          if (element.type === "button") {
            return (
              <BannerButton key={index} element={element as ButtonProps} />
            );
          }

          if (element.type === "image") {
            return <BannerImage key={index} element={element as ImageProps} />;
          }

          return null;
        })}
      </Layer>
    </Stage>
  );
};

export default BannerImageComp;
