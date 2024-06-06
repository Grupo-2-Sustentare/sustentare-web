import React from "react";
import styles from "./login.module.css";

import Button from "../../components/Button/Button";
import Input from "../../components/TextInput/TextInput";


const Login = () => {
  return (
    <div className={styles["login"]}>
      <h1>Paralelo 19</h1>
      <div>
        <div className={styles["campo"]}>
          <h2>Email:</h2>
          <Input type="text" />
        </div>
        <div className={styles["campo"]}>
          <h2>Senha:</h2>
          <Input type="text" />
        </div>
        <div className={styles["containerBotao"]}>
          <Button insideText="Entrar"/>
        </div>
      </div>
    </div>
  );
};

export default Login;