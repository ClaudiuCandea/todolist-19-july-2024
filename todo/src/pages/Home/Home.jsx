import React, { useMemo } from "react";
import Lottie from "react-lottie";
import tree from "../../utilitare/tree.json";
import Navbar from "../../components/Navbar";
import { toast } from "react-hot-toast";
import { useQuote } from "../../utilitare/hooks";
import { routesCfg } from "../../routes/routes";
import { ReactComponent as Loading } from "../../utilitare/loading.svg";

function Home() {
  const routes = useMemo(() => {
    return routesCfg;
  }, []);

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
      <Navbar
        anchorList={routes}
        buttons={[
          {
            text: "LogOut",
            handleClick: () => {
              localStorage.removeItem("isAuthenticated");
              localStorage.removeItem("profile");
              window.location.reload();
            },
            style: "hover:bg-red-300 bg-red-600 rounded-xl p-2 dark:text-white",
          },
        ]}
      />
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
