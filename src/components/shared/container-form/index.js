import React from "react";

import FormLogin from "./form/login";

import FormRegister from "./form/register";

const ContainerForm = (props) => {
  return (
    <div className="container-form">
      {props.name?<FormRegister/>: <FormLogin/>}
    </div>
  );
};

export default ContainerForm;
