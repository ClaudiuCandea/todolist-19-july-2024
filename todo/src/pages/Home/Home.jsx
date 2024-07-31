import React, { useMemo } from "react";
import Lottie from "react-lottie";
import tree from "../../utilitare/tree.json";
import { toast } from "react-hot-toast";
import { useQuote } from "../../utilitare/hooks";
import { ReactComponent as Loading } from "../../utilitare/loading.svg";

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
    <div id="container" className=" flex flex-col h-screen gap-0">
      <div id="lottie" className=" justify-end w-auto h-auto p-5 dark:bg-gray-900 bg-cyan-800">
        <Lottie options={defaultOptions} height={400} width={400} speed={0.4} />
      </div>

      <div
        id="text-wrapper"
        className="flex flex-col h-full justify-center items-center gap-5 dark:bg-gray-900 bg-zinc-200"
      >
        <text id="big-title" className=" text-8xl dark:text-white">
          WELCOME
        </text>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <text id="big-title" className=" text-justify dark:text-white">
            {data.content} - {data.author}
          </text>
        )}
      </div>
    </div>
  );
}

export default Home;