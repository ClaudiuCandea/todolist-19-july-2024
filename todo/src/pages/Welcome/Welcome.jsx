import React, { useState } from "react";
import { getData } from "./quotableAPI";
import Lottie from "react-lottie";
import tree from "./tree.json";
import Navbar from "../../components/Navbar";

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

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData = async () => {
    try {
      const { content, author } = await getData();
      delay(10000000);
      setQuoteText(content);
      setQuoteAuth(author);
      //console.log(`Quote: ${content} - Author: ${author}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (quoteAuth === "" && quoteText === "") fetchData();

  return (
    <div id="container" className=" flex flex-col h-screen gap-0">
      <Navbar
        anchorList={[
          { text: "Home", ref: ".", style: "bg-red-500" },
          { text: "Gallery", ref: ".", style: "" },
          { text: "Contact", ref: ".", style: "" },
        ]}
      />
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
        {quoteText === "" && quoteAuth === "" ? (
          <div class="flex justify-center items-center">
            <img
              class="h-14 w-14"
              src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
              alt=""
            ></img>
          </div>
        ) : (
          <text id="big-title" className=" text-justify">
            {quoteText} - {quoteAuth}
          </text>
        )}
      </div>
    </div>
  );
}

export default Welcome;
