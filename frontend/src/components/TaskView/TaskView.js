import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  addCommentInTask,
  addHour,
  addMinute,
  getHours,
  getHoursend,
  getSingleTask,
  updateProductiveHourTask,
  updateProductiveHourTasks,
  updateTaskStatus,
} from "../../Actions/taskActions";
import { getUsersEmail, loadUser } from "../../Actions/userActions";
import Header from "../Header/Header";
import "./TaskView.css";
import MetaData from "../Helmet/MetaData";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import moment from "moment";

const TaskView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { message: statusMessage, error: statusError } = useSelector(
    (state) => state.updatetask
  );
  const { message: hourMessage, error: hourError } = useSelector(
    (state) => state.productivehours
  );
  const { message: EndhourMessage, error: EndhourError } = useSelector(
    (state) => state.productivehoursend
  );
  const { task, error, loading } = useSelector((state) => state.singletask);
  const { users } = useSelector((state) => state.taskusers);
  const { starttime } = useSelector((state) => state.gethours);
  const { endtime } = useSelector((state) => state.productivehoursend);
  console.log("end:", endtime);
  console.log("STARTS", starttime);
  const { id } = useParams();
  const {
    message,
    error: commentError,
    loading: commentLoading,
  } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.Authentication);

  console.log(task, "TASKS");
  let totalMinute = 0;

  let totalHours = 0;
  task &&
    task.minutes.forEach((i) => {
      if (i.minute) {
        totalMinute += i.minute;
      } else {
        totalHours += i.hour;
      }
    });

  const [email, setEmail] = useState("");
  console.log(email);

  const [comment, setComment] = useState("");
  const handleComment = async (e) => {
    e.preventDefault();
    await dispatch(addCommentInTask(id, comment));
    dispatch(getSingleTask(id));
    setComment("");
  };

  const [status, setStatus] = useState("");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateTaskStatus(id, status));
    dispatch(getSingleTask(id));
  };

  const sendStartTime = async (e) => {
    setMinute(0);
    e.preventDefault();
    let starttime = new Date();
    await dispatch(updateProductiveHourTask(id, starttime));
    dispatch(getHours(id));
  };

  let calculated = 0;

  var now = "04/09/2013 15:00:00";
  var then = "04/09/2013 14:20:30";

  let calculatedDiff = moment
    .utc(
      moment(now, "DD/MM/YYYY HH:mm:ss").diff(
        moment(then, "DD/MM/YYYY HH:mm:ss")
      )
    )
    .format("HH:mm:ss");

  console.log("calculatedDiff", calculatedDiff);

  let hr = 0;

  if (starttime || endtime) {
    starttime &&
      starttime.forEach((start) => {
        return (
          endtime &&
          endtime.forEach((end) => {
            let hourDiif = moment.duration(
              moment(end.endtime).diff(moment(start.starttime))
            );
            var days = parseInt(hourDiif.asDays()); //84

            var hours = parseInt(hourDiif.asHours()); //2039 hours, but it gives total hours in given miliseconds which is not expacted.

            hours = hours - days * 24; // 23 hours

            hr = hours;

            var minutes = parseInt(hourDiif.asMinutes()); //122360 minutes,but it gives total minutes in given miliseconds which is not expacted.

            minutes = minutes - (days * 24 * 60 + hours * 60); //20 minutes.

            calculated = minutes;
          })
        );
      });
  }

  console.log(hr, "My Diif");

  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  console.log(status, minute, hour, "sss");

  // let minut = 0;
  // task.minutes &&
  //   task.minutes.map((i) => {
  //     minut += i.minute;
  //   });

  // console.log(minut, "s");

  useEffect(() => {
    if (calculated !== 0) {
      setMinute(calculated);
      setHour(hr);
      console.log(minute);
    } else {
      setMinute(0);
      setHour(0);
    }
    if (error) {
      alert.error(error);
    }
    if (task) {
      setEmail(task.email);
      setStatus(task.status);
    }
    if (!email) {
      dispatch(getSingleTask(id));
    } else {
      dispatch(getUsersEmail(email));
    }
    dispatch(loadUser());
  }, [dispatch, id, error, alert, email, task, calculated]);

  useEffect(() => {
    if (commentError) {
      alert.error("Please add comment!");
      dispatch({
        type: "clearErrors",
      });
    }
    if (message) {
      alert.success(message);
      dispatch({
        type: "AddCommentTaskReset",
      });
    }
    if (statusMessage) {
      alert.success(statusMessage);
      dispatch({
        type: "UpdateTaskStatusReset",
      });
    }
    if (statusError) {
      alert.error(statusError);
      dispatch({
        type: "ClearErrors",
      });
    }
  }, [
    dispatch,
    commentError,
    message,
    alert,
    statusMessage,
    statusError,
    minute,
  ]);

  const sendEndTime = async (e) => {
    e.preventDefault();
    let endtime = new Date();
    await dispatch(updateProductiveHourTasks(id, endtime));
    dispatch(getHoursend(id));
  };

  useEffect(() => {
    if (hourMessage) {
      alert.success(hourMessage);
      dispatch({
        type: "UpdateTaskProductiveHoursReset",
      });
    }
    if (EndhourMessage) {
      alert.success(EndhourMessage);
      dispatch({
        type: "UpdateTaskProductiveHoursEndReset",
      });
    }
    if (EndhourError) {
      alert.error(EndhourError);
      dispatch({
        type: "ClearErrors",
      });
    }
    if (hourError) {
      alert.error(hourError);
      dispatch({
        type: "ClearErrors",
      });
    }
    dispatch(getHours(id));
    dispatch(getHoursend(id));
  }, [
    dispatch,
    hourMessage,
    hourError,
    alert,
    id,
    EndhourError,
    EndhourMessage,
  ]);

  console.log("USERS", users);

  const sendMinutes = async (e) => {
    e.preventDefault();
    await dispatch(addMinute(id, minute));
    dispatch(addHour(id, hour));
    dispatch(getSingleTask(id));
    setMinute(0);
    setHour(0);
  };

  return (
    <>
      <Header />
      <div className="breadcrumb">
        <Breadcrumbs aria-label="breadcrumb">
          <p className="redirect" onClick={() => navigate(-1)}>
            Create Task
          </p>
          <Typography
            fontSize={18}
            fontFamily="Rokkitt_Medium"
            color="text.primary"
          >
            Task Details
          </Typography>
        </Breadcrumbs>
      </div>
      {task && (
        <>
          <MetaData
            title={`${task.taskname} - Reporting to ${task.reporter}`}
          />
          <div className="task-info">
            <div className="task-name">
              <h1>Issue : {task.taskname}</h1>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                  mt: 3,
                }}
              >
                <h4 className="dicussion-headline">Let's Discuss!</h4>
                <form onSubmit={(e) => handleComment(e)}>
                  <TextField
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    label="Comment"
                  />
                  <div className="auto-ms">
                    <Button type="submit" variant="contained">
                      Send
                    </Button>
                  </div>
                </form>
              </Box>
              <div className="comment-scroll">
                {task && task.comments.length > 0
                  ? task.comments.map((comment) => {
                      return (
                        <div className="card" key={comment._id}>
                          <div className="comment-ms">
                            <div className="comment-user-info">
                              <div className="comment-div">
                                <p>
                                  {comment.user.name.length > 2
                                    ? comment.user.name.slice(0, 1)
                                    : comment.user.name}
                                </p>
                              </div>
                              <p>{comment.user.name} Commented</p>
                            </div>
                            <div>
                              <Button>
                                <DeleteOutlineIcon />
                              </Button>
                            </div>
                          </div>
                          <p className="comment">- {comment.comment}</p>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div>
              {users && (
                <div className="asignee-info">
                  <div>
                    {users.name.length > 2
                      ? users.name.slice(0, 1)
                      : users.name}
                  </div>
                  <p>
                    {users.email === task.reporter
                      ? users.name + " " + "Assigned You a task!"
                      : users.name + " " + "Reporting to" + " " + task.reporter}
                  </p>
                  {/* <p className="inprogress">
                    {task.status === "In Progress" ? (
                      <span className="in">●</span>
                    ) : (
                      <span className="out">●</span>
                    )}
                  </p> */}
                </div>
              )}
              <div>
                <form
                  className="status-progress"
                  onSubmit={(e) => handleStatusUpdate(e)}
                >
                  <div>
                    <FormControl
                      sx={{ mt: 3, mb: 3, minWidth: "100%" }}
                      size="small"
                    >
                      <InputLabel
                        id="demo-select-small"
                        style={{ fontFamily: "Rokkitt_Medium", fontSize: 18 }}
                        onChange={handleStatusChange}
                      >
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value="Todo">Todo</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                        {user.email === task.reporter ? (
                          <MenuItem value="Extension">Extension</MenuItem>
                        ) : null}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <Button type="submit" variant="contained">
                      Update
                    </Button>
                  </div>
                </form>
              </div>
              <div className="button-spacearound">
                {task.status === "In Progress" ? (
                  <>
                    <Button
                      onClick={(e) => sendStartTime(e)}
                      type="submit"
                      variant="contained"
                    >
                      Start
                    </Button>
                    <Button
                      onClick={(e) => sendEndTime(e)}
                      type="submit"
                      variant="contained"
                    >
                      Stop
                    </Button>
                  </>
                ) : null}
              </div>
              <div className="time-scope">
                <div>
                  {starttime && starttime.length > 0
                    ? starttime.map((time) => {
                        return (
                          <div key={time._id}>
                            <div className="border">
                              <p className="time">
                                Start:{" "}
                                {moment(time.starttime).format(
                                  "DD/MM/YYYY hh:mm:ss a"
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
                <div>
                  {endtime && endtime.length > 0
                    ? endtime.map((time) => {
                        return (
                          <div key={time._id}>
                            <div className="border">
                              <p className="time">
                                End:{" "}
                                {moment(time.endtime).format(
                                  "DD/MM/YYYY hh:mm:ss a"
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
              <div className="button-send-minutes">
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={(e) => sendMinutes(e)}
                >
                  Submit
                </Button>
                <h5 className="productive-hours">
                  Total Productive Hours: {totalHours} hrs {totalMinute}{" "}
                  minutes.
                </h5>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TaskView;
