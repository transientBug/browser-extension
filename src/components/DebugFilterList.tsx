import React, { useCallback } from "react";

import tw from "tailwind.macro";
import { css } from "emotion/macro";

import debugFactory, { debugInstances, DebugData } from "../debug";
const debug = debugFactory.extend("components").extend("DebugFilterList");

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
