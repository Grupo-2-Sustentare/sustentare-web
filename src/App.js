import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import Rotas from "./routes";
import Debug from "./pages/Debug/Debug";
import "./globals.css"

library.add(fas, fab)

let conteudo = null
process.env.REACT_APP_MODO_DEBUG === "1" ? conteudo = <Debug/> : conteudo = <Rotas/>

function App() {
  return (
    <>
        {conteudo}
    </>
  );
}
export default App;


