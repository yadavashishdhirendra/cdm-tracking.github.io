import React from "react";
import "./Home.css";
import MetaData from "../Helmet/MetaData";
import CreateClient from "../CreateClient/CreateClient";
import CreateList from "../DataCollections/ClientList";
import Header from "../Header/Header";
import TaskFromTeam from "../CreateTask/TaskFromTeam";

const Home = () => {
  return (
    <>
      <MetaData title={`Home - Create Client`} />
      <Header />
      {/* CREATE CLIENT */}
      <CreateClient />
      {/* CREATE CLIENT */}

      {/* DATACOLLECTIONS */}
      <h3 className="task-team">Client List</h3>
      <CreateList />
      <h3 className="task-team">Task Assigned From Team</h3>
      <TaskFromTeam />
      {/* DATACOLLECTIONS */}
    </>
  );
};

export default Home;
