import { Link } from "react-router-dom";
import { useState } from "react";
import UsersService from "../../../../../services/users";

const FormLogin = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [redirectToSolicitation, setRedirectToSolicitation] = useState(false);
  const [error, setError] = useState(false);
  const [errorUser, setErrorUser] = useState("");
  const [messageEmailLogin, setMessageEmailLogin] = useState("");
  const [messageEmailRegister, setMessageEmailRegister] = useState("");
  const [messaPasswordRegister, setMessaPasswordRegister] = useState("");
  const [span, setSpan] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const [fields, setfields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const HandleChange = (event) => {
    setfields({
      ...fields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const HandleLoginSubmite = async (ev) => {
    ev.preventDefault();

    try {
      if (
        fields.email.match(/\w{2,}@[g][m][a][i][l]\.[c][o][m]/) ||
        fields.email.match(/\w{2,}@[o][u][t][l][o][o][k]\.[c][o][m]/)
      ) {
        setMessageEmailLogin("");

        setSpinner(true);

        const user = await UsersService.login({
          email: fields.email,
          password: fields.password,
        });
        const name = user.data.name;
        const token = user.data.token;

        localStorage.setItem("id", user.data.id);
        localStorage.setItem("name", name);
        localStorage.setItem("token", token);

        if (user.data.token.match(token)) {
          setRedirectToSolicitation(true);
        }
        if (fields.password.length >= 8) {
          setSpan(true);
        }
      } else {
        setMessageEmailLogin("Email inválido");
        setTimeout(()=>{

          setMessageEmailLogin("");
  
        },4000)
      }
    } catch (error) {
      setErrorUser(error.response.data);
      setSpinner(false);

      setTimeout(()=>{

        setErrorUser("");

      },4000)

    }
  };

  return (
    <div className="content-form">
      <form onSubmit={HandleLoginSubmite} className="form-login">
        <div className="login">
          <h1>LOGIN</h1>
        </div>

        
        <div className="inputs">
          
          <div className="email">
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

          <div className="password">
          <label htmlFor="password">Senha: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={fields.password}
            onChange={HandleChange}
            required
          ></input>
          </div>

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
          <p>{messageEmailLogin}</p>
        </div>

        <div
          className="spinner"
          style={{ display: spinner ? "block" : "none" }}
        >
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className="btn-class">
        <button>Entrar</button>
        </div>
      
      </form>
    </div>
  );
};

export default FormLogin;
