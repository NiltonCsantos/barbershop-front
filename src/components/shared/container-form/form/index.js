import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import UsersService from "../../../../services/users";

import "./style.css";

import Buttom from "./buttom";

const Form = (props) => {
  const [fields, setfields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [redirectToSolicitation, setRedirectToSolicitation] = useState(false);
  const [error, setError] = useState(false);
  const [errorUser, setErrorUser] = useState("");
  const [messageEmailLogin, setMessageEmailLogin] = useState("");
  const [messageEmailRegister, setMessageEmailRegister] = useState("");
  const [messaPasswordRegister, setMessaPasswordRegister] = useState("");
  const [span, setSpan] = useState(false);
  const [confirm, setConfirm] = useState("");

  if (redirectToLogin) {
    return <Navigate to={"/login"} />;
  }

  if (redirectToSolicitation) {
    if (confirm) {
      if (confirm.match("sim")) {
        localStorage.setItem("confirm", confirm);
      }
      return <Navigate to={"/login/solicitation"} />;
    }
  }

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 4000);
  }

  const HandleChange = (event) => {
    setfields({
      ...fields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const HandleRegisterSubmite = async (ev) => {
    ev.preventDefault();

    try {
      if (
        fields.email.match(/\w{2,}@[g][m][a][i][l]\.[c][o][m]/) ||
        fields.email.match(/\w{2,}@[o][u][t][l][o][o][k]\.[c][o][m]/)
      ) {
        setMessageEmailRegister(" ");

        if (fields.password.length >= 8) {
          setMessaPasswordRegister(" ");
          const user = await UsersService.register({
            name: fields.name,
            email: fields.email,
            password: fields.password,
          });

          setRedirectToLogin(true);
        } else {
          setMessaPasswordRegister("A senha deve possuir 8 caracters ou mais");
        }
      } else {
        setMessageEmailRegister("Email inválido");
      }
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  const HandleLoginSubmite = async (ev) => {
    ev.preventDefault();

    try {
      if (
        fields.email.match(/\w{2,}@[g][m][a][i][l]\.[c][o][m]/) ||
        fields.email.match(/\w{2,}@[o][u][t][l][o][o][k]\.[c][o][m]/)
      ) {
        setMessageEmailLogin(" ");

        const user = await UsersService.login({
          email: fields.email,
          password: fields.password,
        });
        const name = user.data.name;
        const token = user.data.token;

        localStorage.setItem("id", user.data.id);
        localStorage.setItem("name", name);
        localStorage.setItem("token", token);

        if (token) {
          setRedirectToSolicitation(true);
        }
        if (fields.password.length >= 8) {
          setSpan(true);
        }
      } else {
        setMessageEmailLogin("Email inválido");
      }
    } catch (error) {
      setErrorUser(error.response.data);
      console.log(error.response.data);
    }
  };

  const HandleClick = (event) => {
    setConfirm(event.currentTarget.value);
  };

  if (
    localStorage.getItem("confirm") === "sim" &&
    localStorage.getItem("token")
  ) {
    return <Navigate to={"/login/solicitation"} />;
  }

  if (props.name) {
    return (
      <div className="content-form">
        <form onSubmit={HandleRegisterSubmite} className="form-login">
          <div className="login">
            <h2>LOGIN</h2>
          </div>

          <div className="inputs">
            <label htmlFor="name">Nome:</label>
            <input
              type={"text"}
              id="name"
              name="name"
              value={fields.name}
              onChange={HandleChange}
              required
            ></input>
          </div>
          <div className="inputs">
            <label htmlFor="email">Email: </label>
            <input
              type={"email"}
              id="email"
              name="email"
              value={fields.email}
              onChange={HandleChange}
              required
            ></input>
          </div>
          <p className="user-error" style={{display: messaPasswordRegister.length>1? "block": "none"}}>{messageEmailRegister}</p>
          <div className="inputs">
            <label htmlFor="password">Senha: </label>
            <input
              type={"password"}
              id="password"
              name="password"
              value={fields.password}
              required
              onChange={HandleChange}
            ></input>
          </div>
          <p className="user-error">{messaPasswordRegister}</p>
          <div className="options">
            <div className="btn-class">
              <button type="button">
                <Link to={"/login"}>Voltar</Link>
              </button>
            </div>

            <Buttom name="Confirmar" />
          </div>
          {error && <p className="message-error">Esse usuário já existe</p>}
        </form>
      </div>
    );
  } else {
    return (
      <div className="content-form">
        <form onSubmit={HandleLoginSubmite} className="form-login">
          <div className="login">
            <h2>LOGIN</h2>
          </div>

          {span == true && (
            <div
              style={{
                transition: "1s",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                backgroundColor: "#0000009a",
                position: "fixed",
                top: "0",
                marginTop: "0.3rem",
                width: "250px",
                height: "80px",
                boxShadow: " 0px 0px 15px 0px #f7f5f544",
                padding: "1rem",
              }}
            >
              Permanecer conectado?
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  padding: "0.5rem",
                }}
              >
                <input
                  type="radio"
                  style={{ cursor: "pointer", display: "none" }}
                  name="choise"
                  id="not"
                  value={"nao"}
                  onClick={HandleClick}
                ></input>
                <label htmlFor="not">Não</label>
                <input
                  type="radio"
                  style={{ cursor: "pointer", display: "none" }}
                  id="yes"
                  name="choise"
                  value={"sim"}
                  onClick={HandleClick}
                ></input>
                <label htmlFor="yes">Sim</label>
              </div>
            </div>
          )}

          <div className="inputs">
            <label htmlFor="email">Email:</label>
            <input
              type={"email"}
              id="email"
              name="email"
              value={fields.email}
              onChange={HandleChange}
              required
            ></input>
          </div>
          <p className="user-error">{messageEmailLogin}</p>
          <div className="inputs">
            <label htmlFor="password">Senha:</label>
            <input
              type={"password"}
              id="password"
              name="password"
              value={fields.password}
              onChange={HandleChange}
              required
            ></input>
          </div>
          <div className="options">
            <p>
              <Link to={"/login/forgetpassword"}>Esqueceu a senha?</Link>
            </p>
            <p>
              <Link to={"/register"}>Cadastre-se</Link>
            </p>
          </div>
          <div className="user-error">
            <p>{errorUser}</p>
          </div>
          <Buttom name="Entrar"></Buttom>
        </form>
      </div>
    );
  }
};

export default Form;
