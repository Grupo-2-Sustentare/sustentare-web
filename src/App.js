import React from "react";
import Rotas from "./routes";
import Debug from "./pages/Debug/Debug";
import "./globals.css"

let conteudo = null
if (process.env.REACT_APP_MODO_DEBUG === "1") {
    conteudo = <Debug/>
} else{
    conteudo = <Rotas/>
}

function App() {
  return (
    <>
      <h3>
        {conteudo}
      </h3>
    </>
  );
}
export default App;


