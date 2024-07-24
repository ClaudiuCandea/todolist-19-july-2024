import React from "react";
import Lottie from "react-lottie";
import tree from "./tree.json";
import Navbar from "../../components/Navbar";
import { toast } from "react-hot-toast";
import { useQuote } from "../../services/Utilitare/hooks";

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
  const { data, isLoading, error } = useQuote();
  error && toast.error(error);

  const mokRoutes = [
    { text: "Home", ref: ".", style: "" },
    { text: "Gallery", ref: ".", style: "" },
    { text: "Contact", ref: ".", style: "" },
  ];

  return (
    <div id="container" className=" flex flex-col h-screen gap-0">
      <Navbar anchorList={mokRoutes} />
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
        {isLoading ? (
          <div class="flex justify-center items-center">
            <img
              class="h-14 w-14"
              src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
              alt=""
            ></img>
          </div>
        ) : (
          <text id="big-title" className=" text-justify">
            {data.content} - {data.author}
          </text>
        )}
      </div>
    </div>
  );
}

export default Welcome;
