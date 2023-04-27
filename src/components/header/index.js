import {React, useRef, useState, useEffect} from "react";

import "./style.css"

import Logo from "./logo";

import Ul from "./ul";


const Header = () => {

  
    const [color, setColor] = useState("");
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);

    }, []);
  
    const handleScroll = () => {
      const position = window.pageYOffset;
      const color = position > 0 ? "#101010" : "transparent";
      setColor(color);
    };
  
    

  return  (
   <header style={{backgroundColor: color, transition: "0.5s"} }>
    <Logo/>
    <Ul/>
  </header>
   
  );
};



export default Header;