const Admin = require("../../Models/Admin/AdminModel");

const fs = require("fs");

const {
  signAcessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../config/JWT_token");

const password = require("../../config/Password.util");

const bodyParser = require("body-parser");

const bycrypt = require("bcryptjs");

const registerAdmin2 = async (req, res) => {
  try {
    const obj = {
      FullName: req.body.fullName,
      Email: req.body.registerEmail,
      hash: req.body.registerPassword,
      Role: req.body.Role,
    };
    const userInstance = await new Admin(obj);
    userInstance.save();
    const userDetails = {
      FullName: userInstance.FullName,
      userId: userInstance._id,
      userEmail: userInstance.Email,
      userRole: userInstance.Role,
      Contact: userInstance.Contact,
    };
    const accessToken = await signAcessToken(userInstance._id);
    const refreshToken = await signRefreshToken(userInstance._id);
    console.log(userDetails);

    res.send({ auth: true, accessToken, refreshToken, userDetails });
  } catch (error) {
    console.log(error.message);
    res.send({ auth: false });
  }
};

const dashBoard = () => {};

const adminLogin2 = async (req, res) => {
  const user = await Admin.findOne(
    { Email: req.body.loginEmail },
    async (err, user) => {
      if (user === null) {
        res.send({ auth: false });
      } else {
        try {
          const verify = await user.isValidPassword(req.body.loginPassword);
          if (verify) {
            const accessToken = await signAcessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            const userDetails = {
              userName: user.FullName,
              userId: user._id,
              userEmail: user.Email,
              profile: user.Image,
              Role: user.Role,
              Contact: user.Contact,
            };
            res.send({ auth: true, accessToken, refreshToken, userDetails });
          } else {
            res.send({ auth: false });
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  );
};

const refreshTokenAdmin = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw createError.BadRequest();
    }
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAcessToken(userId);
    const ref = await signRefreshToken(userId);
    res.send({ accessToken, refreshToken: ref });
  } catch (error) {
    next(error);
  }
};

const updateAdmin = (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  const update = Admin.findByIdAndUpdate(
    id,
    {
      FullName: req.body.fullName,
      Email: req.body.email,
      Contact: req.body.contact,
    },
    { useFindAndModify: false },
    (err, Admin) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(Admin);
      }
    }
  );
};

module.exports = { adminLogin2, registerAdmin2, updateAdmin };
