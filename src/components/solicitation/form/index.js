import React from "react";

import { useState } from "react";
import { Navigate } from "react-router-dom";
import userService from "../../../services/users";
import { BiCheckCircle } from "react-icons/bi";

const Form = () => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  const today = `${year}-${month}-${day}`;
  const maxMonth = String(date.getMonth() + 2).padStart(2, "0");

  const maxAgender = `${year}-${maxMonth}-${day}`;

  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [checked, setChecked] = useState(false);
  const [conditiom, setCondition] = useState(false);
  const [error, setError] = useState(true);
  const [checkHair, setCheckHair] = useState(false);
  const [checkBarb, setCheckBarb] = useState(false);
  const [checkEyebrow, setCheckEyebrow] = useState(false);
  const [checkHairTreatment, setCheckHairTreatment] = useState(false);
  const [errorSpan, setErrorSpan] = useState("");
  const [time, setTime] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [alertspinner, setAlertSpinner] = useState(false);

  const [fields, setFields] = useState({
    time: " ",
    hair: " ",
    barb: " ",
    eyebrow: " ",
    hairTreatment: " ",
    date: " ",
    professional: " ",
  });

  if (redirectToLogin) {
    return <Navigate to={"/login"} />;
  }

  if (localStorage.getItem("token")) {
  } else {
    setRedirectToLogin(true);
  }

  if (checked) {
    return <Navigate to={"/"} />;
  }

  const HandleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFields({ ...fields, [name]: value });
  };

  const HandleSubmit = async (ev) => {
    ev.preventDefault();

    setSpinner(true);

    try {
      const id = localStorage.getItem("id");

      const order = `${fields.hair} ${fields.barb} ${fields.eyebrow} ${fields.hairTreatment}`;
      await userService.solicitaton({
        time: fields.time,
        solicitation: order,
        date: fields.date,
        professional: fields.professional,
        user: id,
      });

      setAlertSpinner(true);

      setTimeout(() => {
        setChecked(true);
      }, 5000);
    } catch (error) {
      setError(error.response.data);
      setSpinner(false);
      setTimeout(() => {

        setError("");
        
      }, 4000);
    }
  };

  const HandleSelect = async () => {
    const response = await userService.solicitatonPostDate({
      date: fields.date,
    });

    const listTime = response.data;

    let day = fields.date[8];
    day += fields.date[9];

    const date = new Date();
    let month = fields.date[5];
    month += fields.date[6];
    month -= 1;
    let fullyear = "";

    for (let i = 0; i < 4; i++) {
      fullyear += fields.date[i];
    }

    date.setMonth(month);
    date.setDate(day);
    date.setFullYear(fullyear);

    if (date.getDay() === 6 || date.getDay() === 0) {
      alert("O estabelecimento não funciona aos fins de semana");
      fields.date = "";
    }

    setTime(listTime);
  };

  const CheckOrder = () => {
    if (
      checkHair == false &&
      checkBarb == false &&
      checkEyebrow == false &&
      checkHairTreatment == false
    ) {
      setCondition(true);
      setErrorSpan("Você deve marcar pelo menos uma opção!");
      
      setTimeout(() => {

        setErrorSpan("");
        
      }, 4000);

      setTimeout(() => {
        setCondition(false);
      }, 2000);
    }
  };

  const HandleCheckHair = () => {
    setCheckHair(!checkHair);
  };
  const HandleCheckBarb = () => {
    setCheckBarb(!checkBarb);
  };
  const HandleCheckEyebrow = () => {
    setCheckEyebrow(!checkEyebrow);
  };
  const HandleCheckHairTreatment = () => {
    setCheckHairTreatment(!checkHairTreatment);
  };

  function checkTime(hours) {
    const boolean = time.find((element) => {
      if (element.match(hours)) {
        return true;
      } else {
        return false;
      }
    });

    return boolean;
  }

  if (!alertspinner) {
    return (
      <div className="container-solicitation">
        <div className="content-form">
          <form className="form-solicitation" onSubmit={HandleSubmit}>
            <h2>Bem vindo, {localStorage.getItem("name")}</h2>

            <p>Marque o que você deseja fazer</p>
           
            <div className="hair">
              <div className="inputs-solicitation">
                <div className="hair">
                  <input
                    type={"checkbox"}
                    name="hair"
                    id="hair"
                    value={"Cabelo"}
                    onChange={HandleChange}
                    onClick={HandleCheckHair}
                    checked={checkHair}
                  ></input>
                  <label htmlFor="hair">Corte de cabelo</label>
                </div>

                <div className="barb">
                  <input
                    type={"checkbox"}
                    name="barb"
                    id="barb"
                    value={"Barba"}
                    onClick={HandleCheckBarb}
                    checked={checkBarb}
                    onChange={HandleChange}
                  ></input>
                  <label htmlFor="barb">Barba</label>
                </div>

                <div className="eyebrow">
                  <input
                    type={"checkbox"}
                    name="eyebrow"
                    id="eyebrow"
                    value={"Sombrancelha"}
                    onClick={HandleCheckEyebrow}
                    checked={checkEyebrow}
                    onChange={HandleChange}
                  ></input>
                  <label htmlFor="eyebrow">Sombrancelha</label>
                </div>

                <div className="hairTreatment">
                  <input
                    type={"checkbox"}
                    name="hairTreatment"
                    id="hairTreatment"
                    value={"Tratamento capilar"}
                    onClick={HandleCheckHairTreatment}
                    checked={checkHairTreatment}
                    onChange={HandleChange}
                  ></input>
                  <label htmlFor="hairTreatment">Tratamento capilar</label>
                </div>

                <span className="user-error">{errorSpan}</span>
              </div>
             
            </div>

            <p>Selecione um de nossos profissionais</p>

            <div>
              <div className="inputs-solicitation">
                <div className="barber1">
                  <input
                    type={"radio"}
                    name="professional"
                    id="barber1"
                    value={"Rafa"}
                    onChange={HandleChange}
                  ></input>
                  <label htmlFor="barber1">Rafa</label>
                </div>

                <div className="barber2">
                  <input
                    type={"radio"}
                    name="professional"
                    id="barber2"
                    value={"Duca"}
                    onChange={HandleChange}
                    required
                  ></input>
                  <label htmlFor="barber2">Duca</label>
                </div>

                <div className="barber3">
                  <input
                    type={"radio"}
                    name="professional"
                    id="barber3"
                    value={"Cadú"}
                    onChange={HandleChange}
                    required
                  ></input>
                  <label htmlFor="barber3">Cadú</label>
                </div>
                <div className="barber4">
                  <input
                    type={"radio"}
                    name="professional"
                    id="barber4"
                    value={"Léo"}
                    onChange={HandleChange}
                    required
                  ></input>
                  <label htmlFor="barber4">Léo</label>
                </div>
              </div>
            </div>

            <div className="calendar">
              <p>Agendar Dia</p>

              <input
                type={"date"}
                min={today}
                max={maxAgender}
                required
                onChange={HandleChange}
                name="date"
              ></input>
            </div>

            
            <div className="calendar">
            <p>Agendar horário</p>
              <div>
                <select
                  className="choose"
                  onClick={HandleSelect}
                  disabled={fields.date.length <= 1 ? true : false}
                  name="time"
                  onChange={HandleChange}
                  required
                >
                  <option value="">Selecione</option>
                  <option
                    value="07:00"
                    disabled={checkTime("07:00")}
                  >
                    07:00
                  </option>
                  <option value="07:30" disabled={checkTime("07:30")}>
                    07:30
                  </option>
                  <option value="08:00" disabled={checkTime("08:00")}>
                    08:00
                  </option>
                  <option value="08:30" disabled={checkTime("08:30")}>
                    08:30
                  </option>
                  <option value="09:00" disabled={checkTime("09:00")}>
                    09:00
                  </option>
                  <option value="09:30" disabled={checkTime("09:30")}>
                    09:30
                  </option>
                  <option value="10:00" disabled={checkTime("10:00")}>
                    10:00
                  </option>
                  <option value="10:30" disabled={checkTime("10:30")}>
                    10:30
                  </option>
                  <option value="11:00" disabled={checkTime("11:00")}>
                    11:00
                  </option>
                  <option value="11:30" disabled={checkTime("11:30")}>
                    11:30
                  </option>
                  <option value="13:00" disabled={checkTime("13:00")}>
                    13:00
                  </option>
                  <option value="13:30" disabled={checkTime("13:30")}>
                    13:30
                  </option>
                  <option value="14:00" disabled={checkTime("14:00")}>
                    14:00
                  </option>
                  <option value="14:30" disabled={checkTime("14:30")}>
                    14:30
                  </option>
                  <option value="15:00" disabled={checkTime("15:00")}>
                    15:00
                  </option>
                  <option value="15:30" disabled={checkTime("15:30")}>
                    15:30
                  </option>
                  <option value="16:00" disabled={checkTime("16:00")}>
                    16:00
                  </option>
                  <option value="16:30" disabled={checkTime("16:30")}>
                    16:30
                  </option>
                  <option value="17:00" disabled={checkTime("17:00")}>
                    17:00
                  </option>
                </select>
              </div>
            </div>

            <div
              className="spinner-solicitation"
              style={{ display: spinner ? "block" : "none" }}
            >
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>

            <p className="user-error">{error}</p>

            <div className="button-solicitation">
              <button
                type="submit"
                onClick={CheckOrder}
                disabled={conditiom}
              >
                Confirmar
              </button>
            </div>
          
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="alert alert-success d-flex align-items-center" role="alert">
        <div>
          <BiCheckCircle /> Pedido realizado com sucesso!
        </div>
      </div>
    );
  }
};

export default Form;
