const bcrypt = require("bcrypt");

const db = require("../../Models/index.js");

const User = db.user;

exports.userLogin = async (req, res) => {
  try {
    let reqBody = req.body,
      checkUser;
    console.log("email", reqBody.email);
    reqBody.email = reqBody.email.toLowerCase();
    console.log("lowercase", reqBody.email);
    checkUser = await User.findOne({ email: reqBody.email }) .populate('type_id');;

    console.log("checkUser", checkUser);

    if (!checkUser) {
    
      return res
        .status(400)
        .json({ success: false, errors: { email: "Email is not exists" } });
    }

    var passwordStatus = bcrypt.compareSync(
      reqBody.password,
      checkUser.password
    );

    console.log("passwordStatus", passwordStatus);

    if (!passwordStatus) {
      console.log("invalid Password");
      return res
        .status(400)
        .json({ success: false, errors: { password: "Invalid Password" } });
    }

    let payloadData = {
      _id: checkUser._id,
    };
    let token = new User().generateJWT(payloadData);
    let result = {
      _id: checkUser._id,
      userType: checkUser.type_id.Type,
    };

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
      result,
    });
  } catch (err) {
    console.log("----err", err);
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Email is not exists" } });
  }
};
