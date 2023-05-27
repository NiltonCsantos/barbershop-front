import React, { Fragment } from "react";

import Cover from "../cover";
import ContainerServices from "../container-services";
import ContainerProfessionals from "../container-professionals";
import Aside from "../shared/aside";

const Container = () => {
  return (
    <div className="container-fluid" id="container">
      <Cover />
      <ContainerServices/>
      <ContainerProfessionals/>
      <Aside/> 
    </div>
  );
};

export default Container;
