import React, { useContext, useState } from "react";
import "./login.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StateContext from "../../context/StateContext";
import PageContext from "../../context/PageContext";
const api = require("../../assets/FetchServices");

const CheckYourEmailPage = () => {
  const stateContext = useContext(StateContext);
  const pageContext = useContext(PageContext);
  const [message, setMessage] = useState("We sent a password reset link to");
  const handleResend = async () => {
    if (!stateContext.state.email) {
      return;
    }
    const fullURL = window.location.href;
    try {
      await api.authentication.forgotPassword({
        email: stateContext.state.email,
        frontendUrl: `${fullURL}resetpassword/`,
      });
      setMessage("We resent a password reset link to");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <body class="login-body">
      <div className="login-container">
        <div className="logo-container">
          <img src={'/logo.jpg'} alt="logo" width={300} />
        </div>
        <h2>Проверьте вашу эл. почту</h2>
        <h3 style={{ margin: "0px" }}>{message}</h3>
        <h3
          style={{ marginTop: "5px", fontWeight: "bold", marginBottom: "10px" }}
        >
          {stateContext.state.email}
        </h3>
        <div className="sign-up-link">
          Не получили письмо?{" "}
          <button className="button-forgot-password" onClick={handleResend}>
            Отправить ещё раз
          </button>
        </div>
        <button
          className="back-to-login-button"
          style={{ marginTop: "20px" }}
          onClick={() => {
            pageContext.navigateTo("login");
          }}
        >
          <ArrowBackIcon style={{ fontSize: "18px", marginRight: "5px" }} />
          Вернуться на авторизацию
        </button>
      </div>
    </body>
  );
};

export default CheckYourEmailPage;

//Control panel settings for storybook
CheckYourEmailPage.propTypes = {};

//Default values for this component
CheckYourEmailPage.defaultProps = {};
