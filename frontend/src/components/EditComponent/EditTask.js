import { Breadcrumbs, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSingleTask } from '../../Actions/taskActions';
import { getAllUsers } from '../../Actions/userActions';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Box } from '@mui/system';
import './Edittask.css'
import AddCardIcon from "@mui/icons-material/AddCard";
import { SpinnerCircular } from 'spinners-react';

const EditTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()
    const {
        users,
        error: userserror,
        loading: userloading,
    } = useSelector((state) => state.users);
    const { task, error, loading } = useSelector((state) => state.singletask);

    const [startdate, setStartDate] = React.useState("");

    const handleChange = (date) => {
        setStartDate(date);
    };

    const [enddate, setEndDate] = React.useState("");

    const handleEndChange = (date) => {
        setEndDate(date);
    };

    const [taskname, setTaskname] = useState("");
    const [priority, setPriority] = useState("");
    const [email, setEmail] = useState("");
    const [reporter, setReporter] = useState("");

    useEffect(() => {
        if (id) {
            dispatch(getSingleTask(id))
        }
        dispatch(getSingleTask(id))
        dispatch(getAllUsers());
    }, [dispatch, id])

    console.log(task, id)
    return (
        <>
            <div className="breadcrumb">
                <Breadcrumbs aria-label="breadcrumb">
                    <p className="redirect" onClick={() => navigate(-1)}>
                        Task List
                    </p>
                    <Typography
                        fontSize={14}
                        fontFamily="'Poppins', 'sans-serif'"
                        fontWeight={600}
                        color="text.primary"
                    >
                        Edit Task
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className='edit-container'>
                {
                    loading ? <div className="spinner">
                        <SpinnerCircular enabled={true} color='#000' size={30} thickness={300} />
                    </div> : <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { mt: 2, mb: 1, width: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                    // onSubmit={(e) => handlePost(e)}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Create Task"
                            variant="outlined"
                            onChange={(e) => setTaskname(e.target.value)}
                            defaultValue={task && task.taskname}
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
                                defaultValue={task && task.priority}
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
                                    defaultValue={task && task.startdate}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <DesktopDatePicker
                                    label="End Date"
                                    inputFormat="DD/MM/YYYY"
                                    defaultValue={task && task.enddate}
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
                                defaultValue={task && task.email}
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
                                defaultValue={task && task.reporter}
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
                            Update Task
                        </Button>
                    </Box>
                }
            </div >
        </>
    )
}

export default EditTask