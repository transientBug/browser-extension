import React, { ReactChild } from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";
import { css } from "emotion/macro";

type ChildSlots = {
  title?: ReactChild;
  message: ReactChild;
};

type Props = {
  children: ReactChild | ChildSlots;
};

const isObject = <T extends object>(value: any): value is T =>
  typeof value === "object" &&
  typeof value !== "function" &&
  typeof value !== undefined;

const isSlotted = <T extends {}>(children: any): children is T =>
  isObject(children) && "message" in children;

const Bold = styled.p`
  ${tw`font-bold`}
`;

const AlertContainer: React.FC = ({ children }) => (
  <div
    role="alert"
    className={css`
      ${tw`bg-red-100 border-l-4 border-red-500 text-red-700 p-4`}
    `}
  >
    {children}
  </div>
);

const Alert: React.FC<Props> = ({ children }) => {
  if (!isSlotted<ChildSlots>(children))
    return <AlertContainer>{children}</AlertContainer>;

  const { title, message } = children;

  return (
    <AlertContainer>
      {title ? <Bold>{title}</Bold> : ""}
      {message}
    </AlertContainer>
  );
};

export default Alert;
