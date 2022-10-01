import React, { useContext, useState } from "react";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { urls } from "../../constants";
import ConnectWallet from "../wallet/ConnectWallet";

const navLinks = [
  {
    title: "Wallet",
    link: urls.wallet,
  },
  {
    title: "NFTs",
    link: urls.nfts,
  },
  {
    title: "Analytics",
    link: urls.Analytics,
  },
];

export default function Navbar() {
  const location = useLocation();

  const [isMobileNavOpen, setisMobileNavOpen] = useState(false); // For toggling the mobile nav
  return (
    <div>
      <div className="flex flex-wrap sys-app-notCollapsed ">
        <div className="w-full ">
          <div className="pb-0 py-2 px-2 mx-auto ">
            <div className="w-full flex justify-between items-center p-2 text-gray-900 bg-white rounded-lg shadow-lg font-medium capitalize">
              {/* Logo */}
              <div>
                <span className="px-2 mr-2 md:border-r border-gray-800">
                  {/* <Logo /> */}
                </span>
              </div>
              <div className="px-2 md:flex gap-x-5 items-center justify-center flex-1 text-gray-900 bg-white font-medium capitalize hidden">
                {/* Links */}
                {navLinks?.map(({ title, link, icon }, id) => (
                  <Link
                    key={id}
                    to={link}
                    className={`px-2 py-1 flex items-center rounded-xl cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm ${
                      location.pathname == link
                        ? "text-gray-700 bg-gray-200 font-semibold"
                        : ""
                    }`}
                  >
                    <p>
                      <span className="p-2 bg-gray-200 rounded-full">
                        {icon}
                      </span>
                      <span className="mx-1">{title}</span>
                    </p>
                  </Link>
                ))}
              </div>

              {/* After all nav links if you want any button in right then it will come here */}
              <div className="md:flex items-center gap-x-2 hidden">
                <ConnectWallet />
              </div>

              {/* Hamberger Menu  */}
              <div className="md:hidden transition-all mr-3 my-3 cursor-pointer hover:text-gray-700">
                {isMobileNavOpen ? (
                  <AiOutlineMenuFold
                    onClick={() => setisMobileNavOpen(false)}
                    className="rounded text-2xl"
                  />
                ) : (
                  <AiOutlineMenuUnfold
                    onClick={() => setisMobileNavOpen(true)}
                    className="rounded text-2xl"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navbar */}
          <div
            id="navbar"
            className={`pt-0 absolute top-2 z-50 mx-auto ${
              isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
            } transition-all flex-wrap md:hidden`}
          >
            <div className="py-[.5px] w-64">
              <div className="w-full py-4 space-y-6 px-2 text-gray-900 bg-white rounded-lg min-h-screen  text-left capitalize font-medium shadow-lg">
                {/* Logo */}
                {/* <Logo /> */}

                {/* Links */}
                {navLinks?.map(({ title, link, icon }, id) => (
                  <Link
                    key={id}
                    to={link}
                    className={`px-2 flex items-center cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm rounded ${
                      location.pathname == link
                        ? "text-gray-700 font-semibold"
                        : ""
                    }`}
                  >
                    <span className="p-2 bg-gray-200 rounded-full">{icon}</span>
                    <span className="mx-1">{title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
