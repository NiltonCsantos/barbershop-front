import { useState } from "react";
import { Await, Link, Navigate } from "react-router-dom";
import UsersService from "../../../services/users";

const AcessCode = () => {
  const [fields, setFields] = useState(
    {
      code:" ",
    }
  );

  const [error, setError]= useState("")

  const[ redirectToNewPassword, setRedirectToNewPassword]= useState(false);

  const [spinner, setSpinner] = useState(false);

  if(redirectToNewPassword){
    return <Navigate to={"/login/forgetpassword/newPassword"}/>
  }


  const HandleChange = (event) => {
    setFields({
      ...fields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const HandleSubmit = async (event) => {

    event.preventDefault();

    try {

      setSpinner(true);
      const response=await UsersService.code({
        code:fields.code,
        id:localStorage.getItem("id")
      })

  
      if(fields.code.match(response.data)){
        setRedirectToNewPassword(true)
      } 
      
    } catch (error) {

      setError(error.response.data);
      
      setSpinner(false);

      setTimeout(() => {
        setError("")
      }, 3000);
    }

   
   
   

  };

  return (
    <div className="containerpassword">
      <div className="content-form">
        <form onSubmit={HandleSubmit} className="form-login">
          <div className="login">
            <h1>LOGIN</h1>
          </div>
          <div className="inputs">
            <label htmlFor="code">Código:</label>
            <input
              type={"text"}
              id="code"
              name="code"
              required
              onChange={HandleChange}
            ></input>
          </div>
          <p className="user-error">{error}</p>
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
    </div>
  );
};

export default AcessCode;
