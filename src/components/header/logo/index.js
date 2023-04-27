import React from "react";

import Src from "./image/logo.png"

import { Navigate } from "react-router-dom";


const Logo=()=>{

  return(

    
    <img src={Src} className="img-header"></img>

  )

}

export default Logo;