import React, { useEffect } from "react";
import "./CreateList.css";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClientWithTask,
  getOwnClients,
} from "../../Actions/clientActions";
import { useAlert } from "react-alert";
import { SpinnerCircular } from 'spinners-react';

const CreateList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { clients, error, loading } = useSelector(
    (state) => state.getownclients
  );

  const {
    message,
    error: deleteerror,
    loading: deleteloading,
  } = useSelector((state) => state.deleteClient);
  console.log(clients);
  const columns = [
    { field: "id", headerName: "ID", width: 250,flex:1 },
    {
      field: "ClientName",
      headerName: "Client Name",
      width: "180",
      flex:1
    },
    {
      field: "ClientEmail",
      headerName: "Client Email",
      width: 230,
      flex:1
    },
    {
      field: "Service",
      headerName: "Service",
      width: 200,
      flex:1
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      flex:1,
      renderCell: (params) => {
        return (
          <div className="button-div">
            <Link to={`/createtask/${params.getValue(params.id, "id")}`}>
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
                onClick={() =>
                  deleteInvoiceHandler(params.getValue(params.id, "id"))
                }
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

  const deleteInvoiceHandler = async (id) => {
    await dispatch(deleteClientWithTask(id));
    dispatch(getOwnClients());
  };

  useEffect(() => {
    if (message) {
      alert.success("Client Deleted Success!");
      dispatch({
        type: "delclientwithtaskReset",
      });
    }
    if (error) {
      alert.error(error);
      dispatch({
        type: "clearErrors",
      });
    }
    dispatch(getOwnClients());
  }, [dispatch, message, error]);
  return (
    <>
      {
        loading ? <div className="spinner">
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
    </>
  );
};

export default CreateList;
