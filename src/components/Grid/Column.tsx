import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";

const Column = styled.div`
  ${tw`flex-1`}

  :not(:first-child),
  :not(:last-child) {
    ${tw`px-1`}
  }

  :first-child {
    ${tw`pr-1`}
  }

  :last-child {
    ${tw`pl-1`}
  }
`;

export default Column;
