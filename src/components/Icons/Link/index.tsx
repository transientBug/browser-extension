import tw from "tailwind.macro";

import { ReactComponent as LinkSVG } from "./link.svg";

const LinkIcon = tw(LinkSVG)`
  fill-current inline-block h-4 w-4
`;

export default LinkIcon;
