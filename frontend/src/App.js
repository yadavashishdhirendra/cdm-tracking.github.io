import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadUser } from "./Actions/userActions";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import UserProfile from "./components/Profile/UserProfile";
import CreateTask from "./components/CreateTask/CreateTask";
import store from "./store";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import TaskView from "./components/TaskView/TaskView";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/createtask/:id" element={<CreateTask />} />
          <Route path="/task/details/:id" element={<TaskView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
