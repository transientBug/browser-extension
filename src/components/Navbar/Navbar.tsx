import React, { ReactNode } from "react";

import tw from "tailwind.macro";

import logo from "./bug_logo.png";

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

interface NavbarProps {
  children?: {
    left?: ReactNode;
    right?: ReactNode;
  };
}

const Navbar: React.FC<NavbarProps> = ({ children }) => (
  <Nav>
    <NavHeader>
      <NavLogo src={logo} alt="transientBug logo" />
      <NavTitle>transientBug</NavTitle>
    </NavHeader>
    <NavItems>
      <NavLeft>{children && children.left}</NavLeft>
      <NavRight>{children && children.right}</NavRight>
    </NavItems>
  </Nav>
);

export default Navbar;
export { NavButton };
