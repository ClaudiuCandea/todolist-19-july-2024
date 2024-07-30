import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Profile({ picture, name, mail }) {
  const [isClicked, setIsClicked] = useState(false);
  const [darkmodeMok, setDarkmodeMok] = useState(false);

  return (
    <div
      id="wrap-component"
      className=" relative flex flex-row bg-gray-200 rounded-full gap-x-3 p-1 place-items-center"
    >
      <img
        src={picture ? picture : ""}
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
        <div className="absolute right-0 top-full mt-2 bg-white rounded-md p-3 flex flex-col place-items-center gap-y-1">
          <div className="flex flex-row">
            <img
              src={picture ? picture : ""}
              alt="Profile picture"
              className="bg-red-600 rounded-full w-24 h-24"
            ></img>
            <div className="flex flex-col overflow-hidden">
              <text className="p-1">{name ? name : "Placeholder name"}</text>

              <text className="p-1 hover:animate-rightToLeft">
                {mail ? mail : "Placeholder mail"}
              </text>
            </div>
          </div>

          <button className=" flex place-items-center justify-center bg-gray-100 rounded-md p-2 gap-2 w-full">
            <CiLogout size={32} /> <p>Deconectează-te</p>
          </button>

          <button
            className=" flex place-items-center justify-center bg-gray-100 rounded-md p-2 gap-2 w-full"
            onClick={() => setDarkmodeMok(!darkmodeMok)}
          >
            Style:{" "}
            {darkmodeMok ? <MdDarkMode size={24} /> : <MdLightMode size={24} />}
          </button>
        </div>
      )}
    </div>
  );
}
