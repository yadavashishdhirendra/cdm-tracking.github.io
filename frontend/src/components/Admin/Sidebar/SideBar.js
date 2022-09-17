import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import './SideBar.css'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { NavLink } from 'react-router-dom';
import BarsIcon from '@mui/icons-material/MenuOutlined'
import { useState } from 'react';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Logo from "../../../Assets/Images/DiTech Logo DM_Final (1).png";

const routes = [
    {
        path: "/admindashboard",
        name: "Home",
        icons: <HomeIcon />
    },
    {
        path: "/task",
        name: "Users List",
        icons: <GroupOutlinedIcon />
    },
    {
        path: "/clients",
        name: "Clients",
        icons: <AssignmentOutlinedIcon />
    },
    {
        path: "/settings",
        name: "Settings",
        icons: <SettingsSuggestOutlinedIcon />
    },
    {
        path: "/logout",
        name: "Logout",
        icons: <LogoutOutlinedIcon />
    }
]

const SideBar = () => {
    const [isopen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isopen)
    }

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            opacity: 1,
            width: "auto",
            transition: {
                duration: 0.5,
            },
        },
    };
    return (
        <div className='main-container'>
            <motion.div animate={{ width: isopen ? "200px" : "45px", transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            }, }} className="sidebar">
                <div className="top_section">
                    {
                        isopen && <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="logo">
                            <img src={Logo} alt="" />
                        </motion.div>
                    }
                    <div className="bars">
                        <BarsIcon onClick={toggleMenu} />
                    </div>
                </div>
                <section className='routes'>
                    {
                        routes && routes.map((route) => {
                            return (
                                <NavLink activeClassname="active" to={route.path} key={route.name} className="link">
                                    <div className="icon">
                                        {route.icons}
                                    </div>
                                    <AnimatePresence>
                                        {
                                            isopen && <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="link-text">{route.name}</motion.div>
                                        }
                                    </AnimatePresence>
                                </NavLink>
                            )
                        })
                    }
                </section>
            </motion.div>
        </div>
    )
}

export default SideBar