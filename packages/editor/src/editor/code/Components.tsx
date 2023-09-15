import React, { useEffect } from "react";
import { Enable, Resizable, ResizeCallback } from "re-resizable";

export interface TitleOfPaneProps {
  children: React.ReactNode;
}
export const DynamicResize: React.FunctionComponent<{
  width: number | string;
  resizeCallback: ResizeCallback;
  disabledClass?: string;
  maxWidth?: string | number;
  minWidth?: string | number;
  enable?: Enable;
  children?: React.ReactNode;
}> = ({
  children,
  width,
  resizeCallback,
  disabledClass,
  maxWidth = "94%",
  minWidth = "90",
  enable,
}) => {
  const ref = React.createRef<Resizable>();

  if (disabledClass) {
    return <div className={disabledClass}>{children}</div>;
  }

  const enableObj = {
    left: enable?.left ? enable.left : false,
    right: enable?.right ? enable.right : false,
  };
  useEffect(() => {
    if (width !== ref.current?.state.width) {
      ref.current?.setState({
        width,
      });
    }
  }, [width]);

  return (
    <Resizable
      defaultSize={{
        width,
        height: "100%",
      }}
      ref={ref}
      style={{
        display: "flex",
        flexFlow: "row nowrap",
        zIndex: 3,
      }}
      onResize={resizeCallback}
      maxWidth={maxWidth}
      minWidth={minWidth}
      enable={enableObj}
    >
      {children}
    </Resizable>
  );
};
