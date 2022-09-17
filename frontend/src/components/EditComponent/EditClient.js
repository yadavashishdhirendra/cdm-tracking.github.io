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
import { getSingleClient } from "../../Actions/clientActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import { Breadcrumbs, Typography } from "@mui/material";

const EditClient = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const { clients, error, loading } = useSelector((state) => state.clientdetails)
    const [clientname, setClientName] = useState("");
    const [clienttype, setClientType] = useState("");
    const [clientemail, setClientEmail] = useState("");
    const [mobileno, setMobileno] = useState("");

    console.log(clients, "xuu")

    useEffect(() => {
        if (id) {
            dispatch(getSingleClient(id))
        }
        dispatch(getSingleClient(id))
    }, [dispatch, id])

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
                            // sx={{ field }}
                            id="outlined-basic"
                            label="Client Name"
                            variant="outlined"
                            defaultValue={clients && clients.clientname}
                            onChange={(e) => setClientName(e.target.value)}
                        />
                        <FormControl sx={{ mb: 3, minWidth: 120 }} size="small">
                            <InputLabel
                                id="demo-select-small"
                                onChange={(e) => setClientType(e.target.value)}
                            >
                                Client Type
                            </InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                // value={clienttype}
                                defaultValue={clients && clients.clienttype}
                                label="Client Type"
                                onChange={(e) => setClientType(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
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
                            defaultValue={clients && clients.clientemail}
                        />
                        <TextField
                            id="outlined-basic"
                            defaultValue={clients && clients.mobileno}
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