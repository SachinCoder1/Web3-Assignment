import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import Navbar from "../navbar/Navbar";

export default function MainLayout({ addPM=true, children }) {
  return (
    <div className="bg-gray-200 min-h-screen">
      <nav>
        <Navbar />
      </nav>
      <main className={`${addPM && "md:mx-5 px-3 my-5 py-5 md:px-5"}`}>{children}</main>
    </div>
  );
}
