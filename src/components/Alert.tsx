import React, { ReactChild } from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";
import { css } from "emotion/macro";

const isObject = <T extends object>(value: any): value is T =>
  typeof value === "object" &&
  typeof value !== "function" &&
  typeof value !== undefined;

const isSlotted = <T extends {}>(children: any): children is T =>
  isObject(children) && "message" in children;

const base = css`
  ${tw`border-l-4 p-4`}
`;

const red = css`
  ${tw`bg-red-100 border-red-500 text-red-700`}
  ${base}
`;

const yellow = css`
  ${tw`bg-yellow-100 border-yellow-500 text-yellow-700`}
  ${base}
`;

const blue = css`
  ${tw`bg-blue-100 border-blue-500 text-blue-700`}
  ${base}
`;

const Bold = styled.p`
  ${tw`font-bold`}
`;

type ChildSlots = {
  title?: ReactChild;
  message: ReactChild;
};

type Props = {
  children: ReactChild | ChildSlots;
  color?: "red" | "blue" | "yellow";
};

// TODO: There is a better way to handle this color changing with emotion and friends
// It'd be nice to have it a lot more configurable
const Alert: React.FC<Props> = ({ children, color }) => {
  let colorClassname;
  switch (color) {
    case "red":
      colorClassname = red;
      break;
    case "yellow":
      colorClassname = yellow;
      break;
    default:
      colorClassname = blue;
  }

  if (!isSlotted<ChildSlots>(children))
    return (
      <div role="alert" className={colorClassname}>
        {children}
      </div>
    );

  const { title, message } = children;

  return (
    <div role="alert" className={colorClassname}>
      {title ? <Bold>{title}</Bold> : ""}
      {message}
    </div>
  );
};

export default Alert;
