import axios from "axios";

export const createClient =
  (clientname, clienttype, clientemail, mobileno) => async (dispatch) => {
    try {
      dispatch({
        type: "CreateClientRequest",
      });
      const { data } = await axios.post(
        "/api/v2/create-client",
        { clientname, clienttype, clientemail, mobileno },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "CreateClientSuccess",
        payload: data.client,
      });
    } catch (error) {
      dispatch({
        type: "CreateClientFailure",
        payload: error.response.data.message,
      });
    }
  };

export const getOwnClients = () => async (dispatch) => {
  try {
    dispatch({
      type: "getOwnClientRequest",
    });
    const { data } = await axios.get("/api/v2/get-own-clients");
    dispatch({
      type: "getOwnClientSuccess",
      payload: data.clients,
    });
  } catch (error) {
    dispatch({
      type: "getOwnClientFailure",
      payload: error.response.data.message,
    });
  }
};

export const getSingleClientTasks = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getsingleClientTaskRequest",
    });
    const { data } = await axios.get(`/api/v2/client/details/${id}`);
    dispatch({
      type: "getsingleClientTaskSuccess",
      payload: data.task,
    });
  } catch (error) {
    dispatch({
      type: "getsingleClientTaskFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteClientWithTask = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "delclientwithtaskRequest",
    });
    const { data } = await axios.delete(`/api/v2/client/delete/${id}`);
    dispatch({
      type: "delclientwithtaskSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "delclientwithtaskFailure",
      payload: error.response.data.message,
    });
  }
};


export const getClients = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllClientsRequest",
    });
    const { data } = await axios.get(`/api/v2/user/client/${id}`);
    dispatch({
      type: "getAllClientsSuccess",
      payload: data.clients,
    });
  } catch (error) {
    dispatch({
      type: "getAllClientsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getSingleClient = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getClientDetailsRequest",
    });
    const { data } = await axios.get(`/api/v2/get/clients/details/${id}`);
    dispatch({
      type: "getClientDetailsSuccess",
      payload: data.clients,
    });
  } catch (error) {
    dispatch({
      type: "getClientDetailsFailure",
      payload: error.response.data.message,
    });
  }
};