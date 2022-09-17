import React from 'react'
import SideBar from '../Sidebar/SideBar'
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { SpinnerCircular } from 'spinners-react'
import { useEffect } from 'react'
import Background from '../../../Assets/Images/Rectangle 443.png'
import { getAllUsers, loadUser } from '../../../Actions/userActions'
import MetaData from '../../Helmet/MetaData'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import Fade from "@material-ui/core/Fade";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import moment from 'moment'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Header from '../../Header/Header'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { users, error, loading } = useSelector((state) => state.users)
  const { user } = useSelector((state) => state.Authentication);

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(loadUser())
  }, [dispatch])

  // TASK GRID
  const columns = [
    { field: "id", headerName: "ID", minWidth: 230,flex:1 },
    {
      field: "username",
      headerName: "User Name",
      width: "250",
      flex:1
    },
    {
      field: "useremail",
      headerName: "User Email",
      width: 250,
      flex:1
    },
    {
      field: "createdate",
      headerName: "Joined On",
      width: 150,
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
            <Link to={`/clients/${params.getValue(params.id, "id")}`}>
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

  console.log(users)

  users &&
    users.map((item) => {
      rows.push({
        id: item._id,
        username: item.name,
        useremail: item.email,
        createdate: moment(item.createdAt).format('DD/MM/YYYY')
      });
    });

  return (
    <div>
      <SideBar />
      {
        user && <MetaData title={`${user.name}'s Admin`} />
      }
      <div className='left-side-content'>
        {
          loading ? <div className="spinner">
            <SpinnerCircular enabled={true} color='#000' size={30} thickness={300} />
          </div> : <div className='cards-live-content'>
            <div>
              <img src={Background} alt="" />
              <p>Total Users</p>
              <p>{users && users.length}+</p>
            </div>
            <div>
              <img src={Background} alt="" />
              <p>Total Clients</p>
              <p>100+</p>
            </div>
            <div>
              <img src={Background} alt="" />
              <p>Total Tasks</p>
              <p>150+</p>
            </div>
            <div>
              <img src={Background} alt="" />
              <p>InProgress Task</p>
              <p>12+</p>
            </div>
            <div>
              <img src={Background} alt="" />
              <p>Done Task</p>
              <p>200+</p>
            </div>
            <div>
              <img src={Background} alt="" />
              <p>Delayed Task</p>
              <p>90+</p>
            </div>
          </div>
        }
        <div className="Create-data">
          <div>
            <h3>User Lists</h3>
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
            />
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Dashboard