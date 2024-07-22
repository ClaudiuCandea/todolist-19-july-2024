import React, { useState } from "react";
import { getData } from "./quotableAPI";
import Lottie from "react-lottie";
import tree from "./tree.json";

const defaultOptions = {
  animationData: tree,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
  loop: false,
  autoplay: true,
  renderer: "svg",
};

function Welcome() {
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuth, setQuoteAuth] = useState("");
  const fetchData = async () => {
    try {
      const { content, author } = await getData();
      setQuoteText(content);
      setQuoteAuth(author);
      console.log(`Quote: ${content} - Author: ${author}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (quoteAuth === "" && quoteText === "") fetchData();

  return (
    <div id="container" className=" flex flex-col h-screen gap-0">
      <div id="nav-wrapper" className="">
        <nav className="flex justify-end border-double border-b-2 border-black">
          <a className="hover:bg-gray-300 rounded-xl p-2" href="">
            Home
          </a>
          <a className="hover:bg-gray-300 rounded-xl p-2" href="">
            Gallery
          </a>
          <a className="hover:bg-gray-300 rounded-xl p-2" href="">
            Contact
          </a>
        </nav>
      </div>
      <div id="lottie" className=" justify-end w-auto h-auto p-5 bg-cyan-900">
        <Lottie options={defaultOptions} height={400} width={400} speed={0.4} />
      </div>

      <div
        id="text-wrapper"
        className="flex flex-col h-full justify-center items-center gap-5"
      >
        <text id="big-title" className=" text-8xl">
          WELCOME
        </text>
        <text id="big-title" className=" text-justify">
          {quoteText} - {quoteAuth}
        </text>
      </div>
    </div>
  );
}

export default Welcome;
