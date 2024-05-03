import React, { useState, useEffect } from "react";
import getModules from "./api/api";
import { Module, SubModule } from "../types/apiTypes";

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
    }
  };

  const selectModules = (module: Module) => {
    setModulesActive({ Descricao: module.Descricao, id: module.id });
    setSubModules(module.subModulos ? module.subModulos : []);
  };

  return (
    <div className="p-5 bg-slate-100 min-h-screen flex flex-col text-zinc-600">
      <header className="shrink-0">
        <h1 className="text-center">Lista de Módulos</h1>
      </header>
      <div className="flex grow gap-6">
        <nav>
          <p className="text-2xl pt-7 pr-1 pb-5 pl-0">Módulos:</p>
          <ul className="gap-6 flex flex-col">
            {modules.map((module) => (
              <li key={module.id} className="w-56 cursor-pointer">
                <a
                  onClick={() => selectModules(module)}
                  className={`rounded py-2 px-4 flex ${
                    module.id === modulesActive.id
                      ? "bg-lime-600 text-white"
                      : "bg-lime-400 text-zinc-600"
                  }`}
                >
                  <strong>{module.Descricao}</strong>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <main className="grow">
          <h2 className="text-center p-6 text-4xl font-medium mb-4 text-zinc-600">
            Submódulos de{" "}
            <span className="text-lime-600">{modulesActive.Descricao}</span>
          </h2>
          <ul className="flex flex-wrap gap-3 gap-y-9 justify-center">
            {subModules.map((submodule) => (
              <li
                key={submodule.id}
                className="flex justify-center items-center text-center shadow bg-gradient-to-tr from-green-500 to-white w-52 p-8 rounded"
              >
                {submodule.Descricao}
              </li>
            ))}
          </ul>
        </main>
      </div>
      <footer className="shrink-0">
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default App;
