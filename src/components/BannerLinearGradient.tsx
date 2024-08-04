import { LinearGradientProps } from "@/types/banner";
import { Rect } from "react-konva";

const BannerLinearGradient = ({
  element,
}: {
  element: LinearGradientProps;
}) => {
  return (
    <Rect
      x={element.container.x}
      y={element.container.y}
      width={element.container.width}
      height={element.container.height}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{
        x: element.container.width,
        y: element.container.height,
      }}
      fillLinearGradientColorStops={[
        0,
        (element as LinearGradientProps).gradientProps.colors[0],
        1,
        (element as LinearGradientProps).gradientProps.colors[1],
      ]}
    />
  );
};

export default BannerLinearGradient;
