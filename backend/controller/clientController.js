const Client = require("../schema/clientSchema");
const Task = require("../schema/taskSchema");

exports.createClient = async (req, res) => {
  try {
    const { clientname, clienttype, clientemail, mobileno } = req.body;

    if (!clientname || !clienttype || !clientemail || !mobileno) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields!",
      });
    }

    let client = await Client.create({
      clientname,
      clienttype,
      clientemail,
      mobileno,
      owner: req.user.id,
    });

    return res.status(200).json({
      success: true,
      client,
      message: "Client Created Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOwnClients = async (req, res) => {
  try {
    const clients = await Client.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      clients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleClientData = async (req, res) => {
  try {
    let clients = await Client.findById(req.params.id).populate("tasks");

    let task = [];

    clients.tasks.forEach((item) => {
      if (task.includes(item._id)) {
        return null;
      } else {
        task.push(item);
      }
    });

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const clients = await Client.findById(req.params.id);
    const task = clients.tasks;
    await clients.remove();

    for (let i = 0; i < task.length; i++) {
      const tasks = await Task.findById(task[i]);
      await tasks.remove();
    }

    return res.status(200).json({
      success: true,
      message: "Client Deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
