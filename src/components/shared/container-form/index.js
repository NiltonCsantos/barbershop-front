import React from "react";

import Form from "./form";

import "./style.css"

const ContainerForm = (props) => {
  return (
    <div className="container-form">
      <Form name={props.name} />
    </div>
  );
};

export default ContainerForm;
