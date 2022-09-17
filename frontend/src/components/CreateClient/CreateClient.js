import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./CreateClient.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { createClient, getOwnClients } from "../../Actions/clientActions";
import { useAlert } from "react-alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 550,
  minWidth: 330,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const field = {
  borderWidth: "1px",
  borderColor: "yellow !important",
};

const CreateClient = () => {
  const dispatch = useDispatch();
  const { error, loading, client } = useSelector((state) => state.createclient);
  const alert = useAlert();

  // MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // MODAL

  // GETING DETAILS OF INPUT
  const [clientname, setClientName] = useState("");
  const [clienttype, setClientType] = useState("");
  const [clientemail, setClientEmail] = useState("");
  const [mobileno, setMobileno] = useState("");

  const handlePost = async (e) => {
    e.preventDefault();
    await dispatch(createClient(clientname, clienttype, clientemail, mobileno));
    dispatch(getOwnClients());
    setOpen(false);
  };

  // GETING DETAILS OF INPUT

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (client) {
      alert.success("Client Created Successfully!");
      dispatch({
        type: "CreateClientReset",
      });
    }
  }, [error, client, dispatch,alert]);

  return (
    <div className="create-client">
      {/* BUTTON OF MODAL */}
      <Button
        variant="contained"
        onClick={handleOpen}
        endIcon={<AddCircleOutlineIcon />}
      >
        CREATE CLIENT
      </Button>
      {/* BUTTON OF MODAL */}
      {/* MODAL CONTAINER */}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-title">
            <div className="create-para">
              <h2>
                CREATE CLIENT!{" "}
              </h2>
              <span>
                  <DriveFileRenameOutlineIcon />
                </span>
            </div>
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
                sx={{ field }}
                value={clientname}
                id="outlined-basic"
                label="Client Name"
                variant="outlined"
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
                  value={clienttype}
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
                value={clientemail}
                label="Client Email"
                variant="outlined"
                onChange={(e) => setClientEmail(e.target.value)}
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
                {loading ? "Please Wait.." : "Submit"}
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
      {/* MODAL CONTAINER */}
    </div>
  );
};

export default CreateClient;
