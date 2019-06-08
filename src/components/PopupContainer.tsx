import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";

const PopupContainer = styled.div`
  ${tw`flex bg-gray-200`}

  /**
   * Inline size works for the internationalization, where it'll be 700 wide in
   * english but 700 tall in japanese, for example.
   *
   * https://drafts.csswg.org/css-logical/#intro
   */

  inline-size: 700px;
  max-inline-size: 700px;

  min-block-size: 400px;
  max-block-size: 400px;
`;

export default PopupContainer;
