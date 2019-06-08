import React from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";
import { keyframes } from "emotion/macro";

const DotContainer = styled.div`
  width: 3em;
  height: 3em;

  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);

  justify-items: center;
  align-items: center;

  & > div:nth-of-type(2),
  & > div:nth-of-type(4) {
    animation-delay: 0.25s;
  }

  & > div:nth-of-type(3),
  & > div:nth-of-type(5),
  & > div:nth-of-type(7) {
    animation-delay: 0.5s;
  }

  & > div:nth-of-type(6),
  & > div:nth-of-type(8) {
    animation-delay: 0.75s;
  }

  & > div:nth-of-type(9) {
    animation-delay: 1s;
  }
`;

const fadeAnimation = keyframes`
  to {
    opacity: 0.2;
  }
`;

const Dot = styled.div`
  ${tw`bg-green-500`}

  width: 0.5em;
  height: 0.5em;

  border-radius: 50%;

  animation: ${fadeAnimation} 1.5s alternate ease-in-out infinite;
`;

const Loader: React.FC = () => (
  <DotContainer>
    {[...Array(9)].map((_, i) => (
      <Dot key={i} />
    ))}
  </DotContainer>
);

export default Loader;
