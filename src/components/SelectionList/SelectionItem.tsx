import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";

const ListSelectorItem = styled.li`
  ${tw`relative -mb-px block border p-4 border-gray hover:bg-gray-100 hover:cursor-pointer`}

  :first-child {
    ${tw`rounded-t`}
  }

  :last-child {
    ${tw`rounded-b`}
  }
`;

export default ListSelectorItem;
