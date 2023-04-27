import React, {Fragment} from "react";

import {FaWhatsapp, FaInstagram, FaTiktok, FaMapMarkerAlt, FaBars} from "react-icons/fa"



const Li= ()=>{

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

 
 <p className="btn-menu" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" ><FaBars style={{fontSize:"1.8rem"}}/>

 </p>



<div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Menu</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <ul className="menu-options">

    <li> <a href="#home">Home</a> </li>
    <li>  <a href="#services">Serviços</a> </li>
    <li> <a href="#professionals">Profissionais</a>  </li>
    <li> <a href="#about">Sobre</a> </li>
    <div className="social-newtworks">
    <li> <a href="#"><FaWhatsapp/></a> </li>
    <li> <a href="#"><FaInstagram/></a> </li>
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