
import { click } from "@testing-library/user-event/dist/click";
import React, {Fragment, useRef} from "react";

import {FaWhatsapp, FaInstagram, FaTiktok, FaMapMarkerAlt, FaBars} from "react-icons/fa"

const Li= ()=>{

  
 

  const btnRef=useRef();

  function click(){
    btnRef.current.click();
  }

  return(


    <Fragment>

 

      <li> <a href="#home" id="options-header"> Home</a> </li>
      <li>  <a href="#services" id="options-header">Serviços</a> </li>
      <li> <a href="#professionals" id="options-header">Profissionais</a>  </li>
      <li> <a href="#about" id="options-header">Sobre</a> </li>
      <li> <a href="#" id="options-header"><FaWhatsapp/></a> </li>
      <li> <a href="#" id="options-header"><FaInstagram/></a> </li>
      <li> <a href="#" id="options-header"><FaTiktok/></a> </li>
      <li> <a href="#" id="options-header"> <FaMapMarkerAlt/>  </a> </li>
   
    
      <div>

 
        <p className="btn-menu" data-bs-toggle="offcanvas"        data-bs-target="#offcanvasWithBothOptions" ><FaBars style={{fontSize:"1.8rem"}}/>

        </p>



        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1"  id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
           <div className="offcanvas-header">
           <h1 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Menu</h1>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"  aria-label="Close" id="btn-close" ref={btnRef}></button>
        </div>

         <div className="offcanvas-body">
        
          <ul className="menu-options">

          <li  onClick={click}> <a href="#home">Home</a> </li>
          <li onClick={click}>  <a href="#services">Serviços</a> </li>
          <li onClick={click}> <a href="#professionals">Profissionais</a>  </li>
          <li onClick={click}> <a href="#about">Sobre</a> </li>
          <div className="social-newtworks">
          <li onClick={click}> <a href="#"><FaWhatsapp/></a> </li>
          <li onClick={click}> <a href="#"><FaInstagram/></a> </li>
          <li onClick={click}> <a href="#"><FaTiktok/></a> </li>
          <li onClick={click}> <a href="#"> <FaMapMarkerAlt/>  </a> </li>
        </div>

        </ul>
      </div>
    </div>

    </div>
   

    </Fragment>

 
    
  )

}

export default Li;