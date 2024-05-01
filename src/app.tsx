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
      setModulesActive({ Descricao: body[1].Descricao, id: body[1].id });
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
    <>
      <header>
        <h1>Lista de Módulos</h1>
      </header>
      <div>
        <nav>
          <ul>
            {modules.map((module) => (
              <li key={module.id}>
                <a onClick={() => selectModules(module)}>
                  <strong>{module.Descricao}</strong>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <main>
          <ul>
            <h2>{modulesActive.Descricao}</h2>
            {subModules.map((submodule) => (
              <li key={submodule.id}>{submodule.Descricao}</li>
            ))}
          </ul>
        </main>
      </div>
      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
};

export default App;
