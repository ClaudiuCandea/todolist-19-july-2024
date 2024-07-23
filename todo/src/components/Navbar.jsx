import React from "react";

// wrapperStyle - style for the wrapper itself,      default : ""
// navStyle,    - style for the navbar itself,       default : "flex justify-end p-2 gap-x-2"
// anchorStye,  - default style for all the anchors, default : "hover:bg-gray-300 rounded-xl p-2"
// anchorList,  - [ text, ref, style ]

const defaultNavStyle = "flex justify-end p-2 gap-x-2";
const defaultAnchorStyle = "hover:bg-gray-300 rounded-xl p-2";

export default function Navbar({ wrapperStyle, navStyle, anchorList }) {
  console.log(anchorList);
  return (
    <div
      id="nav-wrapper"
      className={wrapperStyle ? wrapperStyle : defaultNavStyle}
    >
      <nav className={navStyle ? navStyle : defaultNavStyle}>
        {!anchorList ? (
          <></>
        ) : (
          <>
            {anchorList.map(({ text, ref, style }, index) => {
              return (
                <a
                  key={index}
                  className={style ? style : defaultAnchorStyle}
                  ref={{ ref }}
                >
                  {text}
                </a>
              );
            })}
          </>
        )}
      </nav>
    </div>
  );
}
