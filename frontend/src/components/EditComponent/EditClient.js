import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import './Edittask.css'
import { getSingleClient, updateClient } from "../../Actions/clientActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import { Breadcrumbs, Typography } from "@mui/material";
import { useAlert } from "react-alert";

const EditClient = () => {
    const dispatch = useDispatch();
    const { clients, error, loading: clientvalueLoading } = useSelector((state) => state.clientdetails)
    const { message, error: clientUpdateError, loading } = useSelector((state) => state.clientUpdate)
    const [clientname, setClientName] = useState("");
    const [clienttype, setClientType] = useState("");
    const [clientemail, setClientEmail] = useState("");
    const [mobileno, setMobileno] = useState("");
    const alert = useAlert();
    const { id } = useParams();
    console.log(id, "NAMASTEY LONDON")

    const handleClientUpdate = async (e) => {
        e.preventDefault();
        await dispatch(updateClient(id, clientname, clienttype, clientemail, mobileno))
        dispatch(getSingleClient(id))
        // console.log()
    }

    console.log(clients, "xuu")

    useEffect(() => {
        if (error) {
            alert.error(error)
        }
        if (message) {
            alert.success(message)
            dispatch({
                type: "UpdateClientReset"
            })
        }
        // dispatch(getSingleClient(id))
    }, [dispatch, id, error, alert, message])

    const [client, setClient] = useState([])

    useEffect(() => {
        const handleClient = async () => {
            await dispatch(getSingleClient(id))
            setClient(clients)
        }
        handleClient();
    }, [dispatch])

    useEffect(() => {
        if (clients) {
            setClientName(clients.clientname)
            setClientType(clients.clienttype)
            setClientEmail(clients.clientemail)
            setMobileno(clients.mobileno)
        }
    }, [clients])


    console.log(client, "xyx")
    return (
        <>
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
                        Edit Client
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className='edit-container'>
                {
                    loading || clientvalueLoading ? <div className="spinner">
                        <SpinnerCircular enabled={true} color='#000' size={30} thickness={300} />
                    </div> : <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { mt: 2, mb: 1, width: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => handleClientUpdate(e)}
                    >
                        <TextField
                            // sx={{ field }}
                            id="outlined-basic"
                            label="Client Name"
                            variant="outlined"
                            value={clientname}
                            onChange={(e) => setClientName(e.target.value)}
                        />
                        <FormControl sx={{ mb: 3, minWidth: 120 }} size="small">
                            <InputLabel
                                id="demo-select-small"
                            >
                                Client Type
                            </InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={clienttype}
                                label="Client Type"
                                onChange={(e) => setClientType(e.target.value)}
                            >
                                <MenuItem value="Android/Ios App">Android/Ios App</MenuItem>
                                <MenuItem value="Web App">Web App</MenuItem>
                                <MenuItem value="Website Development">
                                    Website Development
                                </MenuItem>
                                <MenuItem value="SEO">SEO</MenuItem>
                                <MenuItem value="PPC">PPC</MenuItem>
                                <MenuItem value="Graphic Design">Graphic Design</MenuItem>
                                <MenuItem value="Video Design">Video Design</MenuItem>
                                <MenuItem value="Content Writing">Content Writing</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="outlined-basic"
                            label="Client Email"
                            variant="outlined"
                            onChange={(e) => setClientEmail(e.target.value)}
                            value={clientemail}
                        />
                        <TextField
                            id="outlined-basic"
                            value={mobileno}
                            label="Mobile No."
                            variant="outlined"
                            onChange={(e) => setMobileno(e.target.value)}
                        />
                        <Button
                            className="submit-button"
                            type="submit"
                            style={{ fontFamily: "poppins_medium", fontSize: 14 }}
                            variant="contained"
                            endIcon={<SendIcon />}
                        >
                            Update Client
                        </Button>
                    </Box>
                }
            </div>
        </>
    )
}

export default EditClient