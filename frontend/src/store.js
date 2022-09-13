import { configureStore } from "@reduxjs/toolkit";
import {
  createClientReducer,
  deleteclient,
  getOwnClientReducer,
  getsingleClientTask,
} from "./Reducers/clientReducer";
import {
  addComment,
  addHour,
  addMinutes,
  createTaskReducer,
  getDelayedTask,
  getProductiveHours,
  getProductiveHoursEnd,
  getSingleTask,
  updateProductiveTime,
  updateProductiveTimeEnd,
  updateTaskStatus,
} from "./Reducers/taskReducer";
import {
  AuthReducer,
  getUsers,
  getUsersByEmail,
  getUsersTasks,
} from "./Reducers/userReducer";

const store = configureStore({
  reducer: {
    Authentication: AuthReducer,
    createclient: createClientReducer,
    getownclients: getOwnClientReducer,
    createtask: createTaskReducer,
    clienttask: getsingleClientTask,
    deleteClient: deleteclient,
    users: getUsers,
    task: getUsersTasks,
    singletask: getSingleTask,
    taskusers: getUsersByEmail,
    comment: addComment,
    updatetask: updateTaskStatus,
    productivehours: updateProductiveTime,
    productivehoursend: getProductiveHoursEnd,
    gethours: getProductiveHours,
    delayedTask: getDelayedTask,
    minutes: addMinutes,
    hour: addHour,
  },
});

export default store;
