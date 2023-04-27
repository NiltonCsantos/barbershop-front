import React from "react";

const Buttom=(props)=>{
  return(
    <div className="btn-class">
        <button type="submit">{props.name}</button>
    </div>
    
  )
}

export default Buttom;