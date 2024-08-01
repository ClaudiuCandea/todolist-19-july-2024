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
          : "flex justify-end p-1 gap-x-3 justify-items-center place-items-center"
      }
    >
      {anchorList &&
        anchorList.map(({ text, ref, style }, index) => {
          return (
            <Link
              key={index}
              className={style ? style : "hover:bg-gray-300 rounded-xl p-1"}
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
