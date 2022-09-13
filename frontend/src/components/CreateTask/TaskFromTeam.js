import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import Fade from "@material-ui/core/Fade";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { getSingleClientTasks } from "../../Actions/clientActions";
import { useDispatch, useSelector } from "react-redux";
import { getUserTasks, loadUser } from "../../Actions/userActions";
import "./CreateTask.css";

const TaskFromTeam = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user, error, loading } = useSelector((state) => state.Authentication);
  const { task } = useSelector((state) => state.task);
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

  console.log(user._id, "User Id");

  const rows = [];

  task &&
    task.forEach((item) => {
      if (user._id === item.owner) {
        return null;
      } else {
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
      }
    });

  console.log("USER", user);

  useEffect(() => {
    dispatch(getSingleClientTasks(id));
    dispatch(getUserTasks());
    dispatch(loadUser());
  }, [dispatch, id]);

  return (
    <div className="Create-data">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          style={{ fontFamily: "Rokkitt_Medium", fontSize: "18px" }}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          autoHeight
          sortingOrder="null"
        />
      </Box>
    </div>
  );
};

export default TaskFromTeam;
