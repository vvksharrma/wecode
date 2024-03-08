import React, { useState } from "react";

const Register = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const baseURL = process.env.REACT_APP_API_URL;

  async function register(e) {
    e.preventDefault();
    let newErrors = {};
    if (!userName) {
      newErrors.username = "Username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
      }
      
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      const response = await fetch(`${baseURL}/register`, {
        method: "POST",
        body: JSON.stringify({ userName, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        setSuccessMessage("User registered successfully!");
        setLoading(false);
      }else if(response.status!==200) {
        setSuccessMessage('Try another username');
        setLoading(false);
      } else {
        alert("Try again");
        setLoading(false)
      }
    }
  }
  return (
    <div>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
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
            "Register"
          )}
        </button>
      {successMessage && <p style={{display:'block',fontWeight:"bold",color:'green',textAlign:"center"}}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
