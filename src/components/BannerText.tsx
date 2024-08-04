import { TextArrProps } from "@/types/banner";
import React from "react";
import { Group, Text } from "react-konva";

const BannerText = ({ element }: { element: TextArrProps }) => {
  return (
    <Group x={element.container.x} y={element.container.y}>
      {(element as TextArrProps).texts.map((text, textIndex) => (
        <Text
          key={textIndex}
          text={text.value}
          fontSize={text.fontSize}
          fontWeight={text.fontWeight}
          fill={text.fontColor}
          align={text.textAlign}
          width={element.container.width}
          height={element.container.height}
          y={textIndex === 0 ? 0 : (element as TextArrProps).container.height}
        />
      ))}
    </Group>
  );
};

export default BannerText;
