import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import UsersService from "../../../../services/users";


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
  const [spinner, setSpinner] = useState(false);

  if (redirectToLogin) {
    return <Navigate to={"/login"} />;
  }

  if (redirectToSolicitation) {
    return <Navigate to={"/login/solicitation"} />;
  }

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 4000);
  }

  if(errorUser.length>1){
    setTimeout(()=>{
      setErrorUser("");
    }, 3000)
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
      setSpinner(true);
      if (
        fields.email.match(/\w{2,}@[g][m][a][i][l]\.[c][o][m]/) ||
        fields.email.match(/\w{2,}@[o][u][t][l][o][o][k]\.[c][o][m]/)
      ) {

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
      setSpinner(false);
    }
  };

 

  

    return (
      <div className="content-form">
      <form onSubmit={HandleRegisterSubmite} className="form-login">
        <div className="login">
          <h1>LOGIN</h1>
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
        <p
          className="user-error"
          style={{
            display: messageEmailRegister.length > 1 ? "block" : "none",
          }}
        >
          {messageEmailRegister}
        </p>
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
        <div className="spinner" style={{display:spinner?"block": "none"}}>
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <p className="user-error">{messaPasswordRegister}</p>
        <div className="options">
          <div className="btn-class">
            <button type="button">
              <Link to={"/login"}>Voltar</Link>
            </button>
          </div>

         <button>Confirmar</button>
        </div>
        {error && <p className="message-error">Esse usuário já existe</p>}
      </form>
    </div>
    );
  
};

export default Form;
