import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";

import user from "../user.png";

export default function Profile({ picture, name, mail }) {
  const [isClicked, setIsClicked] = useState(false);
  const [darkmodeMok, setDarkmodeMok] = useState(false);

  return (
    <div
      id="wrap-component"
      className=" relative flex flex-row bg-pink-500 rounded-full gap-x-3 p-1 place-items-center"
    >
      <img
        src={user}
        alt="Profile picture"
        className="bg-red-600 rounded-full w-9 h-9"
      ></img>

      <label>{name ? name : "Placeholder nume"}</label>

      <button
        className="bg-gray-200 rounded-full m-auto"
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        <RiArrowDropDownLine size={24} />
      </button>
      {isClicked && (
        <div className="absolute right-0 top-full mt-2 w-full bg-white rounded-md p-2">
          <div id="details" className=" flex flex-col place-items-center">
            <img
              src={user}
              alt="Profile picture"
              className="bg-red-600 rounded-full w-20 h-20"
            ></img>
            <text className="p-1">{name ? name : "Placeholder name"}</text>

            <text className="p-1">{mail ? mail : "Placeholder mail"}</text>
          </div>

          <div
            id="options"
            className="border-1 border-black border-solid flex justify-evenly  "
          >
            <button className=" bg-gray-300 rounded-md p-2">
              {" "}
              <CiLogout color="red" size={32} />
            </button>
            <button
              className=" bg-gray-300 rounded-md p-2"
              onClick={() => setDarkmodeMok(!darkmodeMok)}
            >
              Style: {darkmodeMok ? " dark" : " light"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
