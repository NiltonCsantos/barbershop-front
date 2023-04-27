import { Navigate, Route } from "react-router-dom";

import FormView from "../../views/solicitation";

import LoginView from "../../views/login";

const PrivateRouter=({component: Component, ...rest})=>{

  <Route {...rest} render={props=>
        localStorage.getItem("token")? (
          <Component{...props}/>
        ):(
          <Navigate to={"/login"}/>
        )
  }/>

}

export default PrivateRouter;