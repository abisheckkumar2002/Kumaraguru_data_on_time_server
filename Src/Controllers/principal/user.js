const db = require("../../Models/index.js");

const mongoose = require("mongoose");
const UserType = require("../../Models/usertype.js");
const User = db.user;

exports.create = async (req, res) => {
  let reqBody = req.body;
  console.log(req.user.Id, "user.id user.iduser.id");

  // Corrected the if condition

  const newUser = {
    name: reqBody.name,
    email: reqBody.email.toLowerCase(),
    mobile: reqBody.mobile,
    UserId: reqBody.UserId,
    type_id: new mongoose.Types.ObjectId(reqBody.type_id),
    dep_id: new mongoose.Types.ObjectId(reqBody.dep_id),
    password: "kctmca",
    addedBy_Id: req.user.Id, // Get the id from authenticate user
  };

  console.log("departmentssssss", req.user.dep_name);

  console.log("newUser", reqBody.addedBy_id);

  try {
    const user = await User.create(newUser);
    res.status(200).send({
      status: "200",
      message: "User Added Successfully",
      data: user, // Optionally send back the created user data
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

exports.update = (req, res) => {
  console.log("reqbody", req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to Update can not be Empty",
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.status(200).send({
          status: "200",
          message: "User was updated successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id || err.message,
      });
    });
};

// exports.findAll = async (req, res) => {
//   const requestingUserType = req.user.user_Type;
//   console.log("requestingUserType", requestingUserType);

//   let condition = {};

//   if (requestingUserType === "Principal") {
//     // Exclude "Principal" type if the requesting user is "Principal"
//     console.log("Principal");
//     condition["type_id.Type"] = { $ne: "Principal" };
//   } else if (requestingUserType === "Admin") {
//     // Exclude "Principal" and "Admin" types if the requesting user is "Admin"
//     condition["type_id.Type"] = { $nin: ["Principal", "Admin"] };
//   } else if (requestingUserType === "Head Of Department") {
//     // Exclude "Principal", "Admin", and "Head Of Department" types if the requesting user is "Head Of Department"
//     condition["type_id.Type"] = {
//       $nin: ["Principal", "Admin", "Head Of Department"],
//     };
//   }

//   const { name, mobile, userId, userType, depId } = req.query;

//   const filters = {};

//   if (name) filters.name = { $regex: new RegExp(name), $options: "i" };
//   if (mobile) filters.mobile = { $regex: new RegExp(mobile), $options: "i" };
//   if (userId) filters.UserId = { $regex: new RegExp(userId), $options: "i" };
//   if (userType)
//     filters["type_id.Type"] = { $regex: new RegExp(userType), $options: "i" };
//   if (depId) filters.dep_id = { $regex: new RegExp(depId), $options: "i" };

//   try {
//     let users;
//     if (Object.keys(filters).length > 0) {
//       // If there are query filters, apply them along with the condition
//       console.log("With filters", { ...filters, ...condition });
//       users = await User.find({ ...filters, ...condition })
//         .populate({
//           path: "dep_id",
//           select: "department",
//         })
//         .populate({
//           path: "type_id",
//           select: "Type",
//         })
//         .sort({ createdAt: -1 });
//     } else {
//       // If there are no query filters, apply only the condition
//       console.log("With condition only", condition);
//       users = await User.find({ "type_id.Type": { $ne: "Principal" } })
//         // .populate({
//         //   path: "dep_id",
//         //   select: "department",
//         // })
//         // .populate({
//         //   path: "addedBy_Id",
//         //   select: "name",
//         // })
//         // .populate({
//         //   path: "type_id",
//         //   select: "Type",
//         // })
//         .sort({ createdAt: -1 });
//     }

//     res.status(200).json({
//       status: "200",
//       users: users,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err.message || "Some error occurred while retrieving users.",
//     });
//   }
// };

// exports.abi = async (req, res) => {
//   try {
//     const requestingUserType = req.user.user_Type;

//     let filteredUsers;

//     // Fetch all users and populate fields
//     const users = await User.find()
//       .populate({
//         path: "dep_id",
//         select: "department",
//       })
//       .populate({
//         path: "addedBy_Id",
//         select: "name",
//       })
//       .populate({
//         path: "type_id",
//         select: "Type",
//       });

//     if (requestingUserType === "Principal") {
//       const filteredUsers = users.filter((user) => {
//         // Add your conditions here
//         return user.type_id.Type !== "Principal";
//       });
//     } else if (requestingUserType === "Admin") {
//       const filteredUsers = users.filter((user) => {
//         user.type_id.Type !== "Principal" && user.type_id.Type !== "Admin";
//       });
//     } else if (requestingUserType === "Head Of Department") {
//       const filteredUsers = users.filter((user) => {
//         user.type_id.Type !== "Principal" &&
//           user.type_id.Type !== "Admin" &&
//           user.type_id.Type !== "Head Of Department";
//       });
//     }
//     res.status(200).json({
//       status: "200",
//       users: filteredUsers,
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({
//       message: "Some error occurred while fetching users.",
//     });
//   }
// };

// exports.abi = async (req, res) => {
//   try {
//     const requestingUserType = req.user.user_Type;
//     console.error("requestingUserType", requestingUserType);
//     let filteredUsers;

//     // Fetch all users and populate fields
//     const users = await User.find({})
//       .populate({
//         path: "dep_id",
//         select: "department",
//       })
//       .populate({
//         path: "addedBy_Id",
//         select: "name ",
//       })
//       .populate({
//         path: "type_id",
//         select: "Type",
//       })
//       .sort({ createdAt: -1 });

//     if (requestingUserType === "Principal") {
//       filteredUsers = users.filter((user) => user.type_id.Type !== "Principal");
//     } else if (requestingUserType === "Admin") {
//       filteredUsers = users.filter(
//         (user) =>
//           user.type_id.Type !== "Principal" && user.type_id.Type !== "Admin"
//       );
//     } else if (requestingUserType === "Head Of Department") {
//       console.error("ccccccccccc");

//       filteredUsers = users.filter((user) => {
//         return (
//           user.dep_id &&
//           user.dep_id.department === req.user.dep_name &&
//           user.type_id.Type !== req.user.user_Type
//         );
//       });
//     } else if (requestingUserType === "Montly Executor") {
//       filteredUsers = users.filter((user) => {
//         return (
//           user.dep_id &&
//           user.dep_id.department === req.user.dep_name &&
//           user.type_id.Type !== req.user.user_Type && user.type_id.Type!== "Head Of Department"
//         );
//       });
//     }

//     console.log("filteredUsers", filteredUsers);

//     res.status(200).json({
//       status: "200",
//       users: filteredUsers,
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({
//       message: "Some error occurred while fetching users.",
//     });
//   }
// };

//final
// exports.abi = async (req, res) => {
//   try {
//     const requestingUserType = req.user.user_Type;

//     console.log("requestingUserType",requestingUserType)
//     // Define filter object based on requestingUserType
//     let filter = {};
//     let includedTypes;

//     // Fetch user types from UserType
//     const userType = await UserType.find({status:"Active"});

//     console.log(userType,"userTypeuserTypeuserType")

//     if (requestingUserType === "Principal") {
//       filter = { type_id: { $ne: req.user.typeId } };

//     }
//     else if (requestingUserType === "Admin") {
//       includedTypes = userType.filter(type => type.Type !== "Principal"&& type.Type !== "Admin").map(type => type.id);
//       filter = { type_id: { $in: includedTypes } };
//     }
//     else if (requestingUserType === "Head Of Department") {
//       includedTypes = userType.filter(type => type.Type !== "Principal" && type.Type !== "Admin").map(type => type.id);
//       filter = { dep_id: req.user.depId, type_id: { $in: includedTypes } };
//     }
//     else if (requestingUserType === "Montly Executor") {
//       includedTypes = userType.filter(type => type.Type !== "Principal" && type.Type !== "Admin" && type.Type !== "Head Of Department").map(type => type.id);
//       filter = { dep_id: req.user.depId, type_id: { $in: includedTypes } };
//     }

//     if (requestingUserType === "Principal" || "Admin"){

//       if (mongoose.isValidObjectId(req.query.dep_id)) {

//         filter.dep_id = req.query.dep_id;
//       }

//       if (mongoose.isValidObjectId(req.query.type_id)) {

//         filter.type_id = req.query.type_id;
//       }

//     }
//     if (req.query.name) {
//       filter.name = { $regex: new RegExp(req.query.name, 'i') };
//     }

//     if(req.query.UserId){
//       filter.UserId = { $regex: new RegExp(req.query.UserId, 'i') };
//     }
//     if(req.query.email){
//       filter.email = { $regex: new RegExp(req.query.email, 'i') };
//     }

//     console.log("Filter:", filter);

//     // Fetch filtered users from the database
//     const users = await User.find(filter)

//       .populate({
//         path: "dep_id",
//         select: "department",
//       })
//       .populate({
//         path: "addedBy_Id",
//         select: "name",
//       })
//       .populate({
//         path: "type_id",
//         select: "Type",
//       })
//       .sort({ createdAt: -1 });

//       // Total count of users
//       const totalCount = users.length;

//       // Count of users for each type_id
//       const typeCounts = users.reduce((counts, user) => {

//         console.log("counts",counts,user,"user")
//         const type = user.type_id.Type;
//         console.log("type",type)
//         counts[type] = (counts[type] || 0) + 1;
//         return counts;
//       }, {});

//       res.status(200).json({
//         status: "success",
//         totalCount: totalCount,
//         typeCounts: typeCounts,
//         users: users,
//       });

//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({
//       message: "Some error occurred while fetching users.",
//     });
//   }
// };

//final

exports.findAll = async (req, res) => {
  try {
    const requestingUserType = req.user.user_Type;

    console.log("requestingUserType", requestingUserType);
    // Define filter object based on requestingUserType
    let filter = {};
    let includedTypes;
    let includedName;

    // Fetch user types from UserType
    const userType = await UserType.find({ status: "Active" });

    console.log(userType, "userTypeuserTypeuserType");

    if (requestingUserType === "Principal") {
      includedTypes = userType
        .filter((type) => type.Type !== "Principal")
        .map((type) => type.id);
      includedName = userType
        .filter((type) => type.Type !== "Principal")
        .map((type) => type.Type);
      filter = { type_id: { $in: includedTypes } };
      console.log(includedName, "includedName");
    } else if (requestingUserType === "Admin") {
      includedTypes = userType
        .filter((type) => type.Type !== "Principal" && type.Type !== "Admin")
        .map((type) => type.id);
      includedName = userType
        .filter((type) => type.Type !== "Principal" && type.Type !== "Admin")
        .map((type) => type.Type);
      filter = { type_id: { $in: includedTypes } };
    } else if (requestingUserType === "Head Of Department") {
      includedTypes = userType
        .filter(
          (type) =>
            type.Type !== "Principal" &&
            type.Type !== "Admin" &&
            type.Type !== "Head Of Department"
        )
        .map((type) => type.id);
      includedName = userType
        .filter(
          (type) =>
            type.Type !== "Principal" &&
            type.Type !== "Admin" &&
            type.Type !== "Head Of Department"
        )
        .map((type) => type.Type);
      filter = { dep_id: req.user.depId, type_id: { $in: includedTypes } };
    } else if (requestingUserType === "Montly Executor") {
      includedTypes = userType
        .filter(
          (type) =>
            type.Type !== "Principal" &&
            type.Type !== "Admin" &&
            type.Type !== "Head Of Department" &&
            type.Type !== "Head Of Department"
        )
        .map((type) => type.id);
      includedName = userType
        .filter(
          (type) =>
            type.Type !== "Principal" &&
            type.Type !== "Admin" &&
            type.Type !== "Head Of Department" &&
            type.Type !== "Montly Executor"
        )
        .map((type) => type.Type);
      filter = { dep_id: req.user.depId, type_id: { $in: includedTypes } };
    }

    if (requestingUserType === "Principal" || "Admin") {
      if (mongoose.isValidObjectId(req.query.dep_id)) {
        filter.dep_id = req.query.dep_id;
      }

      if (mongoose.isValidObjectId(req.query.type_id)) {
        filter.type_id = req.query.type_id;
      }
    }
    if (req.query.name) {
      filter.name = { $regex: new RegExp(req.query.name, "i") };
    }

    if (req.query.UserId) {
      filter.UserId = { $regex: new RegExp(req.query.UserId, "i") };
    }
    if (req.query.email) {
      filter.email = { $regex: new RegExp(req.query.email, "i") };
    }

    console.log("Filter:", filter);

    // Fetch filtered users from the database
    const users = await User.find(filter)

      .populate({
        path: "dep_id",
        select: "department",
      })
      .populate({
        path: "addedBy_Id",
        select: "name",
      })
      .populate({
        path: "type_id",
        select: "Type",
      })
      .sort({ createdAt: -1 });

    // // Total count of users
    // const totalCount = users.length;

    const typeCounts = includedName.reduce((counts, typeName) => {
      counts[typeName] = 0;
      return counts;
    }, {});

    users.forEach((user) => {
      const type = user.type_id.Type;
      if (typeCounts.hasOwnProperty(type)) {
        typeCounts[type]++;
      }
    });

    console.log("typeCounts", typeCounts, "typeCounts");

    res.status(200).json({
      status: "success",
      // totalCount: totalCount,
      typeCounts: typeCounts,
      users: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Some error occurred while fetching users.",
    });
  }
};



// exports.abi = async (req, res) => {
//   try {
//     const requestingUserType = req.user.user_Type;

//     // Define filter object based on requestingUserType
//     let filter = {};
//     let includedTypes;

//     // Fetch user types from UserType
//     const userType = await UserType.find();

//     if (requestingUserType === "Principal") {
//       filter = { type_id: { $ne: req.user.typeId } };
//     } else if (requestingUserType === "Admin") {
//       includedTypes = userType.filter(type => type.Type !== "Principal").map(type => type.id);
//       filter = { type_id: { $in: includedTypes } };
//     } else if (requestingUserType === "Head Of Department") {
//       includedTypes = userType.filter(type => type.Type !== "Principal" && type.Type !== "Admin").map(type => type.id);
//       filter = { type_id: { $in: includedTypes } };
//     } else if (requestingUserType === "Montly Executor") {
//       includedTypes = userType.filter(type => type.Type !== "Principal" && type.Type !== "Admin" && type.Type !== "Head Of Department").map(type => type.id);
//       filter = { type_id: { $in: includedTypes } };
//     }

//     // Additional filter based on dep_id from request query
//     if (req.query.dep_id) {
//       // Check if the provided dep_id is a valid ObjectId
//       if (mongoose.isValidObjectId(req.query.dep_id)) {
//         filter.dep_id = req.query.dep_id;
//       } else {
//         return res.status(404).json({ status: "404", message: "Not a valid ObjectId." });
//       }
//     }

//     // Aggregation pipeline
//     const users = await User.aggregate([
//       { $match: filter },
//       { $group: { _id: null, count: { $sum: 1 } } } // Count the number of users
//     ]);

//     if (users.length === 0) {
//       return res.status(404).json({ status: "404", message: "No users found." });
//     }

//     const userCount = users[0].count; // Extract the count from the aggregation result

//     res.status(200).json({ status: "200", userCount: userCount });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({
//       message: "Some error occurred while fetching users.",
//     });
//   }
// };













exports.anu = async (req, res) => {
  try {
    const requestingUserType = req.user.user_Type;

    // Fetch user types from UserType
    const userType = await UserType.find({ status: "Active" });

    let filter = {};
    let includedTypes;
    let includedName;

    // Define function to filter included types and names
    const filterIncludedTypes = () => {
      const excludedTypes = [];

      if (requestingUserType === "Principal") {
        excludedTypes.push("Principal");
        console.log(excludedTypes, "excludedTypesexcludedTypesexcludedTypes");
      } else if (requestingUserType === "Admin") {
        excludedTypes.push("Principal", "Admin");
      } else if (requestingUserType === "Head Of Department") {
        excludedTypes.push("Principal", "Admin", "Head Of Department");
      } else if (requestingUserType === "Montly Executor") {
        excludedTypes.push(
          "Principal",
          "Admin",
          "Head Of Department",
          "Montly Executor"
        );
      }

      includedTypes = userType
        .filter((type) => !excludedTypes.includes(type.Type))
        .map((type) => type.id);

      includedName = userType
        .filter((type) => !excludedTypes.includes(type.Type))
        .map((type) => type.Type);
    };

    // Filter included types based on requestingUserType
    if (requestingUserType === "Principal") {
      filterIncludedTypes();
      filter = { type_id: { $in: includedTypes } };
    } else if (requestingUserType === "Admin") {
      filterIncludedTypes();
      filter = { type_id: { $in: includedTypes } };
    } else if (requestingUserType === "Head Of Department") {
      filterIncludedTypes();
      filter = { dep_id: req.user.depId, type_id: { $in: includedTypes } };
    } else if (requestingUserType === "Montly Executor") {
      filterIncludedTypes();
      filter = { dep_id: req.user.depId, type_id: { $in: includedTypes } };
    }

    // Add additional filters if provided in the request query
    if (requestingUserType === "Principal" || requestingUserType === "Admin") {
      if (mongoose.isValidObjectId(req.query.dep_id)) {
        filter.dep_id = req.query.dep_id;
      }
      if (mongoose.isValidObjectId(req.query.type_id)) {
        filter.type_id = req.query.type_id;
      }
    }

    if (req.query.name) {
      filter.name = { $regex: new RegExp(req.query.name, "i") };
    }

    if (req.query.UserId) {
      filter.UserId = { $regex: new RegExp(req.query.UserId, "i") };
    }

    if (req.query.email) {
      filter.email = { $regex: new RegExp(req.query.email, "i") };
    }

    console.log("Filter:", filter);

    // Fetch filtered users from the database
    const users = await User.find(filter)
      .populate({
        path: "dep_id",
        select: "department",
      })
      .populate({
        path: "addedBy_Id",
        select: "name",
      })
      .populate({
        path: "type_id",
        select: "Type",
      })
      .sort({ createdAt: -1 });

    // Total count of users

    const typeCounts = includedName.reduce((counts, typeName) => {
      counts[typeName] = 0;
      return counts;
    }, {});

    users.forEach((user) => {
      const type = user.type_id.Type;
      if (typeCounts.hasOwnProperty(type)) {
        typeCounts[type]++;
      }
    });

    console.log("typeCounts", typeCounts, "typeCounts");

    res.status(200).json({
      status: "success",

      typeCounts: typeCounts,
      users: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Some error occurred while fetching users.",
    });
  }
};