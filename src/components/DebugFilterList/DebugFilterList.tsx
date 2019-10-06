import React, { useCallback } from "react";

import tw from "tailwind.macro";

import Switch from "../../components/Switch";

import debugFactory, { debugInstances, DebugData } from "../../debug";
const debug = debugFactory.extend("components").extend("DebugFilterList");

const LabelContainer = tw.label`md:w-2/3 flex items-center font-bold`;
const LabelText = tw.span`text-sm`;

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
      debug("setting", instance.namespace, e);

      const newFilter = [...(debugFilter || [])];

      if (e) newFilter.push(instance.debugFlag);
      else newFilter.splice(newFilter.indexOf(instance.debugFlag), 1);

      onChange(newFilter);
    },
    [onChange, debugFilter]
  );

  return (
    <>
      {debugInstances.map((instance: DebugData, idx: number) => (
        <>
          <LabelContainer key={idx}>
            <Switch
              checked={debugFilter.includes(instance.debugFlag)}
              onChange={e => onCheck(e, instance)}
            />
            <LabelText>{instance.namespace}</LabelText>
          </LabelContainer>
          {instance.description}
        </>
      ))}
    </>
  );
};

export default DebugFilterList;
