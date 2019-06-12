import React, { useCallback } from "react";

import tw from "tailwind.macro";
// import styled from "@emotion/styled/macro";
import { css } from "emotion/macro";

import debugFactory from "../debug";
const debug = debugFactory.extend("components").extend("DebugFilterList");

export type DebugData = {
  namespace: string;
  description: React.ReactNode;
  debugFlag: string;
};

export const debugInstances: DebugData[] = [
  {
    namespace: "Background Page",
    description: `Includes login and background saving functionality along with post-install setup.`,
    debugFlag: "transientBug:pages:Background*"
  },
  {
    namespace: "Options Page",
    description: `Includes fetching and modifying extension settings and auth functionality (login/logout)`,
    debugFlag: "transientBug:pages:Options*"
  },
  {
    namespace: "Pop-up",
    description: `Includes the page action button and popup, the main functionality of the extension.`,
    debugFlag: "transientBug:pages:Popup*"
  },
  {
    namespace: "transientBug",
    description: (
      <p>
        Enables <b>ALL</b> debug logging in the extension. This can be noisy and
        should be used as a last resort.
      </p>
    ),
    debugFlag: "transientBug*"
  }
];

interface DebugListProps {
  onChange: (debugFilter: string[]) => unknown;
  debugFilter: string[];
}

// TODO: Are checkboxes the best way to display and interact with this?
const DebugFilterList: React.FC<DebugListProps> = ({
  onChange,
  debugFilter = []
}) => {
  const onCheck = useCallback(
    (e, instance) => {
      debug("setting", instance.namespace, e.target.checked);

      const newFilter = [...(debugFilter || [])];

      if (e.target.checked) newFilter.push(instance.debugFlag);
      else newFilter.splice(newFilter.indexOf(instance.debugFlag), 1);

      onChange(newFilter);
    },
    [onChange, debugFilter]
  );

  return (
    <>
      {debugInstances.map((instance: DebugData, idx: number) => (
        <>
          <label
            className={css`
              ${tw`md:w-2/3 block font-bold`}
            `}
            key={idx}
          >
            <input
              className={css`
                ${tw`mr-2 leading-tight`}
              `}
              type="checkbox"
              checked={debugFilter.includes(instance.debugFlag)}
              onChange={e => onCheck(e, instance)}
            />
            <span
              className={css`
                ${tw`text-sm`}
              `}
            >
              {instance.namespace}
            </span>
          </label>
          {instance.description}
        </>
      ))}
    </>
  );
};

export default DebugFilterList;
