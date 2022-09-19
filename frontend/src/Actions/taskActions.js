import axios from "axios";

export const createTask =
  (taskname, priority, startdate, enddate, email, reporter, id) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "CreateTaskRequest",
      });
      const { data } = await axios.post(
        "/api/v2/create-task",
        { taskname, priority, startdate, enddate, email, reporter, id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "CreateTaskSuccess",
        payload: data.task,
      });
    } catch (error) {
      dispatch({
        type: "CreateTaskFailure",
        payload: error.response.data.message,
      });
    }
  };

export const getSingleTask = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getsingleTaskRequest",
    });
    const { data } = await axios.get(`/api/v2/task/details/${id}`);
    dispatch({
      type: "getsingleTaskSuccess",
      payload: data.task,
    });
  } catch (error) {
    dispatch({
      type: "getsingleTaskFailure",
      payload: error.response.data.message,
    });
  }
};

export const addCommentInTask = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "AddCommentTaskRequest",
    });
    const { data } = await axios.put(`/api/v2/comment/${id}`, { comment });
    dispatch({
      type: "AddCommentTaskSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "AddCommentTaskFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateTaskStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateTaskStatusRequest",
    });
    const { data } = await axios.put(`/api/v2/update/task/status/${id}`, {
      status,
    });
    dispatch({
      type: "UpdateTaskStatusSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateTaskStatusFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateProductiveHourTask = (id, starttime) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateTaskProductiveHoursRequest",
    });
    const { data } = await axios.put(`/api/v2/update/task/time/${id}`, {
      starttime,
    });
    dispatch({
      type: "UpdateTaskProductiveHoursSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateTaskProductiveHoursFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateProductiveHourTasks = (id, endtime) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateTaskProductiveHoursEndRequest",
    });
    const { data } = await axios.put(`/api/v2/update/task/endtime/${id}`, {
      endtime,
    });
    dispatch({
      type: "UpdateTaskProductiveHoursEndSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateTaskProductiveHoursEndFailure",
      payload: error.response.data.message,
    });
  }
};

export const getHours = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductiveHoursRequest",
    });
    const { data } = await axios.get(`/api/v2/get/hours/${id}`);
    dispatch({
      type: "getProductiveHoursSuccess",
      payload: data.starttime,
    });
  } catch (error) {
    dispatch({
      type: "getProductiveHoursFailure",
      payload: error.response.data.message,
    });
  }
};

export const getHoursend = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductiveHoursEndRequest",
    });
    const { data } = await axios.get(`/api/v2/get/hours/${id}`);
    dispatch({
      type: "getProductiveHoursEndSuccess",
      payload: data.endtime,
    });
  } catch (error) {
    dispatch({
      type: "getProductiveHoursEndFailure",
      payload: error.response.data.message,
    });
  }
};

export const getDelayedTask = () => async (dispatch) => {
  try {
    dispatch({
      type: "getDelayedTaskRequest",
    });
    const { data } = await axios.get(`/api/v2/get/delayed/task`);
    dispatch({
      type: "getDelayedTaskSuccess",
      payload: data.task,
    });
  } catch (error) {
    dispatch({
      type: "getDelayedTaskFailure",
      payload: error.response.data.message,
    });
  }
};

export const addMinute = (id, minute) => async (dispatch) => {
  try {
    dispatch({
      type: "addMinutesInTaskRequest",
    });
    const { data } = await axios.put(`/api/v2/add/task/minutes/${id}`, {
      minute,
    });
    dispatch({
      type: "addMinutesInTaskSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addMinutesInTaskFailure",
      payload: error.response.data.message,
    });
  }
};

export const addHour = (id, hour) => async (dispatch) => {
  try {
    dispatch({
      type: "addMinutesInTaskRequest",
    });
    const { data } = await axios.put(`/api/v2/add/task/minutes/${id}`, {
      hour,
    });
    dispatch({
      type: "addMinutesInTaskSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addMinutesInTaskFailure",
      payload: error.response.data.message,
    });
  }
};


export const addSeconds = (id, seconds) => async (dispatch) => {
  try {
    dispatch({
      type: "addMinutesInTaskRequest",
    });
    const { data } = await axios.put(`/api/v2/add/task/minutes/${id}`, {
      seconds,
    });
    dispatch({
      type: "addMinutesInTaskSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addMinutesInTaskFailure",
      payload: error.response.data.message,
    });
  }
};


export const addLink = (id,link) => async (dispatch) => {
  try {
    dispatch({
      type: "addLinkRequest",
    });
    const { data } = await axios.put(`/api/v2/add/link/${id}`,{
      link
    });
    dispatch({
      type: "addLinkSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addLinkFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllTaskSpecificAccount = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllTaskSpecificuserRequest",
    });
    const { data } = await axios.get(`/api/v2/get/task/users/${id}`);
    dispatch({
      type: "getAllTaskSpecificuserSuccess",
      payload: data.tasks,
    });
  } catch (error) {
    dispatch({
      type: "getAllTaskSpecificuserFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateTaskAll = (id, taskname, priority, email, reporter, startdate, enddate) => async (dispatch) => {
  try {
    dispatch({
      type: "updateTaskRequest",
    });
    const { data } = await axios.put(`/api/v2/update/task/${id}`, {
      taskname, priority, email, reporter, startdate, enddate
    });
    dispatch({
      type: "updateTaskSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateTaskFailure",
      payload: error.response.data.message,
    });
  }
};