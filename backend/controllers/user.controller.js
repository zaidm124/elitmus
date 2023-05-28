const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function signUp(req, res) {
  //Sign up
  models.User.findOne({ where: { username: req.body.username } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "User already exists, please select a different username!",
          success: false,
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, async function (err, hash) {
            const user = {
              name: req.body.name,
              username: req.body.username,
              password: hash,
              level: 0,
              isAdmin: req.body.isAdmin | 0,
              completed:0,
            };
            await models.Progress.create({ username: req.body.username });
            models.User.create(user)
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                  success: true,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Something went wrong!",
                  success: false,
                  error,
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
        success: false,
        error,
      });
    });
}

function login(req, res) {
  models.User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials!",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          async function (err, result) {
            if (result) {
              const progress = await models.Progress.findOne({
                where: { username: req.body.username },
              });
              var r1s = null;
              if (progress.r1s) {
                r1s = progress.r1s;
              }
              const token = jwt.sign(
                {
                  username: user.username,
                  name: user.name,
                  userId: user.id,
                  level: user.level,
                  isAdmin: user.isAdmin,
                  success: true,
                  isAuth: true,
                  completed: user.completed,
                },
                "jwt",
                { expiresIn: "1d" },
                function (err, token) {
                  res.status(200).json({
                    message: "Authentication successful!",
                    token: token,
                    name: user.name,
                    username: user.username,
                    level: user.level,
                    isAdmin: user.isAdmin,
                    success: true,
                    isAuth: true,
                    r1s,
                    completed:user.completed,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Invalid credentials!",
                success: false,
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
        success: false,
        error,
      });
    });
}
function updatelevel(req, res) {
  models.User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "User Not Found!",
          success: false,
        });
      } else {
        models.User.update(
          {
            level: req.body.level,
          },
          {
            where: {
              username: req.body.username,
            },
          }
        )
          .then((result) => {
            res.status(201).json({
              message: "Updated Level Successfully",
              level: req.body.level,
              success: true,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Something went wrong!",
              success: false,
              error,
            });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
        success: false,
        error,
      });
    });
}

function gamecompletion(req, res) {
  models.User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "User Not Found!",
          success: false,
        });
      } else {
        models.User.update(
          {
            completed: req.body.complete,
          },
          {
            where: {
              username: req.body.username,
            },
          }
        )
          .then((result) => {
            res.status(201).json({
              message: "Game Mode Completion Updated Successfully",
              completed: req.body.complete,
              success: true,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Something went wrong!",
              success: false,
              error,
            });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
        success: false,
        error,
      });
    });
}

module.exports = {
  signUp: signUp,
  login: login,
  updatelevel: updatelevel,
  gamecompletion
};
