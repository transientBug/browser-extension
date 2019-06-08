import React from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";
import { css } from "emotion/macro";

import debug from "debug";

declare module "debug" {
  interface Debug {
    instances: any;
  }
}

const Form = styled.form`
  ${tw`mb-4`}
`;

const Fieldset = styled.fieldset`
  ${tw`mb-4`}
`;

const Legend = styled.legend`
  ${tw`block text-gray-700 text-sm font-bold mb-2`}
`;

const DevOptionsForm = () => (
  <Form>
    <Fieldset>
      <Legend>Debug Settings</Legend>

      {debug.instances.map((instance: any, idx: number) => (
        <label
          className={css`
            ${tw`md:w-2/3 block text-gray-500 font-bold`}
          `}
          key={idx}
        >
          <input
            className={css`
              ${tw`mr-2 leading-tight`}
            `}
            type="checkbox"
          />
          <span
            className={css`
              ${tw`text-sm`}
            `}
          >
            {instance.namespace}
          </span>
        </label>
      ))}
    </Fieldset>
  </Form>
);

export default DevOptionsForm;
