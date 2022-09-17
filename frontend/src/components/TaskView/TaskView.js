import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  addCommentInTask,
  addHour,
  addLink,
  addMinute,
  addSeconds,
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
import { SpinnerCircular } from "spinners-react";

const TaskView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { message: statusMessage, error: statusError } = useSelector(
    (state) => state.updatetask
  );
  const { message: hourMessage, error: hourError, loading: hourloading } = useSelector(
    (state) => state.productivehours
  );
  const { message: EndhourMessage, error: EndhourError, loading: loadloading } = useSelector(
    (state) => state.productivehoursend
  );
  const { message: linkmessage, error: linkerror, loading: linkLoading } = useSelector((state) => state.link)
  const { task, error } = useSelector((state) => state.singletask);
  const { users } = useSelector((state) => state.taskusers);
  const { starttime } = useSelector((state) => state.gethours);
  const { endtime } = useSelector((state) => state.productivehoursend);
  const { message: updateProduct } = useSelector((state) => state.minutes)
  const { id } = useParams();
  const {
    message,
    error: commentError,
    loading: commentLoading,
  } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.Authentication);

  console.log(task, "TASKS");

  let TaskMinutes = 0;
  let TaskHour = 0;
  let TaskSeconds = 0;

  task && task.minutes.forEach((time) => {
    return (
      TaskMinutes += time.minute
    )
  })

  task && task.minutes.forEach((time) => {
    return (
      TaskHour += time.hour
    )
  })

  task && task.minutes.forEach((time) => {
    return (
      TaskSeconds += time.seconds
    )
  })

  console.log(TaskHour, TaskMinutes, TaskSeconds, "Balle")

  const [email, setEmail] = useState("");
  console.log(email);

  const [comment, setComment] = useState("");
  const handleComment = async (e) => {
    e.preventDefault();
    await dispatch(addCommentInTask(id, comment));
    dispatch(getSingleTask(id));
    setComment("");
  };

  const [link, setLink] = useState("")

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
    e.preventDefault();
    let starttime = moment().format("DD/MM/YYYY HH:mm:ss")
    await dispatch(updateProductiveHourTask(id, starttime));
    dispatch(getHours(id));
  };

  useEffect(() => {
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
  }, [dispatch, id, error, alert, email, task]);

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
  ]);

  let firstArr = []
  let secondArr = []

  starttime && starttime.forEach((i) => {
    firstArr.push(i.starttime)
  })

  endtime && endtime.forEach((i) => {
    secondArr.push(i.endtime)
  })

  console.log(firstArr, "MY FIRST ARR")
  console.log(secondArr, "MY SECOND ARR")

  let lastEleFirstArr = firstArr.pop();
  console.log(lastEleFirstArr, "First ARR")

  let lastEleSecondArr = secondArr.pop();
  console.log(lastEleSecondArr, "Second ARR")

  let [hour, setHour] = useState(0)
  let [minute, setMinute] = useState(0)
  let [seconds, setSeconds] = useState(0)



  if (lastEleFirstArr || lastEleSecondArr) {
    var now = lastEleSecondArr;
    var then = lastEleFirstArr;
    let dd = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
    console.log(dd, "sss")
    let splitting = dd.split(":")
    hour = parseInt(splitting[0])
    minute = parseInt(splitting[1])
    seconds = parseInt(splitting[2])
    console.log(hour, minute, seconds, "all")
  }

  const handleLink = async (e) => {
    e.preventDefault()
    await dispatch(addLink(id, link))
    dispatch(getSingleTask(id));
  }

  const sendEndTime = async (e) => {
    e.preventDefault();
    let endtime = moment().format("DD/MM/YYYY HH:mm:ss")
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
    EndhourMessage,
    EndhourError,
    hourError,
    alert,
    id,
  ]);

  const sendProductive = () => {
    dispatch(addHour(id, hour))
    dispatch(addMinute(id, minute))
    dispatch(addSeconds(id, seconds))
    setHour(0)
    setMinute(0)
    setSeconds(0)
  }

  useEffect(() => {
    if (updateProduct) {
      alert.success(updateProduct);
      dispatch({
        type: "UpdateTaskProductiveHoursReset",
      });
      dispatch(getSingleTask(id));
    }
    if (linkmessage) {
      alert.success(linkmessage)
      dispatch({
        type: "addLinkReset"
      })
    }
    if (linkerror) {
      alert.error(linkerror)
      dispatch({
        type: "clearErrors"
      })
    }
  }, [dispatch, updateProduct, alert, id, linkmessage, linkerror])


  console.log("USERS", users);



  return (
    <>
      <Header />
      <div className="breadcrumb">
        <Breadcrumbs aria-label="breadcrumb">
          <p className="redirect" onClick={() => navigate(-1)}>
            Create Task
          </p>
          <Typography
            fontSize={16}
            fontFamily="'Poppins', 'sans-serif'"
            fontWeight={600}
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
                <form className="add-link" onSubmit={(e) => handleLink(e)}>
                  <TextField
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    fullWidth
                    label="Add Link"
                  />
                  <div>
                    <Button type="submit" variant="contained">
                      Add Link
                    </Button>
                  </div>
                </form>
                <form onSubmit={(e) => handleComment(e)}>
                  <TextField
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    label="Comment"
                  />
                  <div className="auto-ms">
                    {
                      commentLoading ? <SpinnerCircular enabled={true} color='#000' size={30} thickness={300} /> : <Button type="submit" variant="contained">
                        Send
                      </Button>
                    }
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
              <div className="link-storage">
                <h4>Link Storage: </h4>
                {
                  task && task.alllinks.length > 0 ? task.alllinks.map((i) => {
                    return (
                      <div className="link-storage" key={i._id}>
                        <Link to={`${i.link}`}>{i.link}</Link>
                      </div>
                    )
                  }) : null
                }
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
                      ? users.name + " " + "Byself Assigned a Task!"
                      : users.name + " " + "Reporting to" + " " + task.reporter}
                  </p>
                </div>
              )}
              <div>
                {
                  task && task.status === 'Done' && user.userRole === 'User' ? null  :<form
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
                          style={{ fontFamily: "'Poppins', 'sans-serif'", fontWeight: 600, fontSize: 18 }}
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
                }
              </div>
              <div className="button-spacearound">
                {task.status === "In Progress" || task.status === 'Extension' ? (
                  <>
                    <Button
                      onClick={(e) => sendStartTime(e)}
                      type="submit"
                      variant="contained"
                    // disabled={hourloading || loadloading ? true : false}
                    >
                      Start
                    </Button>
                    <Button
                      onClick={(e) => sendEndTime(e)}
                      type="submit"
                      // disabled={hourloading || loadloading ? true : false}
                      variant="contained"
                    >
                      Stop
                    </Button>
                  </>
                ) : null}
              </div>
              <div className="start-end-grid">
                <div>
                  <p>Start Time:</p>
                </div>
                <div>
                  <p>End Time:</p>
                </div>
              </div>
              <div className="time-scope">
                <div>
                  {starttime && starttime.length > 0
                    ? starttime.map((time) => {
                      return (
                        <div key={time._id}>
                          <div className="border">
                            <p className="time">
                              {/* Start:{" "} */}
                              {time.starttime}
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
                              {/* End:{" "} */}
                              {time.endtime}
                            </p>
                          </div>
                        </div>
                      );
                    })
                    : null}
                </div>
              </div>
              <div className="btn">
                <Button type="submit" variant="contained" onClick={sendProductive}>Send Productive Time</Button>
              </div>
              <h4 className="productive-hours">{TaskHour} Hour {TaskMinutes} Minutes {TaskSeconds} Seconds</h4>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TaskView;


