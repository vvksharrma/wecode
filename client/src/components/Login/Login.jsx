import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../context/userContext";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const { setUserinfo } = useContext(userContext);

  const baseURL = process.env.REACT_APP_API_URL;

  async function login(e) {
    e.preventDefault();

    let newErrors = {};
    if (!userName) {
      newErrors.username = "Username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      try {
        const response = await fetch(`${baseURL}/login`, {
          method: "POST",
          body: JSON.stringify({ userName, password }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.ok) {
          response.json().then((userInfo) => {
            setUserinfo(userInfo);
            setLoading(false);
            setTimeout(() => {
              setSuccessMessage(`Redirecting to home page`);
              setRedirect(true);
            }, 1000);
          });
        } else {
          alert("WRONG CREDENTIALS");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        {errors.username && <p>*{errors.username}</p>}
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />

        {errors.password && <p>*{errors.password}</p>}
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading} type="submit">
          {loading ? (
            <img
              style={{ height: "1rem" }}
              alt="loading..."
              src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
            />
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Login;
