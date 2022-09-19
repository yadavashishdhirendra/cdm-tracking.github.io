import moment from 'moment'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react'
import { getAllTaskSpecificAccount } from '../../Actions/taskActions'
import { getSingleUser } from '../../Actions/userActions'
import Background from '../../Assets/Images/Rectangle 443.png'
import SideBar from '../Admin/Sidebar/SideBar'
import MetaData from '../Helmet/MetaData'
import './TaskReport.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const UserReportProfile = () => {
    const { user, error, loading } = useSelector((state) => state.singleUserReport)
    const { tasks, loading: TaskLoading } = useSelector((state) => state.reportTask)
    const dispatch = useDispatch()
    const { id } = useParams();


    // console.log(tasks, "TASK!")

    let TotalSeconds = 0;
    let TotalMinutes = 0;
    let TotalHour = 0;

    tasks && tasks.forEach((i) => {
        i.minutes.forEach((j) => {
            TotalSeconds += j.seconds;
            TotalMinutes += j.minute;
            TotalHour += j.hour;
        })
    })


    useEffect(() => {
        dispatch(getAllTaskSpecificAccount(id))
        dispatch(getSingleUser(id))
    }, [dispatch, id])


    return (
        <>
            <MetaData title={`${user && user.name}'s Reporting`} />
            {
                loading || TaskLoading ? <div className="spinner">
                    <SpinnerCircular enabled={true} color='#000' size={30} thickness={300} />
                </div> : <>
                    <SideBar />
                    <div className='left-side-content'>
                        <div className='cards-live-content'>
                            <div>
                                <img src={Background} alt="" />
                                <p>Tasks (Team)</p>
                                <p>{user && user.task.length}+</p>
                            </div>
                            <div>
                                <img src={Background} alt="" />
                                <p>Total Task (Own)</p>
                                <p>{tasks && tasks.length}+</p>
                            </div>
                            <div>
                                <img src={Background} alt="" />
                                <p>Total Hours</p>
                                <p>{TotalHour}</p>
                            </div>
                            <div>
                                <img src={Background} alt="" />
                                <p>Total Minutes</p>
                                <p>{TotalMinutes}</p>
                            </div>
                            <div>
                                <img src={Background} alt="" />
                                <p>Total Seconds</p>
                                <p>{TotalSeconds}</p>
                            </div>
                            <div>
                                <img src={Background} alt="" />
                                <p>Delayed Task</p>
                                <p>90+</p>
                            </div>
                        </div>
                        <div className='grid-user-info'>
                            <div>
                                {
                                    user && <div className='user-img'>
                                        <p>{user.name.length > 2 ? user.name.slice(0, 1) : user.name}</p>
                                    </div>
                                }
                                <h4><span className='user-name-span'>Name:</span> {user && user.name}</h4>
                                <h4><span className='user-name-span'>Joined on:</span> {user && moment(user.createdAt).format('DD/MM/YYYY')}</h4>
                                <h4><span className='user-name-span'>Total Productive Hours:</span> {TotalHour} Hour {TotalMinutes} Minutes {TotalSeconds} Seconds.</h4>
                            </div>
                            <div className='task-notification'>
                                <h2>Task Update Notification: </h2>
                                {
                                    user && user.notifyTask.length > 0 ? user.notifyTask.map((i) => {
                                        return (
                                            <div className='update-notify-task' key={i._id}>
                                                <p>{user && user.name} Updated a Task</p>
                                                <Link to={`/task/details/${i._id}`}>
                                                    <RemoveRedEyeIcon fontSize='14px' />
                                                </Link>
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default UserReportProfile