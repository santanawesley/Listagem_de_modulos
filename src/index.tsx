import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");

const App = () => {
  return <h1>IT Works - Módulos e Submódulos</h1>;
};

const root = createRoot(container);
root.render(<App />);
