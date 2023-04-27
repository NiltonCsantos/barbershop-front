import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UsersService from "../../../services/users";

const NewPassword = () => {

  const [error, setError]= useState(false);

  

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

  const [redirectToLogin, setRedirectToLogin]= useState(false);

  if(redirectToLogin){
    return <Navigate to={"/login"}/>
  }

  const HandleSubmit = async (event) => {
    event.preventDefault();

    const boolean = checkPassword();

    console.log("Boeleano")
    console.log(boolean)

    if(boolean){

      try {
        const response = await UsersService.uptadePassword({
          id: localStorage.getItem("id"),
          newPassword: fields.newPassword,
          confirmPassword: fields.confirmPassword,
        });

        setRedirectToLogin(true)
        
      } catch (error) {
        setError(error.response.data)
      }

    }


  };



  function checkPassword() {
    if (
      fields.newPassword.length >= 8 &&
      fields.confirmPassword.length >= 8 &&
      fields.confirmPassword.match(fields.newPassword)
    ) {

      return true;

    }else{
     
      setError("As senhas não conferem ou possuem menos de 8 caracteres");
      return false;
    }
  }

  return (
    <div className="containerpassword">
      <div className="content-form">
        <form onSubmit={HandleSubmit} className="form-login">
          <div className="login">
            <h2>LOGIN</h2>
          </div>
          <div className="inputs">
            <label htmlFor="newPassword">Nova senha:</label>
            <input
              type={"password"}
              id="newPassword"
              name="newPassword"
              required
              onChange={HandleChange}
            ></input>
          </div>
          <div className="inputs">
            <label htmlFor="confirmPassword">Nova senha:</label>
            <input
              type={"password"}
              id="confirmPassword"
              name="confirmPassword"
              required
              onChange={HandleChange}
            ></input>
          </div>
          <p className="user-error">{error}</p>
      
          <div className="btn-class">
            <button type="button">
              <Link to={"/login"}>Voltar</Link>
            </button>
            <button type="submit">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
