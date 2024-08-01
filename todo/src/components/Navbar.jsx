import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({
  wrapperStyle,
  navStyle,
  anchorList,
  profileComponent,
}) {
  return (
    <nav
      className={
        navStyle
          ? navStyle
          : " relative flex justify-end p-1 gap-x-3 justify-items-center place-items-center dark:bg-gray-800 bg-zinc-300"
      }
    >
      {anchorList &&
        anchorList.map(({ text, ref, style }, index) => {
          return (
            <Link
              key={index}
              className={
                style
                  ? style
                  : "hover:bg-gray-400 dark:hover:bg-gray-700 dark:bg-gray-800 rounded-xl p-1 dark:text-white"
              }
              to={ref}
            >
              {text}
            </Link>
          );
        })}
      {profileComponent}
    </nav>
  );
}
