import React from "react";
import styles from "./login.module.css";

const Login = () => {
  return (
    <div className={styles["App"]}>
      <h1>Paralelo 19</h1>
      <div className={styles["infos"]}>
        <div className={styles["campoEmail"]}>
          <h2>Email:</h2>
          <input />
        </div>
        <div className={styles["campoSenha"]}>
          <h2>Senha:</h2>
          <input />
        </div>
      </div>
    </div>
  );
};

export default Login;