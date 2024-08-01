import React, { useMemo } from "react";
import Lottie from "react-lottie";
import tree from "../../utils/tree.json";
import { toast } from "react-hot-toast";
import { useQuote } from "../../Hooks/useQuote";
import { ReactComponent as Loading } from "../../utils/loading.svg";

function Home() {
  const defaultOptions = useMemo(() => {
    return {
      animationData: tree,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
      loop: false,
      autoplay: true,
      renderer: "svg",
    };
  }, []);

  const { data, isLoading, error } = useQuote();
  error && toast.error(error);

  return (
    <div id="container" className=" flex flex-col h-screen gap-0 ">
      <div
        id="lottie"
        className=" flex flex-col h-screen w-screen bg-cyan-900  "
      >
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
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col w-1/2">
            <p id="big-title" className=" text-center">
              {data.content}
            </p>
            <p className="place-self-end">~{data.author}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
