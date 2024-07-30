import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({
  wrapperStyle,
  navStyle,
  anchorList,
  buttons,
}) {
  return (
    <div id="nav-wrapper" className={wrapperStyle ? wrapperStyle : ""}>
      <nav className={navStyle ? navStyle : "flex justify-end p-2 gap-x-2 dark:bg-gray-800 bg-zinc-300"}>
        {anchorList &&
          anchorList.map(({ text, ref, style }, index) => {
            return (
              <Link
                key={index}
                className={style ? style : "hover:bg-gray-400 dark:hover:bg-gray-700 dark:bg-gray-800 rounded-xl p-2 dark:text-white"}
                to={ref}
              >
                {text}
              </Link>
            );
          })}
        {buttons &&
          buttons.map(({ text, handleClick, style }, index) => {
            return (
              <button
                key={index}
                onClick={handleClick}
                className={style ? style : "hover:bg-gray-300 rounded-xl p-2 "}
              >
                {text}
              </button>
            );
          })}
      </nav>
    </div>
  );
}
