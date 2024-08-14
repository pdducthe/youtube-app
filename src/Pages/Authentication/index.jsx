//STYLES
import "./index.scss";

//ASSETS
import YoutubeIcon from "../../assets/youtube.svg";

//PACKAGE
import React, { useEffect, useMemo, useState } from "react";

//CONTEXT
import { useAuth } from "../../Context/AuthContext";

export default function AuthenticationPage() {
  const user = useAuth();
  const hardEmail = process.env.REACT_APP_EMAIL;
  const hardPassword = process.env.REACT_APP_PASSWORD;

  const [isDisabledBtn, setIsDisabledBtn] = useState({
    submit: true,
    accessCode: true,
  });
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const btnStatus = useMemo(() => {
    return {
      submit: isDisabledBtn.submit ? "deactivate" : "activate",
      accessCode: isDisabledBtn.accessCode ? "deactivate" : "activate",
    };
  }, [isDisabledBtn]);

  const handleEmailChange = (event) => {
    setFormValue((state) => {
      return { ...state, email: event.target.value };
    });
  };
  const handlePasswordChange = (event) => {
    setFormValue((state) => {
      return { ...state, password: event.target.value };
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    //assume call api to verify user
    if (formValue.email === hardEmail && formValue.password === hardPassword) {
      localStorage.setItem("isAuthenticated", "true");
      const { login } = user;
      // @ts-ignore
      login && login();
    } else {
      localStorage.setItem("isAuthenticated", "false");
    }
  };

  useEffect(() => {
    if (formValue.email !== "" && formValue.password !== "") {
      setIsDisabledBtn((state) => ({ ...state, submit: false }));
    } else {
      setIsDisabledBtn((state) => ({ ...state, submit: true }));
    }
  }, [formValue]);

  return (
    <div className="container">
      <div className="authentication-page">
        <div className="form">
          <h2 style={{ textAlign: "center" }}>Welcome to AnyMind Group</h2>
          <div>
            <img src={YoutubeIcon} alt="ytb" />
          </div>
          <br />
          Please log in before continue
          <div className="form-wrapper">
            <form>
              <label>Email: </label>
              <br />
              <input
                type="text"
                id="fmail"
                name="femail"
                value={`${formValue.email}`}
                onChange={handleEmailChange}
              />
              <br />
              <label>Password:</label>
              <br />
              <input
                type="text"
                id="fpassword"
                name="fpassword"
                value={formValue.password}
                placeholder="Enter your password"
                onChange={handlePasswordChange}
              />
              <br />
              <div className="btn-container">
                <button
                  disabled={isDisabledBtn.submit}
                  className={btnStatus.submit}
                  type="submit"
                  onClick={handleForm}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
