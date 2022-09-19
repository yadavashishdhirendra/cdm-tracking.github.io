const Client = require("../schema/clientSchema");
const Task = require("../schema/taskSchema");
const User = require("../schema/userSchema");

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
      // owner: req.user.id,
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


exports.getAllClientsByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const clients = await Client.find({
      owner: user
    })

    return res.status(200).json({
      success: true,
      clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getAllclients = async (req, res) => {
  try {
    const clients = await Client.find({});

    return res.status(200).json({
      success: true,
      clients: clients.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.getSingleClients = async (req, res) => {
  try {
    const clients = await Client.findById(req.params.id);

    if (!clients) {
      return res.status(400).json({
        success: false,
        message: "Client Not Found!"
      })
    }

    return res.status(200).json({
      success: true,
      clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.updateClient = async (req, res) => {
  try {
    const clientupdate = {
      clientname: req.body.clientname,
      clienttype: req.body.clienttype,
      clientemail: req.body.clientemail,
      service: req.body.service,
      mobileno: req.body.mobileno
    }

    const update = await Client.findByIdAndUpdate(req.params.id, clientupdate, {
      new: true,
      runValidators: false,
      useFindAndModify: false
    })

    return res.status(200).json({
      success: true,
      update,
      message: "Client Updated Successfully!"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}