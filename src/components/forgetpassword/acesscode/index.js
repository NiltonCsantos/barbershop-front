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

      const response=await UsersService.code({
        code:fields.code,
        id:localStorage.getItem("id")
      })

      console.log("RES")

      console.log(response.data)
      if(fields.code.match(response.data)){
        setRedirectToNewPassword(true)
      } 
      
    } catch (error) {

      setError(error.response.data);
      
    }

   
   
   

  };

  return (
    <div className="containerpassword">
      <div className="content-form">
        <form onSubmit={HandleSubmit} className="form-login">
          <div className="login">
            <h2>LOGIN</h2>
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
