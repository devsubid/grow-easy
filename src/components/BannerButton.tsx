import { ButtonProps } from "@/types/banner";
import React from "react";
import { Group, Rect, Text } from "react-konva";

const BannerButton = ({ element }: { element: ButtonProps }) => {
  return (
    <Group x={element.container.x} y={element.container.y}>
      <Rect
        width={element.container.width}
        height={element.container.height}
        fill={(element as ButtonProps).buttonProps.backgroundColor}
        cornerRadius={(element as ButtonProps).buttonProps.borderRadius}
      />
      <Text
        text={(element as ButtonProps).textProps.value}
        fontSize={(element as ButtonProps).textProps.fontSize}
        fontWeight={(element as ButtonProps).textProps.fontWeight}
        fill={(element as ButtonProps).textProps.fontColor}
        align={(element as ButtonProps).buttonProps.align}
        width={(element as ButtonProps).container.width}
        height={(element as ButtonProps).container.height}
        x={(element as ButtonProps).buttonProps.paddingX}
        y={
          ((element as ButtonProps).container.height -
            (element as ButtonProps).textProps.fontSize) /
          2
        }
      />
    </Group>
  );
};

export default BannerButton;
