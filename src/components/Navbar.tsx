import React from "react";

import tw from "tailwind.macro";

import logo from "./bug_logo.png";
import { ReactComponent as LinkSVG } from "./link.svg";
import { ReactComponent as SaveSVG } from "./save-disk.svg";

const Nav = tw.nav`
  flex items-center justify-between flex-wrap bg-gray-700 p-2
`;

const NavLogo = tw.img`
  h-8
`;

const NavHeader = tw.div`
  flex items-center flex-shrink-0 text-white mr-6
`;

const NavTitle = tw.span`
  font-semibold text-xl tracking-tight
`;

const NavItems = tw.div`
  flex flex-grow items-center w-auto
`;

const NavLeft = tw.div`
  text-sm flex-grow
`;

const NavRight = tw.div``;

// const NavLink = tw.a`
//   inline-block mt-0 text-green-500 hover:text-white
// `;

const NavButton = tw.button`
  inline-block text-sm px-4 py-2 mt-0 ml-1 leading-none border rounded text-gray-300 border-gray-300 hover:border-transparent hover:text-green-500 hover:bg-white
`;

const SaveIcon = tw(SaveSVG)`
  fill-current inline-block h-4 w-4
`;

const LinkIcon = tw(LinkSVG)`
  fill-current inline-block h-4 w-4
`;

const Navbar: React.FC = () => (
  <Nav>
    <NavHeader>
      <NavLogo src={logo} alt="transientBug logo" />
      <NavTitle>transientBug</NavTitle>
    </NavHeader>
    <NavItems>
      <NavLeft>
        {/* <NavLink
          href="#responsive-header"
        >
          Docs
        </NavLink> */}
      </NavLeft>
      <NavRight>
        <NavButton color="red">
          <SaveIcon />
        </NavButton>
        <NavButton>
          <LinkIcon />
        </NavButton>
      </NavRight>
    </NavItems>
  </Nav>
);

export default Navbar;
