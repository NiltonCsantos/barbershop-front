import Api from "./api";

const UsersService={
  register:(params)=> Api.post("/register", params),
  login: (params)=> Api.post("/login", params),
  solicitaton: (params)=>Api.post("/solicitation", params),
  solicitatonPostDate: (params)=>Api.post("/login/solicitation", params),
  forgetPassword: (params)=>Api.post("/login/forgetpassword", params),
  code: (params)=>Api.put("/login/forgetpassword/acesscode", params),
  uptadePassword: (params)=>Api.put("/login/forgetpassword/newPassword", params)
}

export default UsersService;