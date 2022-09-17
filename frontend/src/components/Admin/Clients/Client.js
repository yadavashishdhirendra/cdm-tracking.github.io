import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../Header/Header'
import SideBar from '../Sidebar/SideBar'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Breadcrumbs, Tooltip, Typography } from "@mui/material";
import Fade from "@material-ui/core/Fade";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getClients } from '../../../Actions/clientActions'
import MetaData from '../../Helmet/MetaData'

const Client = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const { clients, error, loading } = useSelector((state) => state.clients)

    const columns = [
        { field: "id", headerName: "ID", width: 250, flex: 1 },
        {
            field: "ClientName",
            headerName: "Client Name",
            width: "180",
            flex: 1
        },
        {
            field: "ClientEmail",
            headerName: "Client Email",
            width: 230,
            flex: 1
        },
        {
            field: "Service",
            headerName: "Service",
            width: 200,
            flex: 1
        },
        {
            field: "Actions",
            headerName: "Actions",
            width: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="button-div">
                        <Link to={`/task/${params.getValue(params.id, "id")}`}>
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
                        <Tooltip
                            title="Delete"
                            placement="top-start"
                            followCursor
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 600 }}
                        >
                            <Button
                            // onClick={() =>
                            //     deleteInvoiceHandler(params.getValue(params.id, "id"))
                            // }
                            >
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    const rows = [];

    clients &&
        clients.forEach((item) => {
            rows.push({
                id: item._id,
                ClientName: item.clientname,
                ClientEmail: item.clientemail,
                Service: item.clienttype,
            });
        });

    useEffect(() => {
        dispatch(getClients(id))
    }, [dispatch, id])


    return (
        <div>
            <SideBar />
            <MetaData title={`Clients`} />
            <div className='left-side-content'>
                <div className="breadcrumb">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className="redirect" to="/admindashboard">
                            Home
                        </Link>
                        <Typography
                            fontSize={14}
                            fontFamily="poppins_medium"
                            color="text.primary"
                        >
                            Client List
                        </Typography>
                    </Breadcrumbs>
                </div>
                <div className="Create-data">
                    <div>
                        <h3>Client Lists</h3>
                        <span>
                            <GroupOutlinedIcon />
                        </span>
                    </div>
                    <Box sx={{ height: 400, width: "100%" }}>
                        <DataGrid
                            style={{ fontFamily: "poppins_medium", fontSize: "18px" }}
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                            autoHeight
                        />
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Client