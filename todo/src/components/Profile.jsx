import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Profile({ picture, name, mail }, { text, action }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      id="wrap-component"
      className=" relative flex flex-row bg-pink-500 rounded-full gap-x-3"
    >
      <image
        src=""
        alt="Profile picture"
        className="bg-red-600 rounded-full w-12 h-12"
      ></image>
      <button
        className="bg-gray-200 rounded-full m-auto"
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        <RiArrowDropDownLine size={24} />
      </button>
      {isClicked && (
        <div className="absolute right-0 top-full mt-2 w-full bg-white border z-10">
          <button className="block w-full text-left px-4 py-2">A</button>
          <button className="block w-full text-left px-4 py-2">BB</button>
          <button className="block w-full text-left px-4 py-2">AAA</button>
          <button className="block w-full text-left px-4 py-2">bbbb</button>
          <button className="block w-full text-left px-4 py-2">ccccc</button>
        </div>
      )}
    </div>
  );
}
