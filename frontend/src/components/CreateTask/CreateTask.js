import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddCardIcon from "@mui/icons-material/AddCard";
import "./CreateTask.css";
import MetaData from "../Helmet/MetaData";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import moment from "moment";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Header from "../Header/Header";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getDelayedTask } from "../../Actions/taskActions";
import { Link, useParams } from "react-router-dom";
import { getSingleClientTasks } from "../../Actions/clientActions";
import { Tooltip } from "@mui/material";
import Fade from "@material-ui/core/Fade";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { getAllUsers } from "../../Actions/userActions";
import { useAlert } from "react-alert";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { SpinnerCircular } from "spinners-react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
//  for select

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  minWidth: 330,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  height: "60%",
};

//  for select

const CreateTask = () => {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.createtask);
  const {
    users,
    error: userserror,
    loading: userloading,
  } = useSelector((state) => state.users);
  const { task } = useSelector((state) => state.clienttask);
  const {
    task: createtask,
    loading: createtaskloading,
    error: createtaskerror,
  } = useSelector((state) => state.createtask);
  //  for select
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //  for select

  // date select
  const [startdate, setStartDate] = React.useState("");

  const handleChange = (date) => {
    setStartDate(date);
  };

  const [enddate, setEndDate] = React.useState("");

  const handleEndChange = (date) => {
    setEndDate(date);
  };

  // date select

  // GETING DETAILS OF INPUT
  const [taskname, setTaskname] = useState("");
  const [priority, setPriority] = useState("");
  const [email, setEmail] = useState("");
  const [reporter, setReporter] = useState("");

  console.log(id);

  const handlePost = async (e) => {
    e.preventDefault();
    console.log(taskname, priority, startdate, enddate, email, reporter);
    await dispatch(
      createTask(taskname, priority, startdate, enddate, email, reporter, id)
    );
    dispatch(getSingleClientTasks(id));
    setOpen(false);
  };

  console.log("USERS", users);

  useEffect(() => {
    if (createtaskerror) {
      alert.error(createtaskerror);
      dispatch({
        type: "ClearErrors"
      })
    }
    if (createtask) {
      alert.success("Task Created Successfully!");
      dispatch({
        type: "CreateTaskReset",
      });
    }
    dispatch(getSingleClientTasks(id));
    dispatch(getAllUsers());
    dispatch(getDelayedTask())
  }, [dispatch, id, createtaskerror, createtask, alert]);

  // TASK GRID
  const columns = [
    { field: "id", headerName: "ID", minWidth: 200, flex: 1 },
    {
      field: "Task",
      headerName: "Task",
      width: "200",
      flex: 1
    },
    {
      field: "Priority",
      headerName: "Priority",
      width: 100,
      flex: 1
    },
    {
      field: "IssueDate",
      headerName: "Issue Date",
      width: 150,
      flex: 1
    },
    {
      field: "DeliveryDate",
      headerName: "Delivery Date",
      width: 150,
      flex: 1
    },
    {
      field: "Asignee",
      headerName: "Asignee",
      width: 200,
      flex: 1
    },
    {
      field: "Reporter",
      headerName: "Reporter",
      width: 200,
      flex: 1
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
      flex: 1,
      cellClassName: (params) => {
        return params.getValue(params.id, "Status") === "Done"
          ? "green"
          : "red";
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      flex: 1.5,
      renderCell: (params) => {
        return (
          <div className="button-div">
            <Link to={`/task/details/${params.getValue(params.id, "id")}`}>
              <Tooltip
                title="View"
                placement="top-start"
                followCursor
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <Button>
                  <VisibilityIcon />
                </Button>
              </Tooltip>
            </Link>
            <Link to="">
              <Tooltip
                title="Delete"
                placement="top-start"
                followCursor
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <Button>
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </Link>
            <Link to={`/task/edit/${params.getValue(params.id, "id")}`}>
              <Tooltip
                title="Update"
                placement="top-start"
                followCursor
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <Button>
                  <EditOutlinedIcon />
                </Button>
              </Tooltip>
            </Link>
          </div>
        );
      },
    },
  ];

  const rows = [];

  task &&
    task.forEach((item) => {
      rows.push({
        id: item._id,
        Task: item.taskname,
        Priority: item.priority,
        IssueDate: moment(item.startdate).format("DD/MM/YYYY"),
        DeliveryDate: moment(item.enddate).format("DD/MM/YYYY"),
        Asignee: item.email,
        Reporter: item.reporter,
        Status: item.status,
      });
    });

  console.log("USERS", users);

  return (
    <>
      <MetaData title={`Home - Create Task`} />
      <Header />
      <div className="breadcrumb">
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="redirect" to="/">
            Home
          </Link>
          <Typography
            fontSize={14}
            fontFamily="'Poppins', 'sans-serif'"
            fontWeight={600}
            color="text.primary"
          >
            Create Task
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="crate-task">
        <Button
          className="CREATETASK"
          variant="contained"
          onClick={handleOpen}
          endIcon={<AddCardIcon />}
        >
          CREATE TASK
        </Button>
        <Modal
          className="modal-section"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="create-task">
              <h2 style={{ fontFamily: "'Poppins', 'sans-serif'", fontWeight: 600, fontSize: 18 }}>
                CREATE TASK!{" "}
              </h2>
              <span>
                <DriveFileRenameOutlineIcon />
              </span>
            </div>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { mt: 2, mb: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={(e) => handlePost(e)}
              >
                <TextField
                  id="outlined-basic"
                  label="Create Task"
                  variant="outlined"
                  onChange={(e) => setTaskname(e.target.value)}
                />
                <FormControl sx={{ mb: 3, minWidth: 300 }} size="small">
                  <InputLabel
                    id="demo-select-small"
                    style={{ fontFamily: "'Poppins', 'sans-serif'", fontWeight: 600, fontSize: 18 }}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    Priority
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Priority"
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Mid">Mid</MenuItem>
                    <MenuItem value="Lower">Low</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Start Date"
                      inputFormat="DD/MM/YYYY"
                      value={startdate}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                      label="End Date"
                      inputFormat="DD/MM/YYYY"
                      value={enddate}
                      onChange={handleEndChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>

                <FormControl sx={{ mb: 3, minWidth: 300 }} size="small">
                  <InputLabel
                    id="demo-select-small"
                    style={{ fontFamily: "'Poppins', 'sans-serif'", fontWeight: 600, fontSize: 18 }}
                  >
                    Assignee
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Client Type"
                    onChange={(e) => setEmail(e.target.value)}
                  >
                    {users && users.length > 0
                      ? users.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item.email}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                      : null}
                  </Select>
                </FormControl>
                <FormControl sx={{ mb: 3, minWidth: 300 }} size="small">
                  <InputLabel
                    id="demo-select-small"
                    style={{ fontFamily: "'Poppins', 'sans-serif'", fontWeight: 600, fontSize: 18 }}
                  >
                    Reporter
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Client Type"
                    onChange={(e) => setReporter(e.target.value)}
                  >
                    {users && users.length > 0
                      ? users.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item.email}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                      : null}
                  </Select>
                </FormControl>
                <Button
                  className="submit-button"
                  type="submit"
                  style={{ fontFamily: "'Poppins', 'sans-serif'", fontWeight: 600, fontSize: 18 }}
                  variant="contained"
                  endIcon={<AddCardIcon />}
                >
                  {
                    createtaskloading ? "Please wait..." : "Create Task"
                  }
                </Button>
              </Box>
            </Typography>
          </Box>
        </Modal>
      </div>
      {/* TASK DATA */}
      {
        createtaskloading ? <div className="spinner">
          <SpinnerCircular enabled={true} color='#000' size={30} thickness={300} />
        </div> : <div className="Create-data">
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              style={{ fontFamily: "'Poppins', 'sans-serif'", fontSize: "18px" }}
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              autoHeight
              sortingOrder="null"
            />
          </Box>
        </div>
      }
      {/* TASK DATA */}
    </>
  );
};

export default CreateTask;
