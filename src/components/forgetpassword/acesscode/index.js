import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UsersService from "../../../services/users";

const AcessCode = () => {
  const [fields, setFields] = useState({
    code: " ",
  });

  const [error, setError] = useState("");

  const [redirectToNewPassword, setRedirectToNewPassword] = useState(false);

  const [spinner, setSpinner] = useState(false);

  if (redirectToNewPassword) {
    return <Navigate to={"/login/forgetpassword/newPassword"} />;
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
      const response = await UsersService.code({
        code: fields.code,
        id: localStorage.getItem("id"),
      });

      if (fields.code.match(response.data)) {
        setRedirectToNewPassword(true);
      }
    } catch (error) {
      setError(error.response.data);

      setSpinner(false);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="container-form">
      <div className="content-form">
        <form onSubmit={HandleSubmit} className="form-acess-code">
          <div className="login">
            <h1>LOGIN</h1>
          </div>
          <div className="inputs">
            <div className="acess-code">
              <label htmlFor="code">Código:</label>
              <input
                type={"text"}
                id="code"
                name="code"
                required
                onChange={HandleChange}
              ></input>
            </div>
          </div>
          <p className="user-error">{error}</p>
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
          <div className="options-btn">
            <Link to={"/login"}>Voltar</Link>

            <button type="submit">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcessCode;
