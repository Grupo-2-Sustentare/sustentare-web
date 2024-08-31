import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Rotas from "./routes";
import "./globals.css"
import {Toaster} from "react-hot-toast";

library.add(fas, fab)

function App() {
  return (
    <>
        <Toaster position="bottom-center"/>
        <Rotas/>
    </>
  );
}
export default App;


