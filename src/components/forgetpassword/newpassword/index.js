import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UsersService from "../../../services/users";

import { BiCheckCircle } from "react-icons/bi";

const NewPassword = () => {
  const [error, setError] = useState(false);

  const [fields, setfields] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const HandleChange = (event) => {
    setfields({
      ...fields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const [spinner, setSpinner] = useState(false);

  const [alert, setAlert] = useState(false);
  

  if (redirectToLogin) {
    return <Navigate to={"/login"} />;
  }

  const HandleSubmit = async (event) => {
    event.preventDefault();
    setSpinner(true);
    const boolean = checkPassword();

    console.log(boolean);

    if (boolean) {
      try {
        const response = await UsersService.uptadePassword({
          id: localStorage.getItem("id"),
          newPassword: fields.newPassword,
          confirmPassword: fields.confirmPassword,
        });

        setAlert(true);

        setTimeout(() => {
          setRedirectToLogin(true);
        }, 5000);
        
      } catch (error) {
        setError(error.response.data);
      }
    } else {
      setSpinner(false);
    }
  };

  function checkPassword() {
    if (
      fields.newPassword.length >= 8 &&
      fields.confirmPassword.length >= 8 &&
      fields.confirmPassword.match(fields.newPassword)
    ) {
      return true;
    } else {
      setError("As senhas não conferem ou possuem menos de 8 caracteres");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }
  }

  if (!alert) {
    return (
      <div className="container-form">
        <div className="content-form">
          <form onSubmit={HandleSubmit} className="form-login">
            <div className="login">
              <h1>LOGIN</h1>
            </div>
            <div className="inputs">
             <div className="password">
             <label htmlFor="newPassword">senha:</label>
              <input
                type={"password"}
                id="newPassword"
                name="newPassword"
                required
                onChange={HandleChange}

              
              ></input>
             </div>

              <div className="password">
              <label htmlFor="confirmPassword">senha:</label>
              <input
                type={"password"}
                id="confirmPassword"
                name="confirmPassword"
                required
                onChange={HandleChange}
              ></input>
              </div>
            </div>
         
            <p className="user-error">{error}</p>
            <div className="spinner" style={{display:spinner?"block": "none"}}>
              <div class="d-flex justify-content-center">
                <div class="spinner-border text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <div className="options-btn">
             
                <Link to={"/login"}>Voltar</Link>
              
              <button type="submit">Confirmar</button>
            </div>
          </form>
        </div>
      </div>
    );
  }else{
    return(
      <div class="alert alert-success d-flex align-items-center" role="alert">
      <div>
        <BiCheckCircle /> Senha alterada com sucesso!
      </div>
    </div>
    )

  }
};

export default NewPassword;
