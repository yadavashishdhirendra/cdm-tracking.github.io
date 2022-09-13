import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { loadUser } from "../../Actions/userActions";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.Authentication);
  const location = useLocation();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      {isAuthenticated === true ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default ProtectedRoute;
