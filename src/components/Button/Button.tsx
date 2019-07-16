import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";

const Button = tw.button`
  bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 my-1 border border-gray-400 rounded
`;

const FittedButton = styled(Button)`
  width: max-content;
`;

export default Button;
export { FittedButton };
