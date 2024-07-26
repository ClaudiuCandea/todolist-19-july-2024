import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({
  wrapperStyle,
  navStyle,
  anchorList,
  profileComponent,
}) {
  console.log(anchorList);
  return (
    <div id="nav-wrapper" className={wrapperStyle ? wrapperStyle : ""}>
      <nav className={navStyle ? navStyle : "flex justify-end p-2 gap-x-2"}>
        {anchorList &&
          anchorList.map(({ text, ref, style }, index) => {
            return (
              <Link
                key={index}
                className={style ? style : "hover:bg-gray-300 rounded-xl p-2"}
                to={ref}
              >
                {text}
              </Link>
            );
          })}
        {profileComponent}
      </nav>
    </div>
  );
}
