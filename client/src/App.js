import "./App.css";
import React from "react";
import Homepage from "./components/Homepage/Homepage";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Layout from "./components/Layout";
import { UserContextProvider } from "./context/userContext";
import CreatePost from "./components/createNewPost/CreatePost";
import BlogPage from "./components/BlogPage/BlogPage";
import EditBlog from "./components/BlogPage/EditBlog";

function App() {
  return (
    <UserContextProvider>
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/createPost"} element={<CreatePost/>}/>
          <Route path={"/post/:id"} element={<BlogPage/>}/>
          <Route path={"/edit/:id"} element={<EditBlog/>}/>
        </Route>
      </Routes>
    </div>
    </UserContextProvider>
  );
}

export default App;
