import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import getModules from "./api/api";

const container = document.getElementById("root");

const App = () => {
  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const url =
      "https://j71yi4eoc6.execute-api.sa-east-1.amazonaws.com/dev/impostograma/desafio/listarModulos";
    const authorization = "RRwPrJsGdiwdWZ1CZj9srRtCdQ99LPeg";

    try {
      const response = await getModules(url, authorization);
      console.log(response.body);
    } catch (error) {
      console.error("Erro ao buscar os módulos:", error);
    }
  };

  return <h1>IT Works - Módulos e Submódulos</h1>;
};

const root = createRoot(container);
root.render(<App />);
