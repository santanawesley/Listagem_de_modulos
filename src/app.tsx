import React, { useState, useEffect } from "react";
import getModules from "./api/api";
import { Module, SubModule } from "../types/apiTypes";
import { Footer, Header } from "./components";

interface ModulesActive {
  Descricao: string;
  id: number;
}

const App: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [modulesActive, setModulesActive] = useState<ModulesActive>(
    {} as ModulesActive
  );
  const [subModules, setSubModules] = useState<SubModule[]>([]);
  const [errorDataModules, setErrorDataModules] = useState<Boolean>(false);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const url =
      "https://j71yi4eoc6.execute-api.sa-east-1.amazonaws.com/dev/impostograma/desafio/listarModulos";
    const authorization = "RRwPrJsGdiwdWZ1CZj9srRtCdQ99LPeg";

    try {
      const { body } = await getModules(url, authorization);
      setModules(body);
      setModulesActive({ Descricao: body[0].Descricao, id: body[0].id });
      setSubModules(body[0].subModulos);
    } catch (error) {
      console.error("Erro ao buscar os módulos:", error);
      setErrorDataModules(true);
    }
  };

  const selectModules = (module: Module) => {
    setModulesActive({ Descricao: module.Descricao, id: module.id });
    setSubModules(module.subModulos ? module.subModulos : []);
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col text-zinc-600">
      <Header />
      {errorDataModules ? (
        <div className="flex grow justify-center">
          <p className="pt-24 px-3 font-bold text-center text-sm sm:text-xl">
            Não foi possível acessar as informações de Módulos e Submódulos no
            momento. <br />
            Tente mais tarde ou entre em contato conosco.
          </p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row grow gap-6 px-5 pb-4 sm:pb-0">
          <nav
            className={
              modulesActive.id
                ? "transition-opacity duration-500 opacity-100"
                : "opacity-0"
            }
          >
            <p className="text-2xl pt-7 pr-1 pb-5 pl-0">Módulos:</p>
            <ul className="gap-2 sm:gap-3 ml-1 flex flex-wrap sm:flex-col">
              {modules.map((module) => (
                <li key={module.id} className="sm:w-56 flex">
                  <div className="z-10 w-full">
                    <button
                      onClick={() => selectModules(module)}
                      className={`w-full rounded py-3 px-4 flex ${
                        module.id === modulesActive.id
                          ? "bg-lime-600 text-white cursor-auto"
                          : "bg-lime-400 text-zinc-600 hover:bg-lime-500 relative -top-1 -left-1 py-2.5 px-5 transition-all before:absolute before:top-1 before:left-1 before:-z-[1] before:rounded before:h-full before:w-full before:border-2 before:border-lime-400 before:transition-all before:content-[''] hover:top-0 hover:left-0 before:hover:top-0 before:hover:left-0"
                      }`}
                    >
                      <strong>{module.Descricao}</strong>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          <main
            className={`grow ${
              modulesActive.id
                ? "transition-opacity duration-500 opacity-100"
                : "opacity-0"
            }`}
          >
            <h2
              className={`text-center p-6 text-3xl sm:text-4xl font-medium mb-0 sm:mb-4 text-zinc-600
            transition-transform duration-1000 ${
              modulesActive.id
                ? "transform translate-x-0"
                : "transform translate-x-full"
            }`}
            >
              Submódulos de{" "}
              <span className="text-lime-600">{modulesActive.Descricao}</span>
            </h2>
            <ul className="flex flex-wrap gap-3 gap-y-4 sm:gap-y-9 justify-center">
              {subModules.map((submodule) => (
                <li
                  key={submodule.id}
                  className="flex justify-center items-center text-center font-bold text-lg sm:text-xl shadow hover:shadow-lg bg-gradient-to-tr from-green-500 to-white w-52 p-8 rounded"
                >
                  {submodule.Descricao}
                </li>
              ))}
            </ul>
          </main>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
