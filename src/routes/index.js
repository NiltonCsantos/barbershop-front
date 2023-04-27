import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import IndexView from "../views/index";
import LoginView from "../views/login";
import RegisterView from "../views/register";
import FormView from "../views/solicitation";
import PasswordView from "../views/forgetpassword";
import AcessCodeView from "../views/acesscode";
import NewPasswordView from "../views/newpassword";



const IndexRouter=()=>{
  return(

    <Router>
    <Routes>
      <Route exact path="/" element={<IndexView/>}/>
      <Route exact path="/login" element={<LoginView/>}/>
      <Route exact path="/register" element={<RegisterView/>}/>
      <Route exact  path="/login/solicitation" element={<FormView/>}/>
      <Route exact path="/login/forgetpassword" element={<PasswordView/>}/>
      <Route exact path="/login/forgetpassword/acesscode" element={<AcessCodeView/>}/>
      <Route exact path="/login/forgetpassword/newpassword" element={<NewPasswordView/>}/>
    </Routes>


    </Router>

  )
}
export default IndexRouter;