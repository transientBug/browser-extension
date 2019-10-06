import React from "react";

import tw from "tailwind.macro";
import { css } from "emotion/macro";

const baseSwitch = css`
  ${tw`m-1 border rounded-full border-grey inline-flex items-center cursor-pointer w-12`}
`;

const off = css`
  ${tw`justify-start`}
`;

const on = css`
  ${tw`bg-green-500 justify-end`}
`;

const SwitchCenter = tw.span`rounded-full border w-6 h-6 border-grey shadow-inner bg-white shadow`;

interface SwitchProps {
  checked?: boolean;
  onChange?: (state: boolean) => any;
}

const Switch: React.FC<SwitchProps> = ({ checked = false, onChange }) => (
  <span
    className={[baseSwitch, checked ? on : off].join(" ")}
    onClick={() => onChange && onChange(!checked)}
  >
    <SwitchCenter />
  </span>
);

export default Switch;
