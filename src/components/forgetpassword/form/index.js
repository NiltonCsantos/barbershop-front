import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UsersService from "../../../services/users";

const FormPassword = () => {
  const [fields, setfields] = useState({
    email: " "
  });
  const [message, setMessage] = useState("");
  const [confirm, setConfirm]=useState(false);
  const [spinner, setSpinner] = useState(false);
  
    if(confirm){
      return <Navigate to={"/login/forgetpassword/acesscode"}/>
    }

  

  const ValidateUser = (email) => {
    if (
      email.match(/\w{2,}@[g][m][a][i][l]\.[c][o][m]/) ||
      email.match(/\w{2,}@[o][u][t][l][o][o][k]\.[c][o][m]/)
    ) {
      return true;
    } else {
      setMessage("Email inválido");
      console.log("ERROR: " + message);
      console.log("Email inválido");
      return false;
    }
  };

  const HandleChange = (event) => {
    setfields({
      ...fields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();

    if (ValidateUser(fields.email) == true) {
    
      try {

        setSpinner(true);

        const response = await UsersService.forgetPassword({
          email: fields.email,
        })

        console.log("Resposta");
        console.log(response);

        localStorage.setItem("id", response.data)
      

        if (response) {

          setConfirm(true)
         
        }
       
      } catch (error) {
        setMessage(error.response.data);
        setSpinner(false);
        setTimeout(() => {
          setMessage("")
        }, 3000);
      }
    }
  };





  return (
    <div className="content-form">
      <form onSubmit={HandleSubmit} className="form-login">
        <div className="login">
          <h1>LOGIN</h1>
        </div>
        <div className="inputs">
          <label htmlFor="email">Email:</label>
          <input
            type={"email"}
            id="email"
            name="email"
            required
            onChange={HandleChange}
          ></input>
        </div>
        <p className="user-error">{message}</p>
        <div className="spinner" style={{display:spinner?"block": "none"}}>
            <div class="d-flex justify-content-center">
              <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        <div className="btn-forget">
          <button type="button">
            <Link to={"/login"}>Voltar</Link>
          </button>
          <button type="submit">Confirmar</button>
        </div>
      </form>
    </div>
  );
};

export default FormPassword;
