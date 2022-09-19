import { configureStore } from "@reduxjs/toolkit";
import {
  createClientReducer,
  deleteclient,
  getAllClients,
  getOwnClientReducer,
  getSingleClients,
  getsingleClientTask,
  updateClient,
} from "./Reducers/clientReducer";
import {
  addComment,
  addHour,
  addLink,
  addMinutes,
  createTaskReducer,
  getAllTaskSpecificUser,
  getDelayedTask,
  getProductiveHours,
  getProductiveHoursEnd,
  getSingleTask,
  updateProductiveTime,
  updateTask,
  updateTaskStatus,
} from "./Reducers/taskReducer";
import {
  AuthReducer,
  getSingleUser,
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
    clients: getAllClients,
    link: addLink,
    clientdetails: getSingleClients,
    singleUserReport: getSingleUser,
    reportTask: getAllTaskSpecificUser,
    clientUpdate: updateClient,
    taskupdate: updateTask
  },
});

export default store;
