type TextElement = {
  variableName: string;
  textAlign: "left" | "center" | "right";
  fontSize: number;
  value: string;
  fontWeight: number;
  fontColor: string;
};

type TextArrProps = {
  container: {
    x: number;
    width: number;
    y: number;
    height: number;
  };
  texts: TextElement[];
  zIndex: number;
};

type ButtonProps = {
  container: {
    x: number;
    width: number;
    y: number;
    height: number;
  };
  textProps: {
    variableName: string;
    fontSize: number;
    value: string;
    fontWeight: number;
    fontColor: string;
  };
  buttonProps: {
    paddingX: number;
    backgroundColor: string;
    variableName: string;
    borderRadius: number;
    align: "left" | "center" | "right";
  };
  zIndex: number;
};

type ImageProps = {
  container: {
    x: number;
    width: number;
    y: number;
    height: number;
  };
  imageProps: {
    borderColor: string;
    variableName: string;
    borderRadius: number;
    borderWidth: number;
    url: string;
  };
  zIndex: number;
};

type LinearGradientProps = {
  container: {
    width: number;
    x: number;
    y: number;
    height: number;
  };
  zIndex: number;
  gradientProps: {
    variableName: string;
    colors: [string, string];
  };
};

type BannerCanvasProps = {
  size: string;
  minVersionCode: number;
  width: number;
  height: number;
  id: string;
  elements: ((LinearGradientProps | TextArrProps | ButtonProps | ImageProps) & {
    type: string;
  })[];
};

export {
  TextArrProps,
  ButtonProps,
  ImageProps,
  LinearGradientProps,
  BannerCanvasProps,
};
