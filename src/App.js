import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import Rotas from "./routes";
import "./globals.css"

library.add(fas, fab)

function App() {
  return (
    <>
        {<Rotas/>}
    </>
  );
}
export default App;


