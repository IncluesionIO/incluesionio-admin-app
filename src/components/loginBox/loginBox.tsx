import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./loginBox.css";

const LoginBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  const navigate = useNavigate()

  useEffect(() =>
  {
    setPasswordError("")
  }, [password])

  useEffect(() =>
  {
    setIdentifierError("")
  }, [username])

  const formValidator = () => {
    let error = false
    if(username.trim().length < 1)
    {
        setIdentifierError("Field cannot be empty!")
        error = true
    }

    if(password.trim().length < 1)
    {
        setPasswordError('Field cannot be empty!')
        error = true
    }
    return error
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    setErrorAlert("")
    event.preventDefault();
    if(!formValidator())
    {
        axios.post("http://localhost:13000/auth/login", 
        {
            username,
            password
        }).then((response) => {
          const responseData = response.data;
          console.log(responseData)
          localStorage.setItem('userAuth', JSON.stringify(responseData.token));
          localStorage.setItem('userId', JSON.stringify(responseData.userId));
          localStorage.setItem('companyID', JSON.stringify(responseData.companyID))
          navigate('/admin')
        })
        .catch(err =>
            {
                const status = err.response.status
                if(status === 401)
                {
                    setErrorAlert("A user with the username and password combination does not exist.")
                }

                if(status === 422 || status === 500)
                {
                    setErrorAlert("There was a problem logging in, please try again.")
                }
            });
    }
  };

  const title = <h1 className="containerLoginBox-title-text">Log In</h1>;



  return (
    <div className="containerLoginBox">
      <div className="containerLoginBox-title">{title}</div>
      <Link to={"/start"}>Sign Up</Link>
      <span id="errorAlert" className="errorAlert">{errorAlert}</span>
      <form onSubmit={handleSubmit} className={"formLogin"}>
        <div>
          <input
            className={"userInput"}
            type={"text"}
            id="userIdentification"
            placeholder=" "
            onChange={(e) => {setUsername(e.target.value.trim())}}
          ></input>
          <label htmlFor="userIdentification" className="inputLabel">
            Username
          </label>
          <span className="error-message" aria-live="polite">
            {identifierError}
          </span>
        </div>
        <div>
          <input
            className={"userInput"}
            type={"password"}
            id="userPassword"
            placeholder=" "
            onChange={(e) => {setPassword(e.target.value.trim())}}
          ></input>
          <label
            htmlFor="userPassword"
            className="inputLabel"
            aria-label="Password"
          >
            Password
          </label>
          <span className="error-message" aria-live="polite">
            {passwordError}
          </span>
        </div>
        <div className="formSettings">
          <input type={"checkbox"} id="userSignInPreference" disabled></input>
          <label htmlFor="userSignInPreference">Keep me signed in</label>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <div>
          <button className={"btnLogin"} type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export { LoginBox };
