import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTasks, loadUser } from "../../Actions/userActions";
import Header from "../Header/Header";
import MetaData from "../Helmet/MetaData";
import "./Profile.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { getDelayedTask } from "../../Actions/taskActions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import Fade from "@material-ui/core/Fade";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.Authentication);
  const { task } = useSelector((state) => state.task);
  const { task: DelayedTask } = useSelector((state) => state.delayedTask);

  console.log("DelayedTask",DelayedTask)

  // TASK GRID
  const columns = [
    { field: "id", headerName: "ID", minWidth: 200, flex: 0.5 },
    {
      field: "Task",
      headerName: "Task",
      width: "200",
    },
    {
      field: "Priority",
      headerName: "Priority",
      width: 400,
    },
    {
      field: "IssueDate",
      headerName: "Issue Date",
      width: 300,
    },
    {
      field: "DeliveryDate",
      headerName: "Delivery Date",
      width: 300,
    },
    {
      field: "Asignee",
      headerName: "Asignee",
      width: 300,
    },
    {
      field: "Reporter",
      headerName: "Reporter",
      width: 300,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 300,
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
          </div>
        );
      },
    },
  ];

  const rows = [];

  DelayedTask &&
    DelayedTask.forEach((item) => {
      rows.push({
        id: item._id,
        Task: item.taskname,
        Priority: item.priority,
        IssueDate: moment(item.startdate).format("DD/MM/YYYY"),
        DeliveryDate: moment(item.enddate).format("DD/MM/YYYY"),
        Asignee: item.email,
        Reporter: item.reporter,
        Status: "Delayed",
      });
    });

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getUserTasks());
    dispatch(getDelayedTask());
  }, [dispatch]);

  return (
    <>
      <Header />
      <MetaData title={`${user.name}'s Profile`} />
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
            Profile
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="container-profile">
        <div>
          <h3>Delayed Tasks -</h3>
          <div className="delayed-container">
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                style={{ fontFamily: "'Poppins', 'sans-serif'",fontWeight:600, fontSize: "18px" }}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                autoHeight
                sortingOrder="null"
              />
            </Box>
          </div>
        </div>
        <div>
          <div className="user-info">
            <div className="user-letter">
              {user.name.length > 2 ? user.name.slice(0, 1) : user.name}
            </div>
            <h4 className="user-name">{user.name}</h4>
          </div>
          <div>
            {task && task.length > 0
              ? task.map((item) => {
                  return (
                    <div className="notify-container" key={item._id}>
                      <div className="user-group">
                        <div className="user-icons">
                          <p>
                            {item.reporter.length > 2
                              ? item.reporter.slice(0, 1)
                              : item.reporter}
                          </p>
                          <h5>{item.reporter} assigned you a task.</h5>
                        </div>
                      </div>
                      <div className="info-date">
                        <p className="startdate">
                          Start Date: &nbsp;
                          {moment(item.startdate).format("DD/MM/YYYY")}
                        </p>
                        <p className="status">
                          {item.status === "In Progress" ? (
                            <span className="red">●</span>
                          ) : (
                            <span>●</span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
