import React, { useContext, useState } from "react";
import "./login.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StateContext from "../../context/StateContext";
import PageContext from "../../context/PageContext";
const validator = require("validator");
const api = require("../../assets/FetchServices");

const ForgotPasswordPage = () => {
  const stateContext = useContext(StateContext);
  const pageContext = useContext(PageContext);
  const [input, setInput] = useState();
  const [message, setMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullURL = window.location.href;
    
    try {
      await api.authentication.forgotPassword({
        email: input,
        frontendUrl: `${fullURL}resetpassword/`,
      });

      stateContext.updateState("email", input);
      pageContext.navigateTo("checkMail");
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
      }
      console.log(error);
    }
  };

  return (
    <body class="login-body">
      <div className="login-container">
        <div className="logo-container">
          <img src={'/logo.jpg'} alt="logo" width={300} />
        </div>
        <h2 style={{ marginBottom: "0px" }}>Забыли пароль?</h2>
        <h3>Не беспокойтесь, мы вышлем вам инструкции для сброса.</h3>
        {message && <div className="error-alert">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <button
            style={{ marginTop: "0px" }}
            className="create-account-button"
            disabled={!input || !validator.isEmail(input)}
          >
            Сбросить пароль
          </button>
        </form>
        <button
          className="back-to-login-button"
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

export default ForgotPasswordPage;

//Control panel settings for storybook
ForgotPasswordPage.propTypes = {};

//Default values for this component
ForgotPasswordPage.defaultProps = {};
