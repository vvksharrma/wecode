import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../context/userContext";
import Cookies from "js-cookie";

const Header = () => {
  const {userInfo,setUserinfo} =useContext(userContext);
  const baseURL=process.env.REACT_APP_API_URL
  const token=Cookies.get('token')
  useEffect(() => {
    fetch(`${baseURL}/profile`, {
      credentials: "include",
      // headers: {
      //   'Authorization': `Bearer ${token}`
      // },
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
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    setUserinfo(null);
    setTimeout(function(){
      alert("Logged out")
    }, 1500);
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
            <Link to={"/"} onClick={logout}>Logout</Link>
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
