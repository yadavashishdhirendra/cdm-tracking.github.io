import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { loadUser } from "../../Actions/userActions";

const AdminProtectedRoute = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Authentication);
  const location = useLocation();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      {user && user.userRole === "Admin" ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default AdminProtectedRoute;
