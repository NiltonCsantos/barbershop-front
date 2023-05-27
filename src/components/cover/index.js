import React, {Fragment, useState} from "react";

import Header from "../header";

import CoverMainContent from "../container-main-content";

const Cover=()=>{

  const [style, setStyle]=useState(
    {
      backgroundColor:""
    }
)

  const Active=()=>{

    setStyle("header1")

    alert("Teste")

    // const header=document.getElementById("header");

    // header.style.backgroundColor="#9F6418";
  }


  return(
    

    <div className=" cover" id="home">

      <Header/>

      <CoverMainContent/>
     


    </div>

  )

}

export default Cover;