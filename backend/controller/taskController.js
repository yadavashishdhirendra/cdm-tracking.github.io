const Client = require("../schema/clientSchema");
const Task = require("../schema/taskSchema");
const User = require("../schema/userSchema");
const moment = require("moment");

exports.createTask = async (req, res) => {
  try {
    const { taskname, priority, startdate, enddate, email, reporter } =
      req.body;

    if (!taskname || !priority || !email || !reporter) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields!",
      });
    }

    let task = await Task.create({
      taskname,
      priority,
      email,
      reporter,
      startdate,
      enddate,
      owner: req.user.id,
    });

    const client = await Client.findById(req.body.id);
    const user = await User.findOne({ email: email });

    client.tasks.push(task._id);
    user.task.push(task._id);
    await user.save();
    await client.save();
    await task.save();

    return res.status(200).json({
      success: true,
      task,
      message: "Task Created Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id).populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
      },
    });

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }

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

exports.AddCommentInTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }

    task.comments.push({ user: req.user._id, comment: req.body.comment });

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Comment Added Success!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const update = { status: req.body.status };
    let task = await Task.findByIdAndUpdate(req.params.id, update, {
      runValidators: false,
      new: true,
      useFindAndModify: false,
    });
    return res.status(200).json({
      success: true,
      message: "Status Updated!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProductiveStart = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }
    task.productiveStart.push({
      starttime: req.body.starttime,
    });

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Time Captured!",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProductiveEnd = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }
    task.productiveEnd.push({
      endtime: req.body.endtime,
    });

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Time Captured!",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductiveHours = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }

    let starttime = [];
    let endtime = [];

    task &&
      task.productiveStart.forEach((start) => {
        starttime.push(start);
      });

    task &&
      task.productiveEnd.forEach((end) => {
        endtime.push(end);
      });

    return res.status(200).json({
      success: true,
      starttime,
      endtime,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDelayedTask = async (req, res) => {
  try {
    let task = await Task.find({
      $or: [
        {
          $and: [
            { enddate: { $gte: new Date().toISOString } },
            { enddate: { $lte: new Date().toISOString } },
          ],    // and operator body finishes
        },
        {
          status: "In Progress",
        },
        {
          status: "Todo",
        }
      ],
      // owner: req.user._id,
    })

    let id = []

    task && task.forEach((i) => {
      id.push(i._id)
    })

    task = await Task.updateMany(
      {
        _id: {
          $in: id
        }
      },
      {
        $set: {
          status: "Delayed"
        }
      },
      { multi: true }
    )

    return res.status(200).json({
      success: true,
      task,
      id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.minutesScorePerTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }

    task.minutes.push({
      hour: req.body.hour,
      minute: req.body.minute,
      seconds: req.body.seconds
    });

    await task.save();
    return res.status(200).json({
      success: true,
      task,
      message: "Time Stored",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({});

    return res.status(200).json({
      success: true,
      tasks: tasks.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.addLinks = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }

    const { link } = req.body;
    if (!link) {
      return res.status(400).json({
        success: false,
        message: "Please Add Link!",
      });
    }

    task.alllinks.push({
      link: link,
    });

    await task.save();
    return res.status(200).json({
      success: true,
      message: "Link Added Succesfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const taskupdate = {
      taskname: req.body.taskname,
      priority: req.body.priority,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      email: req.body.email,
      reporter: req.body.reporter
    }

    const update = await Task.findByIdAndUpdate(req.params.id, taskupdate, {
      new: true,
      runValidators: false,
      useFindAndModify: false
    })

    let email = "manish.s@gmail.com"

    let user = await User.findOne({ email: email })
    user.notifyTask.push(update._id)

    await user.save();

    return res.status(200).json({
      success: true,
      update,
      message: "Task Updated Successfully!"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.getTaskNotification = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    let date = moment(new Date()).format("DD/MM/YYYY");
    console.log(date)

    let task = await Task.find({
      owner: user,
      momentDate: moment(new Date()).format("DD/MM/YYYY")
    })

    return res.status(200).json({
      success: true,
      task
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.getAllTaskSpecificUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
    const tasks = await Task.find({
      owner: user
    });

    return res.status(200).json({
      success: true,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}