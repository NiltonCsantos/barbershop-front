import React, {Fragment} from "react";

import "./style.css"

import { Link } from "react-router-dom";

const MainContent=()=>{

  return(

    <Fragment>

      <div className="main-content">

      <h1>NAVALHA</h1>
      <h2>BARBERSHOP</h2>
      <button> <Link to={"/login"}>LOGIN</Link></button>


      </div>

     

    </Fragment>


  )


}

export default MainContent;