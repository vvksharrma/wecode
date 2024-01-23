import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../context/userContext";

const Header = () => {
  const {userInfo,setUserinfo} =useContext(userContext);
  const baseURL=process.env.REACT_APP_API_URL
  useEffect(() => {
    fetch(`${baseURL}/profile`, {
      credentials: "include",
    }).then(response => {
      return response.json().then((userInfo) => {
        setUserinfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`${baseURL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUserinfo(null);
  }
  return (
    <header>
      <Link to="/" className="logo">
        We Code.
      </Link>
      <p>Hi&nbsp;{userInfo?.username?(userInfo?.username):('world')}!</p>
      <nav>
        {userInfo?.username?(
          <>
            <Link to="/createPost">Create New Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
