import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post(
      "/api/v2/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get("/api/v2/me");
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post("/api/v2/logout");
    dispatch({
      type: "LogoutSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutFail",
      payload: error.response.data.message,
    });
  }
};

export const RegisterUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });
    const { data } = await axios.post(
      "/api/v2/register",
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "RegisterSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });
    const { data } = await axios.get("/api/v2/users");
    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: "getUserTaskRequest",
    });
    const { data } = await axios.get("/api/v2/get/user/details");
    dispatch({
      type: "getUserTaskSuccess",
      payload: data.task,
    });
  } catch (error) {
    dispatch({
      type: "getUserTaskFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUsersEmail = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "getUsersByEmailRequest",
    });
    const { data } = await axios.post("/api/v2/task/users", { email });
    dispatch({
      type: "getUsersByEmailSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getUsersByEmailFailure",
      payload: error.response.data.message,
    });
  }
};
