import React from "react";
export default function Profile({ picture, name, mail }, options) {
  return (
    <div className="p-3 bg-cyan-700">
      <img
        src={picture ? "picture" : "placeholderProfile"}
        alt="profile"
        className="p-5 bg-red-950"
      />
    </div>
  );
}
