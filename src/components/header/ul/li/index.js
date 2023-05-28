
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
      <li> <a href="https://api.whatsapp.com/send?phone=5579996817729&text=Ol%C3%A1,%20C%C3%A9sar.%20Gostaria%20de%20entrar%20em%20contato%20com%20voc%C3%AA." target="_blank" rel="external" id="options-header"><FaWhatsapp/></a> </li>
      <li> <a href="https://www.instagram.com/cesar____16/" target="_blank" rel="extenal" id="options-header"><FaInstagram/></a> </li>
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

          <li > <a href="#home"onClick={click}>Home</a> </li>
          <li>  <a href="#services"onClick={click}>Serviços</a> </li>
          <li> <a href="#professionals"onClick={click}>Profissionais</a>  </li>
          <li> <a href="#about"onClick={click}>Sobre</a> </li>
          <div className="social-newtworks">
          <li> <a href="https://api.whatsapp.com/send?phone=5579996817729&text=Ol%C3%A1,%20C%C3%A9sar.%20Gostaria%20de%20entrar%20em%20contato%20com%20voc%C3%AA." target="_blank" rel="external"><FaWhatsapp/></a> </li>
          <li> <a href="https://www.instagram.com/cesar____16/" target="_blank" rel="extenal"><FaInstagram/></a> </li>
          <li> <a href="#"><FaTiktok/></a> </li>
          <li> <a href="#"> <FaMapMarkerAlt/>  </a> </li>
        </div>

        </ul>
      </div>
    </div>

    </div>
   

    </Fragment>

 
    
  )

}

export default Li;