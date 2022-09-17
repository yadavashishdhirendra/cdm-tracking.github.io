import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import { getSingleClientTasks } from '../../../Actions/clientActions';
import SideBar from '../Sidebar/SideBar';
import { Breadcrumbs, Tooltip, Typography } from "@mui/material";
import Fade from "@material-ui/core/Fade";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Box from "@mui/material/Box";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const Task = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { task, loading, error } = useSelector((state) => state.clienttask);

    useEffect(() => {
        dispatch(getSingleClientTasks(id));
    }, [dispatch, id])

    console.log(task, "CLIENT TASKS")

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
            width: 80,
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
            width: 100,
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
            width: 300,
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


    return (
        <div>
            <SideBar />
            <div className='left-side-content'>
                <div className="breadcrumb">
                    <Breadcrumbs aria-label="breadcrumb">
                        <p className="redirect" onClick={() => navigate(-1)}>
                            Clients List
                        </p>
                        <Typography
                            fontSize={14}
                            fontFamily="'Poppins', 'sans-serif'"
                            fontWeight={600}
                            color="text.primary"
                        >
                            Task List
                        </Typography>
                    </Breadcrumbs>
                </div>
                {
                    loading ? <div className="spinner">
                        <SpinnerCircular enabled={true} color='#000' size={30} thickness={300} />
                    </div> : <div className="Create-data">
                        <div>
                            <h3>Task Lists</h3>
                            <span>
                                <GroupOutlinedIcon />
                            </span>
                        </div>
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
            </div>
        </div>
    )
}

export default Task